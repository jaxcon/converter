import { useState, useMemo, useCallback, useReducer, useRef, useEffect } from "react";
import { getUniqueName } from "../../utils/uniqueIdGenerator";
import { processInParallel, MAX_PARALLEL } from "../../utils/parallelProcessor";
import { progressReducer, setProgress, removeProgress, resetAllProgress } from "../../utils/progressReducer";
import { SUPPORTED_FORMATS, FORMAT_CONFIG } from "./convert.config";

export function useImageConvert() {
    const [files, setFiles] = useState([]);
    const [converting, setConverting] = useState(false);
    const [progressMap, dispatchProgress] = useReducer(progressReducer, new Map());
    const objectURLs = useRef(new Map());

    useEffect(() => {
        return () => {
            for (const url of objectURLs.current.values()) {
                URL.revokeObjectURL(url);
            }
            objectURLs.current.clear();
        };
    }, []);

    const completedFiles = useMemo(
        () => Array.from(progressMap.values()).filter(p => p === 100).length,
        [progressMap]
    );

    const globalProgress = useMemo(() => {
        if (files.length === 0) return 0;
        return Math.min(100, Math.round((completedFiles / files.length) * 100));
    }, [files.length, completedFiles]);

    const handleRemoveFile = useCallback((fileId) => {
        setFiles(prev => {
            const newFiles = prev.filter(f => f.id !== fileId);
            if (objectURLs.current.has(fileId)) {
                URL.revokeObjectURL(objectURLs.current.get(fileId));
                objectURLs.current.delete(fileId);
            }
            dispatchProgress(removeProgress(fileId));
            return newFiles;
        });
    }, []);

    const convertImage = useCallback((fileObj, targetFormat, onProgress) => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const img = new Image();

            img.onload = () => {
                try {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);

                    const { mimeType, quality } = FORMAT_CONFIG[targetFormat] || FORMAT_CONFIG.DEFAULT;
                    if (onProgress) onProgress(0.3);

                    canvas.toBlob((blob) => {
                        if (!blob) return reject(new Error("Не удалось создать Blob"));
                        if (onProgress) onProgress(1);
                        resolve(blob);
                    }, mimeType, quality);
                } catch (e) {
                    reject(e);
                }
            };

            img.onerror = () => reject(new Error("Ошибка загрузки изображения"));

            const reader = new FileReader();
            reader.onload = () => (img.src = reader.result);
            reader.onerror = () => reject(new Error("Ошибка чтения файла"));
            reader.readAsDataURL(fileObj.file);
        });
    }, []);

    const downloadImage = useCallback((blob, filename) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }, []);

    const convertFiles = useCallback(async (targetFormat, isBatch = false) => {
        if (!files.length) return;

        setConverting(true);
        dispatchProgress(resetAllProgress());

        let zip;
        if (isBatch) {
            const { default: JSZip } = await import("jszip");
            zip = new JSZip();
        }

        try {
            await processInParallel(
                files,
                async (fileObj) => {
                    dispatchProgress(setProgress(fileObj.id, 0));
                    try {
                        const convertedBlob = await convertImage(fileObj, targetFormat, (p) => {
                            dispatchProgress(setProgress(fileObj.id, Math.round(p * 100)));
                        });

                        dispatchProgress(setProgress(fileObj.id, 100));

                        const newFilename = getUniqueName(fileObj.file.name, "converted")
                            .replace(/\.[^/.]+$/, "") + `.${targetFormat.toLowerCase()}`;

                        if (isBatch && zip) {
                            zip.file(newFilename, convertedBlob);
                        } else {
                            downloadImage(convertedBlob, newFilename);
                        }

                        return true;
                    } catch (err) {
                        console.error(`Ошибка конвертации файла ${fileObj.file.name}:`, err);
                        dispatchProgress(setProgress(fileObj.id, -1));
                        return false;
                    }
                },
                MAX_PARALLEL
            );

            if (isBatch && zip && Object.keys(zip.files).length > 0) {
                const { saveAs } = await import("file-saver");
                const content = await zip.generateAsync({ type: "blob" });
                saveAs(content, `converted_images_${targetFormat.toLowerCase()}.zip`);
            }
        } catch (err) {
            console.error("Ошибка при конвертации:", err);
        } finally {
            setTimeout(() => setConverting(false), 500);
        }
    }, [files, convertImage, downloadImage]);

    const handleConvert = useCallback((format) => convertFiles(format, false), [convertFiles]);
    const handleBatchConvert = useCallback((format) => convertFiles(format, true), [convertFiles]);

    return {
        files,
        setFiles,
        converting,
        progressMap,
        completedFiles,
        globalProgress,
        handleRemoveFile,
        handleConvert,
        handleBatchConvert,
        SUPPORTED_FORMATS
    };
}
