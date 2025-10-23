import { useState, useRef, useEffect, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import { getUniqueName } from "../../utils/uniqueIdGenerator";

const dragThreshold = 5;
const handleWidth = 10;

export const useVideoCrop = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const [videoUrl, setVideoUrl] = useState('');
    const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
    const [ffmpegLoading, setFfmpegLoading] = useState(false);
    const [conversionProgress, setConversionProgress] = useState(0);
    const [videoError, setVideoError] = useState('');

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const timelineRef = useRef(null);
    const ffmpegRef = useRef(null);
    const isDragging = useRef(false);
    const dragType = useRef('');
    const dragStartX = useRef(0);
    const dragStartValues = useRef({ start: 0, end: 0 });
    const videoBlobUrlRef = useRef('');

    const cleanupPreviousVideo = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.src = '';
            videoRef.current.load();
        }

        if (videoBlobUrlRef.current) {
            URL.revokeObjectURL(videoBlobUrlRef.current);
            videoBlobUrlRef.current = '';
        }

        setVideoUrl('');
        setVideoFile(null);
        setDuration(0);
        setCurrentTime(0);
        setSelection({ start: 0, end: 0 });
        setIsPlaying(false);
        setVideoError('');
    }, []);

    const loadFFmpeg = useCallback(async () => {
        if (ffmpegLoaded || ffmpegLoading) return;

        setFfmpegLoading(true);

        try {
            const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
            const ffmpeg = new FFmpeg();

            ffmpeg.on('log', ({ message }) => {
                console.log('FFmpeg log:', message);
            });

            ffmpeg.on('progress', ({ progress }) => {
                const percent = Math.round(progress * 100);
                setConversionProgress(percent);
            });

            await ffmpeg.load({
                coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
                wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            });

            ffmpegRef.current = ffmpeg;
            setFfmpegLoaded(true);
        } catch (error) {
            console.error('Ошибка загрузки FFmpeg:', error);
        } finally {
            setFfmpegLoading(false);
        }
    }, [ffmpegLoaded, ffmpegLoading]);

    useEffect(() => {
        loadFFmpeg();
    }, [loadFFmpeg]);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            const fileObj = uploadedFiles[0];
            const file = fileObj.file;

            cleanupPreviousVideo();

            setVideoFile(fileObj);

            const url = URL.createObjectURL(file);
            videoBlobUrlRef.current = url;
            setVideoUrl(url);

        } else if (uploadedFiles.length === 0) {
            cleanupPreviousVideo();
        }
    }, [uploadedFiles, cleanupPreviousVideo]);

    useEffect(() => {
        return () => {
            if (videoBlobUrlRef.current) {
                URL.revokeObjectURL(videoBlobUrlRef.current);
                videoBlobUrlRef.current = '';
            }

            uploadedFiles.forEach(fileObj => {
                if (fileObj.preview) {
                    URL.revokeObjectURL(fileObj.preview);
                }
            });
        };
    }, [uploadedFiles]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !videoUrl) return;

        const handleLoadedMetadata = () => {
            const videoDuration = video.duration;
            setDuration(videoDuration);
            setSelection({ start: 0, end: videoDuration });
            setCurrentTime(0);

            setTimeout(() => {
                drawTimeline();
            }, 100);
        };

        const handleTimeUpdate = () => {
            const currentTime = video.currentTime;
            setCurrentTime(currentTime);

            if (isPlaying && currentTime >= selection.end - 0.1) {
                video.currentTime = selection.start;
                setCurrentTime(selection.start);
            }
        };

        const handleEnded = () => {
            setIsPlaying(false);

            if (videoRef.current) {
                videoRef.current.currentTime = selection.start;
                setCurrentTime(selection.start);
            }
        };

        const handleError = (e) => {
            console.error('Video error:', e);
            const fileName = videoFile?.file?.name || 'видео';
            setVideoError(`Loading error ${fileName}`);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleError);

        if (video.src !== videoUrl) {
            video.src = videoUrl;
        }

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('ended', handleEnded);
            video.removeEventListener('error', handleError);
        };
    }, [videoUrl, isPlaying, selection, videoFile]);

    const drawTimeline = useCallback(() => {
        if (!canvasRef.current || !canvasRef.current.width || duration <= 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, width, height);

        for (let x = 0; x < width; x += 20) {
            const time = (x / width) * duration;
            const inSelection = time >= selection.start && time <= selection.end;

            ctx.fillStyle = inSelection ? '#ff6b35' : '#007bff';

            const barHeight = x % 100 === 0 ? 25 : 15;
            ctx.fillRect(x, height - barHeight, 2, barHeight);

            if (x % 100 === 0) {
                ctx.fillStyle = '#495057';
                ctx.font = '10px Arial';
                ctx.fillText(formatTime(time), x - 10, height - 30);
            }
        }

        const startX = (selection.start / duration) * width;
        const endX = (selection.end / duration) * width;

        ctx.fillStyle = 'rgba(255, 107, 53, 0.2)';
        ctx.fillRect(startX, 0, endX - startX, height);

        ctx.fillStyle = '#ff6b35';
        ctx.fillRect(startX - 2, 0, 4, height);
        ctx.fillRect(endX - 2, 0, 4, height);

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(startX - 1, 5, 2, height - 10);
        ctx.fillRect(endX - 1, 5, 2, height - 10);

        const currentX = (currentTime / duration) * width;

        ctx.fillStyle = '#00c853';
        ctx.fillRect(currentX - 1, 0, 3, height);

        ctx.fillStyle = '#00c853';
        ctx.beginPath();
        ctx.moveTo(currentX - 8, 0);
        ctx.lineTo(currentX + 8, 0);
        ctx.lineTo(currentX, 12);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(currentX, 6, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#00c853';
        ctx.lineWidth = 2;
        ctx.stroke();
    }, [duration, selection, currentTime]);

    useEffect(() => {
        if (duration > 0) {
            drawTimeline();
        }
    }, [drawTimeline, duration]);

    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const { width } = entry.contentRect;
                if (canvas.width !== width) {
                    canvas.width = width;
                    drawTimeline();
                }
            }
        });

        resizeObserver.observe(canvas);
        return () => resizeObserver.disconnect();
    }, [drawTimeline]);

    const getClientX = (e) => {
        return e.touches?.[0]?.clientX || e.changedTouches?.[0]?.clientX || e.clientX;
    };

    const handleStart = useCallback((e) => {
        if (!duration || !timelineRef.current) return;

        const rect = timelineRef.current.getBoundingClientRect();
        const x = getClientX(e) - rect.left;
        const clickTime = (x / rect.width) * duration;

        const startX = (selection.start / duration) * rect.width;
        const endX = (selection.end / duration) * rect.width;

        dragStartX.current = x;
        dragStartValues.current = { ...selection };
        isDragging.current = false;

        const isStartHandle = Math.abs(x - startX) < handleWidth;
        const isEndHandle = Math.abs(x - endX) < handleWidth;
        const isInSelection = x > startX && x < endX;

        if (isStartHandle) {
            dragType.current = "start";
        } else if (isEndHandle) {
            dragType.current = "end";
        } else if (isInSelection) {
            dragType.current = "move";
        } else {
            dragType.current = "seek";
            if (videoRef.current) {
                videoRef.current.currentTime = clickTime;
            }
            setCurrentTime(clickTime);
        }

        if (dragType.current !== "seek") {
            document.addEventListener("mousemove", handleMove);
            document.addEventListener("mouseup", handleEnd);
            document.addEventListener("touchmove", handleMove, { passive: false });
            document.addEventListener("touchend", handleEnd);
        }
    }, [duration, selection]);

    const handleMove = useCallback((e) => {
        if (!duration || !timelineRef.current) return;

        if (e.cancelable) e.preventDefault();

        const rect = timelineRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(getClientX(e) - rect.left, rect.width));
        const deltaX = x - dragStartX.current;
        const deltaTime = (deltaX / rect.width) * duration;

        if (!isDragging.current && Math.abs(deltaX) > dragThreshold) {
            isDragging.current = true;
        }

        if (!isDragging.current) return;

        setSelection((prev) => {
            const newSelection = { ...prev };
            switch (dragType.current) {
                case "start": {
                    newSelection.start = Math.max(0, Math.min(dragStartValues.current.start + deltaTime, prev.end - 0.1));
                    break;
                }
                case "end": {
                    newSelection.end = Math.min(duration, Math.max(dragStartValues.current.end + deltaTime, prev.start + 0.1));
                    break;
                }
                case "move": {
                    const range = prev.end - prev.start;
                    const newStart = Math.max(0, Math.min(dragStartValues.current.start + deltaTime, duration - range));
                    newSelection.start = newStart;
                    newSelection.end = newStart + range;
                    break;
                }
                default:
                    break;
            }
            return newSelection;
        });
    }, [duration]);

    const handleEnd = useCallback((e) => {
        const rect = timelineRef.current?.getBoundingClientRect();

        if (!isDragging.current && rect && (dragType.current === "move" || dragType.current === "start" || dragType.current === "end")) {
            const clientX = getClientX(e);
            if (typeof clientX === "number") {
                const x = clientX - rect.left;
                const clickTime = (x / rect.width) * duration;
                if (clickTime >= 0 && clickTime <= duration && videoRef.current) {
                    videoRef.current.currentTime = clickTime;
                    setCurrentTime(clickTime);
                }
            }
        }

        isDragging.current = false;
        dragType.current = "";

        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleEnd);
        document.removeEventListener("touchmove", handleMove);
        document.removeEventListener("touchend", handleEnd);
    }, [duration, handleMove]);

    const handlePlayPause = useCallback(() => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            if (videoRef.current.currentTime < selection.start || videoRef.current.currentTime > selection.end) {
                videoRef.current.currentTime = selection.start;
                setCurrentTime(selection.start);
            }

            videoRef.current.play().catch(error => {
                console.error('Ошибка воспроизведения:', error);
                setIsPlaying(false);
            });
            setIsPlaying(true);
        }
    }, [isPlaying, selection]);

    const getFFmpegCommand = (fileExtension, startTime, durationTime, segmentDuration, inputFileName, outputFileName) => {
        fileExtension = fileExtension.toLowerCase();

        if (fileExtension === "webm" || fileExtension === "ogg") {
            return [
                "-i", inputFileName,
                "-ss", startTime,
                "-t", durationTime,
                "-c", "copy",
                "-y",
                outputFileName
            ];
        }

        if (["mp4", "mov", "m4v", "mkv"].includes(fileExtension)) {
            if (segmentDuration <= 8) {
                return [
                    "-i", inputFileName,
                    "-ss", startTime,
                    "-t", durationTime,
                    "-c:v", "libx264",
                    "-crf", "34",
                    "-preset", "ultrafast",
                    '-avoid_negative_ts', 'make_zero',
                    "-profile:v", "baseline",
                    "-level", "3.0",
                    '-fflags', '+genpts',
                    "-c:a", "copy",
                    "-y",
                    outputFileName
                ];
            } else {
                return [
                    "-i", inputFileName,
                    "-ss", startTime,
                    "-t", durationTime,
                    "-c", "copy",
                    '-avoid_negative_ts', 'make_zero',
                    "-y",
                    outputFileName
                ];
            }
        }

        return [
            "-i", inputFileName,
            "-ss", startTime,
            "-t", durationTime,
            "-c", "copy",
            "-y",
            outputFileName
        ];
    };

    const cropVideoWithFFmpeg = async () => {
        if (!videoFile || !ffmpegRef.current) return null;

        try {
            const ffmpeg = ffmpegRef.current;
            const file = videoFile.file;

            const fileExtension = file.name.split('.').pop().toLowerCase();
            const inputFileName = `input.${fileExtension}`;
            const outputFileName = `output.${fileExtension}`;

            await ffmpeg.writeFile(inputFileName, await fetchFile(file));

            const startTime = selection.start.toFixed(3);
            const durationTime = (selection.end - selection.start).toFixed(3);
            const segmentDuration = selection.end - selection.start;

            const command = getFFmpegCommand(
                fileExtension,
                startTime,
                durationTime,
                segmentDuration,
                inputFileName,
                outputFileName
            );

            await ffmpeg.exec(command);

            const data = await ffmpeg.readFile(outputFileName);
            const blob = new Blob([data], { type: file.type });

            try {
                await ffmpeg.deleteFile(inputFileName);
                await ffmpeg.deleteFile(outputFileName);
            } catch (cleanupError) {
                console.warn('Cleanup error:', cleanupError);
            }

            return blob;

        } catch (error) {
            console.error('Ошибка FFmpeg:', error);
            throw error;
        }
    };

    const handleCropAndDownload = async () => {
        if (!videoFile) return;

        setIsProcessing(true);
        setConversionProgress(0);

        try {
            if (!ffmpegLoaded && !ffmpegLoading) {
                await loadFFmpeg();
                if (!ffmpegLoaded) {
                    throw new Error('Не удалось загрузить конвертер');
                }
            }

            const videoBlob = await cropVideoWithFFmpeg();

            if (!videoBlob) {
                throw new Error('Не удалось обработать видео');
            }

            const url = URL.createObjectURL(videoBlob);
            const link = document.createElement('a');
            link.href = url;

            const originalName = videoFile.file.name.replace(/\.[^/.]+$/, '');
            const fileExtension = videoFile.file.name.split('.').pop().toLowerCase();
            link.download = getUniqueName(originalName, 'cropped') + `.${fileExtension}`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setTimeout(() => URL.revokeObjectURL(url), 100);
        } catch (error) {
            console.error('Ошибка обработки видео:', error);
        } finally {
            setIsProcessing(false);
            setConversionProgress(0);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || seconds === Infinity || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return {
        uploadedFiles,
        videoFile,
        isProcessing,
        isPlaying,
        currentTime,
        duration,
        selection,
        videoUrl,
        ffmpegLoaded,
        ffmpegLoading,
        conversionProgress,
        videoError,

        videoRef,
        canvasRef,
        timelineRef,

        setIsPlaying,
        setUploadedFiles,
        handlePlayPause,
        handleStart,
        handleCropAndDownload,
        formatTime
    };
};