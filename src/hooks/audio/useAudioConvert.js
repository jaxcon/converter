import { useCallback, useReducer, useState, useEffect } from "react";
import { useFFmpeg } from "../common/useFFmpeg";
import {
    removeProgress,
    resetAllProgress,
    progressReducer,
    setProgress,
} from "../../utils/progressReducer";
import { MAX_PARALLEL, processInParallel } from "../../utils/parallelProcessor";
import { getUniqueName, generateFileId } from "../../utils/uniqueIdGenerator";
import { getFileFormat } from "../../utils/audioUtils";

const outputExtensions = {
    MP3: "mp3", WAV: "wav", AAC: "m4a", FLAC: "flac",
    OGG: "ogg", AIFF: "aiff", WMA: "wma"
};

const codecPresets = {
    MP3: ["-codec:a", "libmp3lame", "-qscale:a", "2", "-b:a", "192k"],
    AAC: ["-codec:a", "aac", "-b:a", "128k"],
    FLAC: ["-codec:a", "flac", "-compression_level", "5", "-ar", "44100"],
    OGG: ["-codec:a", "libvorbis", "-qscale:a", "5"],
    WAV: ["-codec:a", "pcm_s16le", "-ar", "44100"],
    AIFF: ["-codec:a", "pcm_s16be", "-ar", "44100"],
};

export function useAudioConvert() {
    const [files, setFiles] = useState([]);
    const [converting, setConverting] = useState(false);
    const [progressMap, dispatch] = useReducer(progressReducer, new Map());

    const { runCommand, load, isReady, isLoading } = useFFmpeg();

    useEffect(() => {
        load();
    }, [load]);

    const handleRemoveFile = useCallback((index) => {
        setFiles((prev) => {
            const fileToRemove = prev[index];
            if (fileToRemove.preview) URL.revokeObjectURL(fileToRemove.preview);
            dispatch(removeProgress(fileToRemove.id));
            return prev.filter((_, i) => i !== index);
        });
    }, []);

    const getFFmpegExtension = useCallback(
        (format) => outputExtensions[format] || "mp3",
        []
    );

    const convertAudioWithFFmpeg = useCallback(
        async (file, targetFormat) => {
            const inputExt = getFileFormat(file.file.name).toLowerCase();
            const outputExt = getFFmpegExtension(targetFormat);
            const uniqueId = generateFileId();

            const inputFileName = `in_${uniqueId}.${inputExt}`;
            const outputFileName = `out_${uniqueId}.${outputExt}`;

            const cmd = ["-i", inputFileName, "-vn", "-y"];
            cmd.push(...(codecPresets[targetFormat.toUpperCase()] || ["-codec:a", "copy"]));
            cmd.push(outputFileName);

            const results = await runCommand(cmd, { [inputFileName]: file.file }, [outputFileName]);
            const outputData = results[outputFileName];
            if (!outputData?.length) throw new Error("Conversion failed");

            return new Blob([outputData], { type: `audio/${outputExt}` });
        },
        [isReady, load, runCommand, getFFmpegExtension]
    );

    const saveBlob = useCallback((blob, filename) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => URL.revokeObjectURL(url), 0);
    }, []);

    const processFile = useCallback(
        async (fileObj, targetFormat, saveStrategy) => {
            const sourceFormat = getFileFormat(fileObj.file.name);
            dispatch(setProgress(fileObj.id, 10));

            try {
                let blob;
                if (sourceFormat === targetFormat.toUpperCase()) {
                    blob = new Blob([await fileObj.file.arrayBuffer()]);
                } else {
                    try {
                        blob = await convertAudioWithFFmpeg(fileObj, targetFormat);
                    } catch (ffmpegError) {
                        console.error(`FFmpeg error for ${fileObj.file.name}:`, ffmpegError);
                        blob = new Blob([await fileObj.file.arrayBuffer()]);
                    }
                }

                dispatch(setProgress(fileObj.id, 100));
                const outExt = getFFmpegExtension(targetFormat);
                const filename = getUniqueName(
                    fileObj.file.name,
                    sourceFormat === targetFormat.toUpperCase() ? "original" : "converted"
                ) + `.${outExt}`;

                saveStrategy(filename, blob);
            } catch (error) {
                console.error(`Processing error for ${fileObj.file.name}:`, error);
                dispatch(setProgress(fileObj.id, -1));
            }
        },
        [convertAudioWithFFmpeg, getFFmpegExtension]
    );

    const handleConvert = useCallback(
        async (targetFormat) => {
            if (!files.length || converting) return;
            setConverting(true);
            dispatch(resetAllProgress());

            try {
                await processInParallel(
                    files,
                    (fileObj) =>
                        processFile(fileObj, targetFormat, (name, blob) => saveBlob(blob, name)),
                    MAX_PARALLEL
                );
            } finally {
                setConverting(false);
            }
        },
        [files, converting, processFile, saveBlob]
    );

    const handleBatchConvert = useCallback(
        async (targetFormat) => {
            if (!files.length || converting) return;
            setConverting(true);
            dispatch(resetAllProgress());

            try {
                const { default: JSZip } = await import("jszip");
                const { saveAs } = await import("file-saver");
                const zip = new JSZip();

                await processInParallel(
                    files,
                    (fileObj) =>
                        processFile(fileObj, targetFormat, (name, blob) => zip.file(name, blob)),
                    MAX_PARALLEL
                );

                if (Object.keys(zip.files).length > 0) {
                    const content = await zip.generateAsync({ type: "blob" });
                    saveAs(content, getUniqueName("converted_audio", "archive") + ".zip");
                }
            } finally {
                setConverting(false);
                setTimeout(() => dispatch(resetAllProgress()), 800);
            }
        },
        [files, converting, processFile]
    );

    const getProgressColor = useCallback((progress) => {
        if (progress === -1) return "#ff4757";
        if (progress === 100) return "#10ac84";
        return "#007bff";
    }, []);

    const canConvert = useCallback(
        () => files.length > 0 && !converting && !isLoading,
        [files, converting, isLoading]
    );

    return {
        files,
        setFiles,
        converting,
        isLoading,
        progressMap,
        handleRemoveFile,
        handleConvert,
        handleBatchConvert,
        getProgressColor,
        canConvert,
        getFileFormat,
    };
}
