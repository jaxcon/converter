import { useCallback, useReducer, useState, useEffect } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useFFmpeg } from "../common/useFFmpeg";
import {
    progressReducer,
    setProgress,
    removeProgress,
    resetAllProgress,
} from "../../utils/progressReducer";
import { processInParallel, MAX_PARALLEL } from "../../utils/parallelProcessor";
import { getUniqueName } from "../../utils/uniqueIdGenerator";
import { getFileFormat, getTargetCompressFormat, getBitrate } from "../../utils/audioUtils";


export function useAudioCompressor() {
    const { isReady, runCommand, load } = useFFmpeg();
    const [files, setFiles] = useState([]);
    const [compressing, setCompressing] = useState(false);
    const [progressMap, dispatch] = useReducer(progressReducer, new Map());

    useEffect(() => {
        load();
    }, [load]);

    const handleRemoveFile = useCallback((index) => {
        setFiles((prev) => {
            const fileToRemove = prev[index];
            dispatch(removeProgress(fileToRemove.id));
            return prev.filter((_, idx) => idx !== index);
        });
    }, []);

    const downloadAudio = useCallback((blob, filename) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        ("requestIdleCallback" in window
            ? requestIdleCallback
            : (cb) => setTimeout(cb, 0))(() => URL.revokeObjectURL(url));
    }, []);

    const compressWithFFmpeg = useCallback(
        async (fileObj, format, bitrate, compression = 50) => {
            if (!isReady) throw new Error("FFmpeg not ready");

            const inputExt = fileObj.file.name.split(".").pop().toLowerCase();
            const uniqueId = `${fileObj.id}_${Date.now()}_${crypto.randomUUID()}`;
            const inputName = `input_${uniqueId}.${inputExt}`;
            const outputName = `output_${uniqueId}.${format.toLowerCase()}`;

            const codecOptions = {
                MP3: ["-codec:a", "libmp3lame", "-q:a", String(Math.round((compression / 100) * 9))],
                AAC: ["-codec:a", "aac", "-b:a", `${bitrate}k`],
                OPUS: ["-codec:a", "libopus", "-b:a", `${bitrate}k`, "-vbr", "constrained"],
                OGG: ["-codec:a", "libvorbis", "-q:a", String(Math.max(1, Math.round(bitrate / 32)))]
            };

            const cmd = ["-i", inputName, "-vn", "-y"];
            cmd.push(...(codecOptions[format] || ["-codec:a", "libmp3lame", "-b:a", `${bitrate}k`]));
            cmd.push(outputName);

            const results = await runCommand(
                cmd,
                { [inputName]: fileObj.file },
                [outputName]
            );

            dispatch(setProgress(fileObj.id, 100));
            return new Blob([results[outputName]], { type: `audio/${format.toLowerCase()}` });
        },
        [isReady, runCommand]
    );

    const handleCompress = useCallback(
        async (zipMode = false) => {
            if (!files.length || compressing) return;

            setCompressing(true);
            dispatch(resetAllProgress());

            try {
                const zip = zipMode ? new JSZip() : null;

                await processInParallel(
                    files,
                    async (fileObj) => {
                        const format = getTargetCompressFormat(getFileFormat(fileObj.file.name));
                        const bitrate = getBitrate(format);

                        try {
                            dispatch(setProgress(fileObj.id, 0));
                            const blob = await compressWithFFmpeg(fileObj, format, bitrate);
                            const name = getUniqueName(fileObj.file.name, "compressed") + `.${format.toLowerCase()}`;

                            zip ? zip.file(name, blob) : downloadAudio(blob, name);
                            return { success: true, fileObj, blob, name };
                        } catch (err) {
                            console.error("Compression error:", err);
                            dispatch(setProgress(fileObj.id, -1));
                            return { success: false, fileObj, error: err };
                        }
                    },
                    MAX_PARALLEL
                );

                if (zip) {
                    const content = await zip.generateAsync({ type: "blob" });
                    saveAs(content, getUniqueName("compressed_audio", "archive") + ".zip");
                }
            } catch (error) {
                console.error("Compression process error:", error);
            } finally {
                setCompressing(false);
            }
        },
        [files, compressing, compressWithFFmpeg, downloadAudio]
    );

    return {
        files,
        setFiles,
        compressing,
        progressMap,
        handleRemoveFile,
        handleCompress,
    };
}