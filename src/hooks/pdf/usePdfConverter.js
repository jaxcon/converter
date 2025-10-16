import { useReducer, useState, useCallback, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/webpack";
import { processInParallel, MAX_PARALLEL } from "../../utils/parallelProcessor";
import {
    progressReducer,
    setProgress,
    removeProgress,
    resetAllProgress
} from "../../utils/progressReducer";
import { getUniqueName } from "../../utils/uniqueIdGenerator";

export function usePdfConverter() {
    const [files, setFiles] = useState([]);
    const [converting, setConverting] = useState(false);
    const [progressMap, dispatchProgress] = useReducer(progressReducer, new Map());
    const [objectUrls, setObjectUrls] = useState([]);

    useEffect(() => {
        const initPdfWorker = async () => {
            const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
            pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
        };
        initPdfWorker();
    }, []);


    const dataURLToBlob = useCallback((dataURL) => {
        const parts = dataURL.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const uInt8Array = new Uint8Array(raw.length);

        for (let i = 0; i < raw.length; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }, []);

    const downloadBlob = useCallback((blob, filename) => {
        const url = URL.createObjectURL(blob);
        setObjectUrls(prev => [...prev, url]);

        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setTimeout(() => {
            URL.revokeObjectURL(url);
            setObjectUrls(prev => prev.filter(u => u !== url));
        }, 100);
    }, []);

    const getConvertedFileName = useCallback((originalName, targetFormat, pageIndex = null) => {
        const baseName = originalName.replace(/\.[^/.]+$/, "");
        const uniqueName = getUniqueName(baseName, 'converted');

        if (pageIndex !== null) {
            return `${uniqueName}_page_${pageIndex + 1}.${targetFormat.toLowerCase()}`;
        }
        return `${uniqueName}.${targetFormat.toLowerCase()}`;
    }, []);

    useEffect(() => {
        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [objectUrls]);

    const convertPdfToImage = useCallback(async (pdfFile, targetFormat, onProgress) => {
        try {
            onProgress?.(0.1);

            const arrayBuffer = await pdfFile.file.arrayBuffer();
            onProgress?.(0.3);

            const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdfDoc.numPages;
            onProgress?.(0.4);

            const images = [];

            for (let i = 1; i <= numPages; i++) {
                onProgress?.(0.4 + (i / numPages) * 0.5);

                const page = await pdfDoc.getPage(i);
                const viewport = page.getViewport({ scale: 1.5 });

                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                await page.render({
                    canvasContext: ctx,
                    viewport
                }).promise;

                const mimeType = targetFormat === "JPG" ? "image/jpeg" : "image/png";
                const quality = targetFormat === "JPG" ? 0.92 : 1.0;

                const dataUrl = canvas.toDataURL(mimeType, quality);
                images.push(dataUrl);
            }

            onProgress?.(0.95);
            return images;

        } catch (error) {
            throw error;
        }
    }, []);

    const convertPdfToText = useCallback(async (pdfFile, onProgress) => {
        onProgress?.(0.2);

        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdfDoc.numPages;
        onProgress?.(0.4);

        let fullText = '';

        for (let i = 1; i <= numPages; i++) {
            onProgress?.(0.4 + (i / numPages) * 0.5);

            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            fullText += pageText + '\n\n';
        }

        onProgress?.(0.95);
        return fullText;
    }, []);

    const convertPdfToDocx = useCallback(async (pdfFile, onProgress) => {
        const text = await convertPdfToText(pdfFile, onProgress);

        const docxContent = `<?xml version="1.0" encoding="UTF-8"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
    <w:body>${text.substring(0, 1000)}</w:body>
</w:document>`;

        return new Blob([docxContent], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        });
    }, [convertPdfToText]);

    const convertPdfToHtml = useCallback(async (pdfFile, onProgress) => {
        onProgress?.(0.2);

        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdfDoc.numPages;
        onProgress?.(0.4);

        let htmlContent = '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Converted PDF</title></head><body>';

        for (let i = 1; i <= numPages; i++) {
            onProgress?.(0.4 + (i / numPages) * 0.5);

            const page = await pdfDoc.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');

            htmlContent += `<div class="page"><pre>${pageText}</pre></div>`;
        }

        htmlContent += '</body></html>';
        onProgress?.(0.95);

        return new Blob([htmlContent], { type: 'text/html' });
    }, []);

    const convertFile = useCallback(async (fileObj, targetFormat, onProgress) => {
        switch (targetFormat) {
            case "JPG":
            case "PNG": {
                return await convertPdfToImage(fileObj, targetFormat, onProgress);
            }
            case "TXT": {
                const text = await convertPdfToText(fileObj, onProgress);
                return new Blob([text], { type: "text/plain" });
            }
            case "DOCX": {
                return await convertPdfToDocx(fileObj, onProgress);
            }
            case "HTML": {
                return await convertPdfToHtml(fileObj, onProgress);
            }
            case "XLSX": {
                const text = await convertPdfToText(fileObj, onProgress);
                return new Blob([text], { type: "text/csv" });
            }
            default:
                throw new Error("Unsupported format");
        }
    }, [convertPdfToImage, convertPdfToText, convertPdfToDocx, convertPdfToHtml]);

    const handleSingleConvert = useCallback(async (targetFormat) => {
        if (!files.length || converting) return;
        setConverting(true);
        dispatchProgress(resetAllProgress());

        try {
            await processInParallel(
                files,
                async (fileObj) => {
                    dispatchProgress(setProgress(fileObj.id, 0));

                    try {
                        const result = await convertFile(fileObj, targetFormat, (p) => {
                            dispatchProgress(setProgress(fileObj.id, Math.round(p * 100)));
                        });

                        if (["JPG", "PNG"].includes(targetFormat)) {
                            const images = result;

                            if (images.length === 1) {
                                downloadBlob(
                                    dataURLToBlob(images[0]),
                                    getConvertedFileName(fileObj.file.name, targetFormat)
                                );
                            } else {
                                images.forEach((imgData, index) => {
                                    const filename = getConvertedFileName(fileObj.file.name, targetFormat, index);
                                    downloadBlob(dataURLToBlob(imgData), filename);

                                    if (index < images.length - 1) {
                                        setTimeout(() => { }, 80);
                                    }
                                });
                            }
                        } else {
                            downloadBlob(
                                result,
                                getConvertedFileName(fileObj.file.name, targetFormat)
                            );
                        }

                        dispatchProgress(setProgress(fileObj.id, 100));
                        await new Promise(resolve => setTimeout(resolve, 300));
                        return true;
                    } catch (error) {
                        console.error(`Conversion error for ${fileObj.file.name}:`, error);
                        dispatchProgress(setProgress(fileObj.id, -1));
                        return false;
                    }
                },
                2
            );
        } finally {
            setConverting(false);
        }
    }, [files, converting, convertFile, downloadBlob, dataURLToBlob, getConvertedFileName]);

    const handleZipConvert = useCallback(async (targetFormat) => {
        if (!files.length || converting) return;
        setConverting(true);
        dispatchProgress(resetAllProgress());

        try {
            const JSZip = (await import("jszip")).default;
            const { saveAs } = await import("file-saver");
            const zip = new JSZip();

            await processInParallel(
                files,
                async (fileObj) => {
                    dispatchProgress(setProgress(fileObj.id, 0));

                    try {
                        const result = await convertFile(fileObj, targetFormat, (p) => {
                            dispatchProgress(setProgress(fileObj.id, Math.round(p * 100)));
                        });

                        if (["JPG", "PNG"].includes(targetFormat)) {
                            const images = result;
                            if (images.length > 1) {
                                images.forEach((imgData, index) => {
                                    const imgBlob = dataURLToBlob(imgData);
                                    zip.file(
                                        getConvertedFileName(fileObj.file.name, targetFormat, index),
                                        imgBlob
                                    );
                                });
                            } else {
                                const blob = dataURLToBlob(images[0]);
                                zip.file(
                                    getConvertedFileName(fileObj.file.name, targetFormat),
                                    blob
                                );
                            }
                        } else {
                            zip.file(
                                getConvertedFileName(fileObj.file.name, targetFormat),
                                result
                            );
                        }

                        dispatchProgress(setProgress(fileObj.id, 100));
                        return true;
                    } catch (error) {
                        console.error(`Batch conversion error for ${fileObj.file.name}:`, error);
                        dispatchProgress(setProgress(fileObj.id, -1));
                        return false;
                    }
                },
                MAX_PARALLEL
            );

            if (Object.keys(zip.files).length > 0) {
                const zipContent = await zip.generateAsync({
                    type: "blob",
                    compression: "DEFLATE",
                    compressionOptions: { level: 6 }
                });

                const zipFileName = getUniqueName(`converted_pdfs_${targetFormat.toLowerCase()}`, 'archive') + '.zip';
                saveAs(zipContent, zipFileName);
            }
        } catch (error) {
            console.error("Error creating ZIP archive:", error);
        } finally {
            setConverting(false);
        }
    }, [files, converting, convertFile, dataURLToBlob, getConvertedFileName]);

    const handleRemoveFile = useCallback((fileId) => {
        setFiles(prev => {
            dispatchProgress(removeProgress(fileId));
            return prev.filter(f => f.id !== fileId);
        });
    }, []);

    return {
        files,
        setFiles,
        converting,
        progressMap,
        handleSingleConvert,
        handleZipConvert,
        handleRemoveFile
    };
}