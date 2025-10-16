import { useState, useEffect, useMemo, useReducer, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { arrayMove } from "@dnd-kit/sortable";
import { saveAs } from "file-saver";
import { progressReducer, setProgress, removeProgress, resetAllProgress } from "../../utils/progressReducer";
import { processInParallel, MAX_PARALLEL } from "../../utils/parallelProcessor";
import { getUniqueName } from "../../utils/uniqueIdGenerator";

export function usePdfMerge() {
    const [files, setFiles] = useState([]);
    const [merging, setMerging] = useState(false);
    const [progressMap, dispatchProgress] = useReducer(progressReducer, new Map());

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

    useEffect(() => {
        const updateFilesWithPageCount = async () => {
            const updatedFiles = await Promise.all(
                files.map(async (fileObj) => {
                    if (fileObj.pages > 0) return fileObj;
                    const pages = await getPageCount(fileObj.file);
                    return { ...fileObj, pages };
                })
            );
            setFiles(updatedFiles);
        };

        if (files.length > 0) {
            updateFilesWithPageCount();
        }
    }, [files.length]);

    const getPageCount = async (file) => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
            return pdf.numPages;
        } catch (error) {
            console.error("Ошибка чтения PDF:", error);
            return 0;
        }
    };

    const completedFiles = useMemo(() => {
        return Array.from(progressMap.values()).filter((progress) => progress === 100).length;
    }, [progressMap]);

    const globalProgress = useMemo(() => {
        if (files.length === 0) return 0;
        return Math.min(100, Math.round((completedFiles / files.length) * 100));
    }, [files.length, completedFiles]);

    const canMerge = useMemo(() => {
        return (
            files.length >= 2 &&
            !merging &&
            Array.from(progressMap.values()).every(
                (progress) => progress === 0 || progress === 100 || progress === -1
            )
        );
    }, [files.length, merging, progressMap]);

    const getTotalPages = useMemo(() => {
        return files.reduce((total, file) => total + (file.pages || 0), 0);
    }, [files]);

    const handleDragEnd = useCallback(
        (event) => {
            const { active, over } = event;
            if (!over || active.id === over.id) return;

            const oldIndex = files.findIndex((f) => f.id === active.id);
            const newIndex = files.findIndex((f) => f.id === over.id);

            setFiles(arrayMove(files, oldIndex, newIndex));
        },
        [files]
    );

    const handleRemoveFile = useCallback((fileId) => {
        setFiles((prev) => {
            const fileToRemove = prev.find((file) => file.id === fileId);
            if (fileToRemove) {
                URL.revokeObjectURL(fileToRemove.preview);
                dispatchProgress(removeProgress(fileId));
            }
            return prev.filter((file) => file.id !== fileId);
        });
    }, []);

    const mergePDFs = useCallback(async () => {
        if (files.length < 2) return;

        setMerging(true);
        dispatchProgress(resetAllProgress());

        try {
            const { PDFDocument } = await import("pdf-lib");
            const mergedPdf = await PDFDocument.create();

            await processInParallel(
                files,
                async (fileObj) => {
                    dispatchProgress(setProgress(fileObj.id, 0));

                    try {
                        const arrayBuffer = await fileObj.file.arrayBuffer();
                        const pdfDoc = await PDFDocument.load(arrayBuffer);

                        const pages = pdfDoc.getPages();
                        const copiedPages = await mergedPdf.copyPages(
                            pdfDoc,
                            pages.map((_, index) => index)
                        );

                        copiedPages.forEach((page) => {
                            mergedPdf.addPage(page);
                        });

                        dispatchProgress(setProgress(fileObj.id, 100));
                        return true;
                    } catch (error) {
                        console.error(`Ошибка обработки файла ${fileObj.file.name}:`, error);
                        dispatchProgress(setProgress(fileObj.id, -1));
                        return false;
                    }
                },
                MAX_PARALLEL
            );

            const mergedPdfBytes = await mergedPdf.save();
            const mergedBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });
            const mergedFilename = getUniqueName("merged_document", "merged") + ".pdf";

            saveAs(mergedBlob, mergedFilename);
        } catch (error) {
            console.error("Ошибка при слиянии PDF:", error);
        } finally {
            setMerging(false);
        }
    }, [files]);

    return {
        files,
        setFiles,
        merging,
        progressMap,
        globalProgress,
        completedFiles,
        canMerge,
        getTotalPages,
        handleDragEnd,
        handleRemoveFile,
        mergePDFs,
    };
}