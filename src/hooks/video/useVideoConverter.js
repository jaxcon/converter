import { useState, useRef, useEffect } from "react";
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL } from '@ffmpeg/util';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { processInParallel, MAX_PARALLEL } from "../../utils/parallelProcessor";
import { getUniqueName } from "../../utils/uniqueIdGenerator";


const getMimeTypeForFormat = (format) => {
    const mimeTypes = {
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'avi': 'video/x-msvideo',
        'mov': 'video/quicktime',
        'mkv': 'video/x-matroska',
        'flv': 'video/x-flv',
        '3gp': 'video/3gpp',
        '3g2': 'video/3gpp2',
        'ogg': 'video/ogg',
        'wmv': 'video/x-ms-wmv',
        'mpeg': 'video/mpeg',
        'mpg': 'video/mpeg',
        'm4v': 'video/mp4',
        'ts': 'video/mp2t',
        'mts': 'video/mp2t',
        'm2ts': 'video/mp2t'
    };
    return mimeTypes[format] || 'video/mp4';
};
const getCopyArgs = (inputFilename, outputFilename, targetFormat) => {
    const baseArgs = [
        '-i', inputFilename,
        '-c:v', 'copy',
        '-c:a', 'copy',
        '-y', outputFilename
    ];

    if (targetFormat.toLowerCase() === 'mp4' || targetFormat.toLowerCase() === 'mov') {
        return [...baseArgs, '-movflags', '+faststart'];
    }

    return baseArgs;
};

const getEncodeConversionArgs = (targetFormat, inputFilename, outputFilename) => {
    const baseArgs = [
        '-i', inputFilename,
        '-threads', '4',
        '-preset', 'ultrafast',
        '-tune', 'fastdecode',
    ];

    switch (targetFormat.toLowerCase()) {
        case 'mp4':
            return [
                ...baseArgs,
                '-c:v', 'libx264',
                '-c:a', 'aac',
                '-b:v', '1.5M',
                '-b:a', '128k',
                '-movflags', '+faststart',
                '-y', outputFilename
            ];

        case 'webm':
            return [
                ...baseArgs,
                '-c:v', 'libvpx-vp9',
                '-c:a', 'libopus',
                '-b:v', '1.2M',
                '-b:a', '96k',
                '-deadline', 'realtime',
                '-cpu-used', '6',
                '-y', outputFilename
            ];

        case 'avi':
            return [
                ...baseArgs,
                '-c:v', 'mpeg4',
                '-c:a', 'mp3',
                '-b:v', '1M',
                '-b:a', '96k',
                '-qscale:v', '4',
                '-y', outputFilename
            ];

        case 'mov':
            return [
                ...baseArgs,
                '-c:v', 'libx264',
                '-c:a', 'aac',
                '-b:v', '1.5M',
                '-b:a', '128k',
                '-movflags', '+faststart',
                '-y', outputFilename
            ];

        case 'mkv':
            return [
                ...baseArgs,
                '-c:v', 'libx264',
                '-c:a', 'aac',
                '-b:v', '1.5M',
                '-b:a', '128k',
                '-y', outputFilename
            ];

        case 'flv':
            return [
                ...baseArgs,
                '-c:v', 'flv',
                '-c:a', 'mp3',
                '-b:v', '1M',
                '-b:a', '96k',
                '-qscale:v', '4',
                '-y', outputFilename
            ];

        case '3gp':
        case '3g2':
            return [
                ...baseArgs,
                '-c:v', 'mpeg4',
                '-c:a', 'amr_nb',
                '-b:v', '512k',
                '-b:a', '12.2k',
                '-s', 'qcif',
                '-r', '15',
                '-y', outputFilename
            ];

        case 'ogg':
            return [
                ...baseArgs,
                '-c:v', 'libtheora',
                '-c:a', 'libvorbis',
                '-b:v', '800k',
                '-b:a', '96k',
                '-qscale:v', '5',
                '-y', outputFilename
            ];

        case 'wmv':
            return [
                ...baseArgs,
                '-c:v', 'wmv2',
                '-c:a', 'wmav2',
                '-b:v', '1.2M',
                '-b:a', '96k',
                '-qscale:v', '4',
                '-y', outputFilename
            ];

        case 'mpeg':
        case 'mpg':
            return [
                ...baseArgs,
                '-c:v', 'mpeg2video',
                '-c:a', 'mp2',
                '-b:v', '2M',
                '-b:a', '192k',
                '-y', outputFilename
            ];

        default:
            return [
                ...baseArgs,
                '-c:v', 'libx264',
                '-c:a', 'aac',
                '-b:v', '1.5M',
                '-b:a', '128k',
                '-y', outputFilename
            ];
    }
};
const conversionPresets = {
    mp4: (input, output) => [
        [
            "-i", input,
            "-c:v", "copy", "-c:a", "copy",
            "-y", output
        ],
        [
            "-i", input,
            "-c:v", "libx264", "-c:a", "aac",
            "-crf", "23", "-preset", "veryfast",
            "-movflags", "+faststart",
            "-y", output
        ]
    ],

    webm: (input, output, ext) => {
        if (ext === "webm") {
            return [
                ["-i", input, "-c:v", "copy", "-c:a", "copy", "-y", output]
            ];
        }
        
        return [
            [
                "-i", input,
                "-c:v", "libvpx", "-c:a", "libvorbis",
                "-b:v", "1M", "-b:a", "128k",
                "-y", output
            ]
        ];
    },
    avi: (input, output) => [
        [
            "-i", input,
            "-c:v", "libx264", "-c:a", "aac",
            "-crf", "28", "-b:v", "600k", "-b:a", "64k",
            "-preset", "ultrafast", "-tune", "fastdecode",
            "-pix_fmt", "yuv420p", "-movflags", "+faststart",
            "-threads", "6", "-x264opts", "no-mbtree:no-cabac",
            "-y", output
        ],
        [
            "-i", input,
            "-c:v", "mpeg4", "-c:a", "mp3",
            "-b:v", "600k", "-b:a", "64k",
            "-qscale:v", "6", "-flags", "+qscale",
            "-maxrate", "800k", "-bufsize", "1600k", "-g", "30",
            "-y", output
        ]
    ],
    "3gp": (input, output) => [
        [
            "-i", input,
            "-c:v", "mpeg4", "-c:a", "aac",
            "-b:v", "512k", "-b:a", "12.2k",
            "-s", "640x480", "-r", "20",
            "-ar", "8000", "-ac", "1",
            "-qscale:v", "5", "-mbd", "2", "-trellis", "1",
            "-strict", "experimental", "-y", output
        ],
        [
            "-i", input,
            "-c:v", "mpeg4", "-c:a", "mp3",
            "-b:v", "384k", "-b:a", "12.2k",
            "-s", "352x288", "-r", "15",
            "-ar", "8000", "-ac", "1",
            "-strict", "experimental", "-y", output
        ]
    ]
};

