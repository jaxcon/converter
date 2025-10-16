import { useState, useMemo, useReducer, useCallback } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { saveAs } from "file-saver";

import { processInParallel, MAX_PARALLEL } from "../../utils/parallelProcessor";
import { progressReducer, setProgress, removeProgress, resetAllProgress } from "../../utils/progressReducer";
import { getUniqueName } from "../../utils/uniqueIdGenerator";

export function useImageCompress() {
    const [files, setFiles] = useState([]);
    const [compression, setCompression] = useState(50);
    const [loading, setLoading] = useState(false);
    const [compressionProgress, dispatchProgress] = useReducer(progressReducer, new Map());

    const completedFiles = useMemo(() => {
        return [...compressionProgress.values()].filter(p => p === 100).length;
    }, [compressionProgress]);

    const globalProgress = useMemo(() => {
        if (files.length === 0) return 0;
        return Math.min(100, Math.round((completedFiles / files.length) * 100));
    }, [files.length, completedFiles]);

    const handleRemoveFile = useCallback((fileId) => {
        setFiles(prev => {
            const newFiles = prev.filter(f => f.id !== fileId);
            dispatchProgress(removeProgress(fileId));
            return newFiles;
        });
    }, []);

    const getCompressionOptions = useCallback((quality) => ({
        initialQuality: 1 - (quality / 100) * 0.9,
        useWebWorker: true
    }), []);

    const compressFile = useCallback(async (fileObj, options) => {
        try {
            dispatchProgress(setProgress(fileObj.id, 0));

            const ext = fileObj.file.name.split(".").pop().toLowerCase();
            
            const preferredType = ext === "bmp" ? "image/jpeg" : undefined;

            const compressedFile = await imageCompression(fileObj.file, {
                ...options,
                fileType: preferredType,
                onProgress: (progress) => {
                    const percent = Math.round(progress * 100);
                    dispatchProgress(setProgress(fileObj.id, percent));
                }
            });

            dispatchProgress(setProgress(fileObj.id, 100));
            return compressedFile;

        } catch (err) {
            console.error("Ошибка при сжатии файла:", fileObj.file.name, err);
            dispatchProgress(setProgress(fileObj.id, -1));
            return null;
        }
    }, []);

    const handleCompressSeparate = useCallback(async () => {
        if (!files.length) return;
        setLoading(true);
        dispatchProgress(resetAllProgress());

        await processInParallel(
            files,
            async (fileObj) => {
                const compressionOptions = getCompressionOptions(compression);

                const compressedFile = await compressFile(fileObj, compressionOptions);
                if (compressedFile) {
                    saveAs(compressedFile, getUniqueName(fileObj.file.name, 'compressed'));
                }
                return compressedFile;
            },
            MAX_PARALLEL
        );

        setLoading(false);
    }, [files, compression, compressFile, getCompressionOptions]);

    const handleCompressZip = useCallback(async () => {
        if (!files.length) return;
        setLoading(true);

        dispatchProgress(resetAllProgress());

        const zip = new JSZip();

        await processInParallel(
            files,
            async (fileObj) => {
                const compressionOptions = getCompressionOptions(compression);
                const compressedFile = await compressFile(fileObj, compressionOptions);
                if (compressedFile) {
                    const arrayBuffer = await compressedFile.arrayBuffer();
                    zip.file(getUniqueName(fileObj.file.name), arrayBuffer);
                    return true;
                }
                return false;
            },
            MAX_PARALLEL
        );

        const fileCount = Object.keys(zip.files).length;
        if (fileCount > 0) {
            try {
                const content = await zip.generateAsync({
                    type: "blob",
                    compression: "DEFLATE",
                    compressionOptions: { level: 6 }
                });
                saveAs(content, "compressed_images.zip");
            } catch (err) {
                console.error("Ошибка при создании ZIP:", err);
            }
        }

        setLoading(false);
    }, [files, compression, compressFile, getCompressionOptions]);

    const isUploadDisabled = loading || [...compressionProgress.values()].some(p => p > 0 && p < 100);

    return {
        files,
        setFiles,
        compression,
        setCompression,
        loading,
        compressionProgress,
        completedFiles,
        globalProgress,
        isUploadDisabled,
        handleRemoveFile,
        handleCompressSeparate,
        handleCompressZip
    };
}