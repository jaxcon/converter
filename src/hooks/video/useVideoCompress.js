import { useState, useReducer, useEffect } from "react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { progressReducer, setProgress, removeProgress, resetAllProgress } from "../../utils/progressReducer";
import { processInParallel, MAX_PARALLEL } from '../../utils/parallelProcessor';
import { getUniqueName } from "../../utils/uniqueIdGenerator";
import { getMimeTypeForFormat, getVideoFormat } from "../../utils/videoUtils";

export function useVideoCompress() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [compressionProgress, dispatch] = useReducer(progressReducer, new Map());

    const handleRemoveFile = (index) => {
        setFiles((prev) => {
            const fileToRemove = prev[index];
            if (fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }
            dispatch(removeProgress(fileToRemove.id));
            return prev.filter((_, i) => i !== index);
        });
    };

    useEffect(() => {
        return () => {
            files.forEach(fileObj => {
                if (fileObj.preview) {
                    URL.revokeObjectURL(fileObj.preview);
                }
            });
        };
    }, [files]);

    const getCompressionOptions = (fileType, fileName) => {
        const format = getVideoFormat(fileType, fileName);

        if (format === "webm") {
            return {
                outputFormat: "webm",
                videoCodec: "libvpx",
                audioCodec: "libvorbis",
                crf: "40",
                preset: "good"
            };
        }

        return {
            outputFormat: format,
            preset: 'fast',
            videoCodec: 'libx264',
            audioCodec: 'aac',
            crf: '32',
        };
    };

    const compressVideoWithFFmpeg = async (file, options, onProgress) => {
        try {
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
            const ffmpeg = new FFmpeg();

            ffmpeg.on('progress', ({ progress: ratio }) => {
                if (onProgress) onProgress(Math.round(ratio * 100));
            });

            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });

            const arrayBuffer = await file.arrayBuffer();
            const inputFilename = `input.${file.name.split('.').pop()}`;
            const outputFilename = `output.${options.outputFormat}`;

            await ffmpeg.writeFile(inputFilename, new Uint8Array(arrayBuffer));

            const args = ['-i', inputFilename];
            args.push('-c:v', options.videoCodec);
            if (options.crf) args.push('-crf', options.crf);
            if (options.preset) args.push('-preset', options.preset);
            args.push('-c:a', options.audioCodec);

            if (options.outputFormat === 'mp4' || options.outputFormat === 'mov') {
                args.push('-movflags', '+faststart');
            }

            args.push('-y', outputFilename);

            await ffmpeg.exec(args);

            const data = await ffmpeg.readFile(outputFilename);
            const outputType = getMimeTypeForFormat(options.outputFormat);
            const compressedBlob = new Blob([data], { type: outputType });

            await ffmpeg.deleteFile(inputFilename);
            await ffmpeg.deleteFile(outputFilename);

            return compressedBlob;

        } catch (error) {
            console.error('Compression error:', error);
            return file;
        }
    };

    const handleCompressSeparate = async () => {
        if (!files.length) return;
        setLoading(true);

        files.forEach(file => {
            dispatch(setProgress(file.id, 0));
        });

        await processInParallel(
            files,
            async (fileObj) => {
                try {
                    dispatch(setProgress(fileObj.id, 0));

                    const originalSizeMB = fileObj.file.size / 1024 / 1024;
                    const options = getCompressionOptions(fileObj.file.type, fileObj.file.name, originalSizeMB);

                    const compressedBlob = await compressVideoWithFFmpeg(
                        fileObj.file,
                        options,
                        (progress) => dispatch(setProgress(fileObj.id, progress))
                    );

                    dispatch(setProgress(fileObj.id, 100));
                    saveAs(compressedBlob, getUniqueName(fileObj.file.name, 'compressed'));
                } catch (err) {
                    console.error("Ошибка при сжатии:", err);
                    dispatch(setProgress(fileObj.id, -1));
                    saveAs(fileObj.file, getUniqueName(fileObj.file.name, 'original'));
                }
            },
            MAX_PARALLEL
        );

        setLoading(false);
        setTimeout(() => dispatch(resetAllProgress()), 800);
    };

    const handleCompressZip = async () => {
        if (!files.length) return;
        setLoading(true);

        files.forEach(file => {
            dispatch(setProgress(file.id, 0));
        });

        const zip = new JSZip();

        await processInParallel(
            files,
            async (fileObj) => {
                try {
                    dispatch(setProgress(fileObj.id, 0));

                    const originalSizeMB = fileObj.file.size / 1024 / 1024;
                    const options = getCompressionOptions(fileObj.file.type, fileObj.file.name, originalSizeMB);

                    const compressedBlob = await compressVideoWithFFmpeg(
                        fileObj.file,
                        options,
                        (progress) => dispatch(setProgress(fileObj.id, progress))
                    );

                    const arrayBuffer = await compressedBlob.arrayBuffer();
                    zip.file(getUniqueName(fileObj.file.name, 'compressed'), arrayBuffer);
                    dispatch(setProgress(fileObj.id, 100));
                } catch (err) {
                    console.error("Ошибка при сжатии:", err);
                    dispatch(setProgress(fileObj.id, -1));
                    const arrayBuffer = await fileObj.file.arrayBuffer();
                    zip.file(getUniqueName(fileObj.file.name, 'original'), arrayBuffer);
                }
            },
            MAX_PARALLEL
        );

        try {
            const content = await zip.generateAsync({
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: { level: 6 }
            });
            saveAs(content, getUniqueName('compressed_videos', 'archive') + '.zip');
        } catch (err) {
            console.error("Ошибка при создании ZIP:", err);
        }

        setLoading(false);
        setTimeout(() => dispatch(resetAllProgress()), 800);
    };

    return {
        files,
        setFiles,
        loading,
        compressionProgress,
        handleRemoveFile,
        handleCompressSeparate,
        handleCompressZip,
    };
}