export function useVideoConverter() {
    const [files, setFiles] = useState([]);
    const [converting, setConverting] = useState(false);
    const [progress, setProgress] = useState({});
    const ffmpegInstancesRef = useRef(new Map());

    const handleRemoveFile = (index) => {
        setFiles((prev) => {
            const fileToRemove = prev[index];

            if (fileToRemove.preview) {
                URL.revokeObjectURL(fileToRemove.preview);
            }

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

            ffmpegInstancesRef.current.forEach((ffmpeg, id) => {
                ffmpeg.terminate();
            });
            ffmpegInstancesRef.current.clear();
        };
    }, [files]);

    const getFFmpegInstance = async (id) => {
        if (ffmpegInstancesRef.current.has(id)) {
            return ffmpegInstancesRef.current.get(id);
        }
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
        const ffmpeg = new FFmpeg();
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        ffmpegInstancesRef.current.set(id, ffmpeg);
        return ffmpeg;
    };

    const cleanupFFmpegInstance = (id) => {
        if (ffmpegInstancesRef.current.has(id)) {
            ffmpegInstancesRef.current.delete(id);
        }
    };

    async function tryConversions(ffmpeg, inputFilename, outputFilename, argSets, mimeType) {
        for (const args of argSets) {
            try {

                await ffmpeg.exec(args);

                let data;
                try {
                    data = await ffmpeg.readFile(outputFilename);
                } catch {
                    data = null;
                }

                if (data && data.length > 200) {
                    const blob = new Blob([data], { type: mimeType });
                    await ffmpeg.deleteFile(inputFilename);
                    await ffmpeg.deleteFile(outputFilename);
                    return blob;
                } else {
                    console.warn("Conversion attempt produced invalid/empty file, trying next...");
                }
            } catch (err) {
                console.warn("Conversion attempt failed:", err.message);
            }
        }
        throw new Error("All conversion attempts failed");
    }

    const convertVideo = async (file, targetFormat, onProgress, instanceId) => {
        const sourceExtension = file.name.split('.').pop().toLowerCase();
        if (sourceExtension === targetFormat.toLowerCase()) {
            if (onProgress) onProgress(100);
            return new Blob([await file.arrayBuffer()], { type: file.type });
        }

        const ffmpeg = await getFFmpegInstance(instanceId);

        ffmpeg.on("progress", ({ progress: ratio }) => {
            if (onProgress) onProgress(Math.round(ratio * 100));
        });

        const arrayBuffer = await file.arrayBuffer();
        const inputFilename = `input.${sourceExtension}`;
        const outputFilename = `output.${targetFormat.toLowerCase()}`;
        await ffmpeg.writeFile(inputFilename, new Uint8Array(arrayBuffer));

        const mimeType = getMimeTypeForFormat(targetFormat);

        if (conversionPresets[targetFormat.toLowerCase()]) {
            const argSets = conversionPresets[targetFormat.toLowerCase()](inputFilename, outputFilename, sourceExtension);
            return await tryConversions(ffmpeg, inputFilename, outputFilename, argSets, mimeType);
        }

        const argSets = [
            getCopyArgs(inputFilename, outputFilename, targetFormat),
            getEncodeConversionArgs(targetFormat, inputFilename, outputFilename)
        ];
        return await tryConversions(ffmpeg, inputFilename, outputFilename, argSets, mimeType);
    };

    const downloadVideo = (blob, filename) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => URL.revokeObjectURL(url));
        } else {
            setTimeout(() => URL.revokeObjectURL(url), 0);
        }
    };

    const processVideos = async (targetFormat, isBatch = false) => {
        if (!files.length) return [];

        const processor = async (fileObj, index) => {
            const instanceId = `instance_${fileObj.id}_${index}`;

            try {
                setProgress(prev => ({ ...prev, [fileObj.id]: 0 }));

                const convertedBlob = await convertVideo(
                    fileObj.file,
                    targetFormat,
                    (progress) => setProgress(prev => ({ ...prev, [fileObj.id]: progress })),
                    instanceId
                );

                setProgress(prev => ({ ...prev, [fileObj.id]: 100 }));

                if (!isBatch) {
                    const newFilename = getUniqueName(fileObj.file.name, 'converted') + `.${targetFormat.toLowerCase()}`;
                    downloadVideo(convertedBlob, newFilename);
                }

                return {
                    success: true,
                    fileObj,
                    blob: convertedBlob,
                    filename: getUniqueName(fileObj.file.name, 'converted') + `.${targetFormat.toLowerCase()}`
                };

            } catch (error) {
                console.error(`Conversion error for ${fileObj.file.name}:`, error);
                setProgress(prev => ({ ...prev, [fileObj.id]: -1 }));

                return {
                    success: false,
                    fileObj,
                    error: error.message
                };
            } finally {
                cleanupFFmpegInstance(instanceId);
            }
        };

        return await processInParallel(files, processor, MAX_PARALLEL);
    };

    const handleConvert = async (targetFormat) => {
        if (!files.length) return;

        setConverting(true);
        setProgress({});
        try {
            await processVideos(targetFormat, false);
        } finally {
            setTimeout(() => {
                setConverting(false);
                setProgress({});
            }, 800);
        }
    };

    const handleBatchConvert = async (targetFormat) => {
        if (!files.length) return;

        setConverting(true);
        setProgress({});

        try {
            const results = await processVideos(targetFormat, true);
            const successfulResults = results.filter(result => result.success);

            if (successfulResults.length > 0) {
                const zip = new JSZip();

                successfulResults.forEach(result => {
                    zip.file(result.filename, result.blob);
                });

                const content = await zip.generateAsync({ type: "blob" });
                const zipFilename = getUniqueName('converted_videos', 'archive') + `.zip`;
                saveAs(content, zipFilename);
            }
        } catch (error) {
            console.error('Archive creation error:', error);
        } finally {
            setTimeout(() => {
                setConverting(false);
                setProgress({});
            }, 800);
        }
    };

    const getProgressColor = (progress) => {
        if (progress === -1) return '#ff4757';
        if (progress === 100) return '#10ac84';
        return '#007bff';
    };

    return {
        files,
        setFiles,
        converting,
        progress,
        handleRemoveFile,
        handleConvert,
        handleBatchConvert,
        getProgressColor
    };
}