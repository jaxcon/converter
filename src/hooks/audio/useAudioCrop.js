import { useState, useRef, useEffect, useCallback } from "react";
import { useFFmpeg } from "../common/useFFmpeg";
import { getUniqueName } from "../../utils/uniqueIdGenerator";
import { DRAG_THRESHOLD, SUPPORTED_FORMATS, MIME_TYPES } from "./audioCrop.config";

export function useAudioCrop() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [audioFile, setAudioFile] = useState(null);
    const [audioBuffer, setAudioBuffer] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [selection, setSelection] = useState({ start: 0, end: 0 });
    const [conversionProgress, setConversionProgress] = useState(0);
    const [volume, setVolume] = useState(0.3);

    const audioRef = useRef(null);
    const canvasRef = useRef(null);
    const timelineRef = useRef(null);
    const audioUrlsRef = useRef(new Set());

    const isDragging = useRef(false);
    const dragType = useRef("");
    const dragStartX = useRef(0);
    const dragStartValues = useRef({ start: 0, end: 0 });

    const { isReady, load, runCommand } = useFFmpeg();

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (!audioRef.current) return;
        if (currentTime < selection.start || currentTime > selection.end) {
            audioRef.current.currentTime = selection.start;
        }
    }, [selection]);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            const fileObj = uploadedFiles[0];
            setAudioFile(fileObj);

            const audio = new Audio();
            const url = URL.createObjectURL(fileObj.file);
            audio.src = url;
            audioRef.current = audio;
            audio.volume = volume;
            audioUrlsRef.current.add(url);

            setIsPlaying(false);
            setCurrentTime(0);

            audio.addEventListener('loadedmetadata', () => {
                setDuration(audio.duration);
                setSelection({ start: 0, end: audio.duration });
            });

            audio.addEventListener('timeupdate', () => {
                setCurrentTime(audio.currentTime);
            });

            audio.addEventListener('ended', () => {
                setIsPlaying(false);
            });

            const loadAudioBuffer = async () => {
                try {
                    const arrayBuffer = await fileObj.file.arrayBuffer();
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const buffer = await audioContext.decodeAudioData(arrayBuffer);
                    setAudioBuffer(buffer);
                } catch (error) {
                    console.error("Ошибка загрузки аудио буфера:", error);
                }
            };

            loadAudioBuffer();
        }

        return () => {
            audioUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
            audioUrlsRef.current.clear();

            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, [uploadedFiles]);

    useEffect(() => {
        if (!audioRef.current) return;

        if (currentTime > selection.end) {
            audioRef.current.currentTime = selection.start;
            setCurrentTime(selection.start);
        }

        if (currentTime < selection.start) {
            audioRef.current.currentTime = selection.start;
            setCurrentTime(selection.start);
        }
    }, [currentTime, selection, setCurrentTime]);

    const drawWaveform = useCallback(() => {
        if (!canvasRef.current || duration <= 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#f8f9fa";
        ctx.fillRect(0, 0, width, height);

        const centerY = height / 2;

        for (let x = 0; x < width; x += 2) {
            const time = (x / width) * duration;
            const inSelection = time >= selection.start && time <= selection.end;

            ctx.fillStyle = inSelection ? "#ff6b35" : "#007bff";
            const amplitude = Math.sin((x / width) * Math.PI * 12) * 35 + 15;
            ctx.fillRect(x, centerY - amplitude / 2, 1, amplitude);
        }

        if (duration > 0 && currentTime > 0) {
            const currentX = (currentTime / duration) * width;

            ctx.fillStyle = "#00c853";
            ctx.fillRect(currentX - 1, -10, 3, height + 20);

            ctx.beginPath();
            ctx.moveTo(currentX - 8, 0);
            ctx.lineTo(currentX + 8, 0);
            ctx.lineTo(currentX, 12);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(currentX - 8, height);
            ctx.lineTo(currentX + 8, height);
            ctx.lineTo(currentX, height - 12);
            ctx.closePath();
            ctx.fill();
        }
    }, [duration, selection, currentTime]);

    useEffect(() => {
        if (duration > 0) drawWaveform();
    }, [drawWaveform, duration]);

    useEffect(() => {
        if (!canvasRef.current) return;
        const resizeObserver = new ResizeObserver(() => {
            const canvas = canvasRef.current;
            if (canvas) {
                canvas.width = canvas.offsetWidth;
                drawWaveform();
            }
        });
        resizeObserver.observe(canvasRef.current);
        return () => resizeObserver.disconnect();
    }, [drawWaveform]);

    const getClientX = (e) =>
        e.touches?.[0]?.clientX || e.changedTouches?.[0]?.clientX || e.clientX;

    const handleStart = (e) => {
        if (!duration || !timelineRef.current) return;
        const rect = timelineRef.current.getBoundingClientRect();
        const x = getClientX(e) - rect.left;
        const clickTime = (x / rect.width) * duration;

        const handleWidth = 20;
        const startX = (selection.start / duration) * rect.width;
        const endX = (selection.end / duration) * rect.width;

        dragStartX.current = x;
        dragStartValues.current = { ...selection };
        isDragging.current = false;

        if (Math.abs(x - startX) < handleWidth) {
            dragType.current = "start";
            isDragging.current = true;
        } else if (Math.abs(x - endX) < handleWidth) {
            dragType.current = "end";
            isDragging.current = true;
        } else if (x > startX && x < endX) {
            dragType.current = "move";
        } else {
            audioRef.current.currentTime = clickTime;
            setCurrentTime(clickTime);
            return;
        }

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleEnd);
        document.addEventListener("touchmove", handleMove, { passive: false });
        document.addEventListener("touchend", handleEnd);
    };

    const handleMove = (e) => {
        if (!duration || !timelineRef.current) return;
        if (e.cancelable) e.preventDefault();

        const rect = timelineRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(getClientX(e) - rect.left, rect.width));
        const deltaX = x - dragStartX.current;
        const deltaTime = (deltaX / rect.width) * duration;

        if (
            dragType.current === "move" &&
            !isDragging.current &&
            Math.abs(deltaX) > DRAG_THRESHOLD
        ) {
            isDragging.current = true;
        }
        if (!isDragging.current) return;

        setSelection((prev) => {
            const newSelection = { ...prev };
            switch (dragType.current) {
                case "start":
                    newSelection.start = Math.max(
                        0,
                        Math.min(dragStartValues.current.start + deltaTime, prev.end - 0.1)
                    );
                    break;
                case "end":
                    newSelection.end = Math.min(
                        duration,
                        Math.max(dragStartValues.current.end + deltaTime, prev.start + 0.1)
                    );
                    break;
                case "move":
                    const range = prev.end - prev.start;
                    const newStart = Math.max(
                        0,
                        Math.min(dragStartValues.current.start + deltaTime, duration - range)
                    );
                    newSelection.start = newStart;
                    newSelection.end = newStart + range;
                    break;
            }
            return newSelection;
        });
    };

    const handleEnd = (e) => {
        const rect = timelineRef.current?.getBoundingClientRect();
        if (!isDragging.current && rect) {
            const clientX = getClientX(e);
            if (typeof clientX === "number") {
                const x = clientX - rect.left;
                const clickTime = (x / rect.width) * duration;
                if (clickTime >= 0 && clickTime <= duration) {
                    audioRef.current.currentTime = clickTime;
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
    };

    const bufferToWav = (buffer) => {
        try {
            const numOfChannels = buffer.numberOfChannels;
            const length = buffer.length * numOfChannels * 2;
            const sampleRate = buffer.sampleRate;

            const arrayBuffer = new ArrayBuffer(44 + length);
            const view = new DataView(arrayBuffer);

            const writeString = (offset, string) => {
                for (let i = 0; i < string.length; i++) {
                    view.setUint8(offset + i, string.charCodeAt(i));
                }
            };

            writeString(0, "RIFF");
            view.setUint32(4, 36 + length, true);
            writeString(8, "WAVE");
            writeString(12, "fmt ");
            view.setUint32(16, 16, true);
            view.setUint16(20, 1, true);
            view.setUint16(22, numOfChannels, true);
            view.setUint32(24, sampleRate, true);
            view.setUint32(28, sampleRate * numOfChannels * 2, true);
            view.setUint16(32, numOfChannels * 2, true);
            view.setUint16(34, 16, true);
            writeString(36, "data");
            view.setUint32(40, length, true);

            let offset = 44;
            for (let i = 0; i < buffer.length; i++) {
                for (let channel = 0; channel < numOfChannels; channel++) {
                    const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[i]));
                    view.setInt16(
                        offset,
                        sample < 0 ? sample * 0x8000 : sample * 0x7fff,
                        true
                    );
                    offset += 2;
                }
            }
            return new Blob([arrayBuffer], { type: "audio/wav" });
        } catch (error) {
            console.error("Ошибка создания WAV:", error);
            throw error;
        }
    };

    const cropAudioWithFFmpeg = async () => {
        if (!audioFile || !isReady) return null;
        const file = audioFile.file;
        const ext = file.name.split(".").pop().toLowerCase();
        const inputName = `input.${ext}`;
        const outputName = `output.${ext}`;

        const { codec, params } = SUPPORTED_FORMATS[ext];
        const startTime = selection.start.toFixed(3);
        const durationTime = (selection.end - selection.start).toFixed(3);

        const cmd = [
            "-i",
            inputName,
            "-ss",
            startTime,
            "-t",
            durationTime,
            "-c:a",
            codec,
            ...params,
            "-y",
            outputName,
        ];

        const results = await runCommand(cmd, { [inputName]: file }, [outputName]);
        return new Blob([results[outputName]], {
            type: MIME_TYPES[ext] || "audio/mpeg",
        });
    };

    const cropAudioWebAPI = async () => {
        if (!audioBuffer) return null;
        try {
            const audioContext = new (window.AudioContext ||
                window.webkitAudioContext)();
            const startOffset = Math.floor(selection.start * audioBuffer.sampleRate);
            const endOffset = Math.floor(selection.end * audioBuffer.sampleRate);
            const frameCount = endOffset - startOffset;

            const newBuffer = audioContext.createBuffer(
                audioBuffer.numberOfChannels,
                frameCount,
                audioBuffer.sampleRate
            );

            for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
                const channelData = audioBuffer.getChannelData(channel);
                const newChannelData = newBuffer.getChannelData(channel);
                for (let i = 0; i < frameCount; i++) {
                    newChannelData[i] = channelData[startOffset + i];
                }
            }
            return bufferToWav(newBuffer);
        } catch (error) {
            console.error("Ошибка Web Audio API:", error);
            throw error;
        }
    };

    const handleCropAndDownload = async () => {
        if (!audioFile) return;
        setIsProcessing(true);
        setConversionProgress(0);
        try {
            const audioBlob = isReady
                ? await cropAudioWithFFmpeg()
                : await cropAudioWebAPI();
            if (!audioBlob) return;

            const url = URL.createObjectURL(audioBlob);
            const link = document.createElement("a");
            link.href = url;

            const originalName = audioFile.file.name.replace(/\.[^/.]+$/, "");
            const fileExtension = audioFile.file.name.split(".").pop().toLowerCase();
            link.download = getUniqueName(originalName, 'cropped') + `.${fileExtension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            if ('requestIdleCallback' in window) {
                requestIdleCallback(() => URL.revokeObjectURL(url));
            } else {
                setTimeout(() => URL.revokeObjectURL(url), 0);
            }
        } catch (error) {
            console.error("Ошибка обрезки:", error);
        } finally {
            setIsProcessing(false);
            setConversionProgress(0);
        }
    };

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (
                audioRef.current.currentTime < selection.start ||
                audioRef.current.currentTime > selection.end
            ) {
                audioRef.current.currentTime = selection.start;
            }
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    return {
        uploadedFiles,
        setUploadedFiles,
        audioFile,
        isProcessing,
        isPlaying,
        currentTime,
        duration,
        selection,
        conversionProgress,
        setSelection,
        volume,
        setVolume,


        audioRef,
        canvasRef,
        timelineRef,

        handleStart,
        handlePlayPause,
        handleCropAndDownload,
    };
}