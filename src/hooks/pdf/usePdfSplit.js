import { useState, useEffect, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import * as pdfjsLib from "pdfjs-dist";
import { getUniqueName, generateUniqueFileName } from "../../utils/uniqueIdGenerator";

export const usePdfSplit = () => {
    const [files, setFiles] = useState([]);
    const [splitting, setSplitting] = useState(false);
    const [splitProgress, setSplitProgress] = useState({});
    const [outputFormat, setOutputFormat] = useState("pdf");
    const [selectedPages, setSelectedPages] = useState({});

    useEffect(() => {
        const setupPDFWorker = async () => {
            try {
                const workerModule = await import("pdfjs-dist/build/pdf.worker.entry");
                pdfjsLib.GlobalWorkerOptions.workerSrc = workerModule.default;
            } catch {
                console.warn("Local PDF worker not found, using CDN fallback");
                pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
            }
        };
        setupPDFWorker();
    }, []);

    const getPageCount = useCallback(async (file) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            return pdf.numPages;
        } catch (error) {
            console.error("Reading error:", error);
            return 0;
        }
    }, []);

    useEffect(() => {
        if (files.length === 0) return;

        const updateFilesWithPageCount = async () => {
            const updatedFiles = await Promise.all(
                files.map(async (fileObj) => {
                    if (fileObj.pages > 0) return fileObj;

                    const pages = await getPageCount(fileObj.file);
                    const nameWithoutExt = fileObj.file.name.replace(/\.[^/.]+$/, "");

                    setSelectedPages((prev) => ({
                        ...prev,
                        [fileObj.id]: Array.from({ length: pages }, (_, i) => i + 1),
                    }));

                    return { ...fileObj, pages, nameWithoutExt };
                })
            );

            setFiles(updatedFiles);
        };

        updateFilesWithPageCount();
    }, [files.length, getPageCount]);

    const handleRemoveFile = useCallback((fileId) => {
        setFiles((prev) => prev.filter((file) => file.id !== fileId));
        setSelectedPages((prev) => {
            const newSelected = { ...prev };
            delete newSelected[fileId];
            return newSelected;
        });
        setSplitProgress((prev) => {
            const newProgress = { ...prev };
            delete newProgress[fileId];
            return newProgress;
        });
    }, []);

    const updateProgress = useCallback((fileId, progress) => {
        setSplitProgress((prev) => ({
            ...prev,
            [fileId]: progress,
        }));
    }, []);

    const handlePageSelection = useCallback((fileId, pageNumbers) => {
        setSelectedPages((prev) => ({
            ...prev,
            [fileId]: pageNumbers,
        }));
    }, []);

    const splitPDF = useCallback(async () => {
        if (!files.length) return;

        const hasSelectedPages = files.some((fileObj) => {
            const pages = selectedPages[fileObj.id] || [];
            return pages.length > 0;
        });
        if (!hasSelectedPages) return;

        setSplitting(true);

        const initialProgress = {};
        files.forEach((file) => {
            initialProgress[file.id] = 0;
        });
        setSplitProgress(initialProgress);

        const zip = new JSZip();

        for (let i = 0; i < files.length; i++) {
            const fileObj = files[i];
            const pagesToExtract = selectedPages[fileObj.id] || [];
            if (pagesToExtract.length === 0) continue;

            updateProgress(fileObj.id, 25);

            try {
                if (outputFormat === "pdf") {
                    const { PDFDocument } = await import("pdf-lib");
                    const arrayBuffer = await fileObj.file.arrayBuffer();
                    const originalPdf = await PDFDocument.load(arrayBuffer);

                    for (let j = 0; j < pagesToExtract.length; j++) {
                        const pageNumber = pagesToExtract[j] - 1;
                        const newPdf = await PDFDocument.create();
                        const [copiedPage] = await newPdf.copyPages(originalPdf, [pageNumber]);
                        newPdf.addPage(copiedPage);

                        const pdfBytes = await newPdf.save();
                        const fileName = generateUniqueFileName(
                            `${fileObj.nameWithoutExt}_page_${pageNumber + 1}.pdf`,
                            "split"
                        );
                        zip.file(fileName, pdfBytes);
                    }
                } else {
                    const arrayBuffer = await fileObj.file.arrayBuffer();
                    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;

                    for (let j = 0; j < pagesToExtract.length; j++) {
                        const pageNumber = pagesToExtract[j];
                        const page = await pdf.getPage(pageNumber);
                        const viewport = page.getViewport({ scale: 2.0 });

                        const canvas = document.createElement("canvas");
                        const context = canvas.getContext("2d");
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        await page.render({ canvasContext: context, viewport }).promise;

                        const blob = await new Promise((resolve) =>
                            canvas.toBlob(resolve, `image/${outputFormat}`, 0.95)
                        );

                        const fileName = generateUniqueFileName(
                            `${fileObj.nameWithoutExt}_page_${pageNumber + 1}.${outputFormat}`,
                            "split"
                        );
                        zip.file(fileName, blob);
                    }
                }

                updateProgress(fileObj.id, 100);
            } catch (error) {
                console.error(`Splitting error ${fileObj.file.name}:`, error);
                updateProgress(fileObj.id, -1);
            }

            if (i < files.length - 1) {
                await new Promise((resolve) => setTimeout(resolve, 100));
            }
        }

        try {
            const content = await zip.generateAsync({
                type: "blob",
                compression: "DEFLATE",
                compressionOptions: { level: 6 },
            });

            const zipExtension = outputFormat === "pdf" ? "zip" : `${outputFormat}.zip`;
            const zipFileName =
                getUniqueName("split_pdf_pages", "archive") + `.${zipExtension}`;
            saveAs(content, zipFileName);
        } catch (err) {
            console.error("Ошибка при создании ZIP:", err);
        }

        setSplitting(false);
        setTimeout(() => setSplitProgress({}), 800);
    }, [files, outputFormat, selectedPages, updateProgress]);

    const isProcessing = Object.values(splitProgress).some(
        (progress) => progress > 0 && progress < 100
    );

    const canSplit = useCallback(() => {
        return files.length > 0 && !splitting && !isProcessing;
    }, [files.length, splitting, isProcessing]);

    return {
        files,
        setFiles,
        splitting,
        splitProgress,
        outputFormat,
        setOutputFormat,
        selectedPages,
        handleRemoveFile,
        handlePageSelection,
        splitPDF,
        canSplit,
    };
};