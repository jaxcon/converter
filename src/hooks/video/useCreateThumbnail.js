import { useState, useRef, useCallback } from "react";
import { fetchFile } from "@ffmpeg/util";
import { useFFmpeg } from "../common/useFFmpeg";

export function useCreateThumbnail() {
    const [videos, setVideos] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const videoRef = useRef(null);

    const { isReady, load, runCommand } = useFFmpeg();

    const videoObj = videos[0];
    const videoFile = videoObj?.file;
    const videoURL = videoObj?.preview || null;

    const setFiles = useCallback((files) => {
        setVideos(files);
        setThumbnail(null);
    }, []);

    const generateThumbnail = useCallback(() => {
        const videoEl = videoRef.current;
        if (!videoEl) return;

        const canvas = document.createElement("canvas");
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL("image/png");
        setThumbnail(imageUrl);
    }, []);

    const uploadThumbnailFromFile = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setThumbnail(url);
    }, []);

    const downloadImage = useCallback(() => {
        if (!thumbnail) return;
        const a = document.createElement("a");
        a.href = thumbnail;
        a.download = "thumbnail.png";
        a.click();
    }, [thumbnail]);

    const downloadVideoWithThumbnail = useCallback(async () => {
        if (!videoFile || !thumbnail) return;

        setIsProcessing(true);
        try {
            if (!isReady) await load();

            const res = await fetch(thumbnail);
            const thumbBlob = await res.blob();
            const thumbData = await fetchFile(thumbBlob);
            const videoData = await fetchFile(videoFile);

            const results = await runCommand(
                [
                    "-i", "input.mp4",
                    "-i", "thumb.png",
                    "-map", "0",
                    "-map", "1",
                    "-c", "copy",
                    "-disposition:v:1", "attached_pic",
                    "output.mp4"
                ],
                {
                    "input.mp4": videoData,
                    "thumb.png": thumbData
                },
                ["output.mp4"]
            );

            const out = results["output.mp4"];
            const url = URL.createObjectURL(new Blob([out], { type: "video/mp4" }));
            const a = document.createElement("a");
            a.href = url;
            a.download = "video_with_thumbnail.mp4";
            a.click();
        } catch (error) {
            console.error("Error processing video:", error);
        } finally {
            setIsProcessing(false);
        }
    }, [videoFile, thumbnail, isReady, load, runCommand]);

    return {
        videos,
        setFiles,
        videoURL,
        videoRef,
        thumbnail,
        generateThumbnail,
        uploadThumbnailFromFile,
        downloadImage,
        downloadVideoWithThumbnail,
        isProcessing
    };
}