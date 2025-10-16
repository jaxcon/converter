import { useState, useRef, useEffect, useCallback } from "react";
import { getUniqueName } from "../../utils/uniqueIdGenerator";

export function useImageCrop() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [file, setFile] = useState(null);
    const [image, setImage] = useState(null);
    const [isMobile, setIsMobile] = useState(false);

    const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [resizeDirection, setResizeDirection] = useState("");

    const containerRef = useRef(null);
    const cropAreaRef = useRef(null);
    const canvasRef = useRef(null);
    const rafIdRef = useRef(null);
    const lastEventRef = useRef(null);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const handler = (e) => setIsMobile(e.matches);
        handler(mq);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    useEffect(() => {
        if (uploadedFiles.length > 0) {
            const fileObj = uploadedFiles[0];
            setFile(fileObj);

            const img = new Image();
            img.onload = () => {
                setImage(img);
            };
            img.src = fileObj.preview;
        }

        return () => {
            uploadedFiles.forEach(fileObj => {
                if (fileObj.preview) {
                    URL.revokeObjectURL(fileObj.preview);
                }
            });
        };
    }, [uploadedFiles]);

    const getEventCoordinates = (e) =>
        e.touches ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
            : { clientX: e.clientX, clientY: e.clientY };

    const ensureImage = (fn) => (...args) => {
        if (!image) return null;
        return fn(...args);
    };

    const cropImage = useCallback(
        ensureImage(() => {
            if (!canvasRef.current) return null;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            const validCrop = {
                x: Math.max(0, Math.min(crop.x, image.width - 1)),
                y: Math.max(0, Math.min(crop.y, image.height - 1)),
                width: Math.max(1, Math.min(crop.width, image.width - crop.x)),
                height: Math.max(1, Math.min(crop.height, image.height - crop.y)),
            };

            canvas.width = validCrop.width;
            canvas.height = validCrop.height;

            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";

            ctx.drawImage(
                image,
                validCrop.x,
                validCrop.y,
                validCrop.width,
                validCrop.height,
                0,
                0,
                validCrop.width,
                validCrop.height
            );

            return canvas.toDataURL("image/png", 1.0);
        }),
        [image, crop]
    );

    const downloadCroppedImage = useCallback(
        ensureImage((fileName = null) => {
            setIsProcessing(true);
            try {
                const dataURL = cropImage();
                if (!dataURL) return false;

                const finalFileName = fileName || getUniqueName("image", "cropped");
                const link = document.createElement("a");
                link.href = dataURL;
                link.download = `${finalFileName}.png`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                return true;
            } catch (err) {
                console.error("Ошибка при обрезке:", err);
                return false;
            } finally {
                setIsProcessing(false);
            }
        }),
        [cropImage]
    );

    const getCroppedImageBlob = useCallback(
        ensureImage(async () => {
            const dataURL = cropImage();
            if (!dataURL) return null;
            const response = await fetch(dataURL);
            return await response.blob();
        }),
        [cropImage]
    );

    const handleStart = useCallback((e) => {
        if (isProcessing || !image || !cropAreaRef.current) return;
        if (e.type === "touchstart") e.preventDefault();

        const { clientX, clientY } = getEventCoordinates(e);
        const cropRect = cropAreaRef.current.getBoundingClientRect();
        const x = clientX - cropRect.left;
        const y = clientY - cropRect.top;

        const handleSize = isMobile ? 24 : 16;
        const corners = {
            "top-left": x < handleSize && y < handleSize,
            "top-right": x > cropRect.width - handleSize && y < handleSize,
            "bottom-left": x < handleSize && y > cropRect.height - handleSize,
            "bottom-right": x > cropRect.width - handleSize && y > cropRect.height - handleSize,
        };

        const corner = Object.entries(corners).find(([_, v]) => v)?.[0];
        if (corner) {
            setIsResizing(true);
            setResizeDirection(corner);
            setDragStart({ x: clientX, y: clientY });
        } else if (x >= 0 && x <= cropRect.width && y >= 0 && y <= cropRect.height) {
            setIsDragging(true);
            setDragStart({ x: clientX - cropRect.left, y: clientY - cropRect.top });
        }
    }, [isProcessing, image, isMobile]);

    const resizeStrategies = {
        "top-left": (prev, dx, dy) => ({
            width: prev.width - dx, height: prev.height - dy,
            x: prev.x + dx, y: prev.y + dy
        }),
        "top-right": (prev, dx, dy) => ({
            width: prev.width + dx, height: prev.height - dy,
            y: prev.y + dy
        }),
        "bottom-left": (prev, dx, dy) => ({
            width: prev.width - dx, height: prev.height + dy,
            x: prev.x + dx
        }),
        "bottom-right": (prev, dx, dy) => ({
            width: prev.width + dx, height: prev.height + dy
        })
    };

    const handleMove = useCallback((e) => {
        if (isProcessing || (!isDragging && !isResizing) || !image || !cropAreaRef.current) return;
        if (e.type === "touchmove") e.preventDefault();

        lastEventRef.current = e;
        if (rafIdRef.current !== null) return;

        rafIdRef.current = requestAnimationFrame(() => {
            const evt = lastEventRef.current;
            if (!evt) { rafIdRef.current = null; return; }

            const { clientX, clientY } = getEventCoordinates(evt);
            const container = containerRef.current;
            const img = container.querySelector("img");
            const imgRect = img.getBoundingClientRect();

            const scaleX = image.width / imgRect.width;
            const scaleY = image.height / imgRect.height;

            if (isDragging) {
                const cropRect = cropAreaRef.current.getBoundingClientRect();
                const deltaX = (clientX - cropRect.left - dragStart.x) * scaleX;
                const deltaY = (clientY - cropRect.top - dragStart.y) * scaleY;

                setCrop(prev => ({
                    ...prev,
                    x: Math.max(0, Math.min(prev.x + deltaX, image.width - prev.width)),
                    y: Math.max(0, Math.min(prev.y + deltaY, image.height - prev.height)),
                }));
            } else if (isResizing) {
                const deltaX = (clientX - dragStart.x) * scaleX;
                const deltaY = (clientY - dragStart.y) * scaleY;

                setCrop(prev => {
                    let nc = { ...prev, ...resizeStrategies[resizeDirection](prev, deltaX, deltaY) };
                    setDragStart({ x: clientX, y: clientY });

                    nc.width = Math.max(20, Math.min(nc.width, image.width - nc.x));
                    nc.height = Math.max(20, Math.min(nc.height, image.height - nc.y));
                    nc.x = Math.max(0, Math.min(nc.x, image.width - nc.width));
                    nc.y = Math.max(0, Math.min(nc.y, image.height - nc.height));
                    return nc;
                });
            }

            rafIdRef.current = null;
        });
    }, [isProcessing, isDragging, isResizing, image, dragStart, resizeDirection]);

    useEffect(() => {
        const stop = () => { setIsDragging(false); setIsResizing(false); };
        document.addEventListener("mouseup", stop);
        document.addEventListener("touchend", stop);
        document.addEventListener("mouseleave", stop);
        document.addEventListener("touchcancel", stop);
        return () => {
            if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
            document.removeEventListener("mouseup", stop);
            document.removeEventListener("touchend", stop);
            document.removeEventListener("mouseleave", stop);
            document.removeEventListener("touchcancel", stop);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.addEventListener("touchstart", handleStart, { passive: false });
        container.addEventListener("touchmove", handleMove, { passive: false });

        return () => {
            container.removeEventListener("touchstart", handleStart);
            container.removeEventListener("touchmove", handleMove);
        };
    }, [handleStart, handleMove]);

    useEffect(() => {
        if (image) {
            const size = Math.min(image.width, image.height) * 0.8;
            setCrop({
                x: (image.width - size) / 2,
                y: (image.height - size) / 2,
                width: size,
                height: size
            });
        }
    }, [image]);

    return {
        setUploadedFiles,
        file,
        image,
        isMobile,
        crop,
        setCrop,
        containerRef,
        cropAreaRef,
        canvasRef,
        handleStart,
        handleMove,
        isDragging,
        isResizing,
        isProcessing,
        resizeDirection,
        cropImage,
        downloadCroppedImage,
        getCroppedImageBlob
    };
}