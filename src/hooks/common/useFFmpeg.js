import { useState, useRef, useCallback } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";

export function useFFmpeg() {
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const ffmpegRef = useRef(null);

    const load = useCallback(async () => {
        if (isReady || isLoading) return;
        setIsLoading(true);

        try {
            const base = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
            const ffmpeg = new FFmpeg();

            ffmpeg.on("progress", ({ progress }) =>
                setProgress(Math.round(progress * 100))
            );

            ffmpeg.on("log", ({ message }) => {
                console.debug("[FFmpeg]", message);
            });

            await ffmpeg.load({
                coreURL: await toBlobURL(`${base}/ffmpeg-core.js`, "text/javascript"),
                wasmURL: await toBlobURL(`${base}/ffmpeg-core.wasm`, "application/wasm"),
            });

            ffmpegRef.current = ffmpeg;
            setIsReady(true);
        } catch (err) {
            console.error("FFmpeg load error:", err);
        } finally {
            setIsLoading(false);
        }
    }, [isReady, isLoading]);

    const runCommand = useCallback(
        async (cmd, files = {}, outputs = []) => {
            if (!ffmpegRef.current) throw new Error("FFmpeg not loaded");

            for (const [name, file] of Object.entries(files)) {
                const data = file instanceof File ? await fetchFile(file) : file;
                await ffmpegRef.current.writeFile(name, data);
            }

            await ffmpegRef.current.exec(cmd);

            const results = {};
            for (const out of outputs) {
                const data = await ffmpegRef.current.readFile(out);
                results[out] = data;
                try {
                    await ffmpegRef.current.deleteFile(out);
                } catch (error) {
                    console.error('FFmpeg error:', error);
                }
            }

            for (const name of Object.keys(files)) {
                try {
                    await ffmpegRef.current.deleteFile(name);
                } catch (error) {
                    console.error('FFmpeg error:', error);
                }
            }

            return results;
        },
        []
    );

    return { ffmpeg: ffmpegRef.current, isReady, isLoading, progress, load, runCommand };
}