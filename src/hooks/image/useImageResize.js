import { useState, useEffect } from "react";
import { aspectRatios } from "../../pages/images/ResizePage/resizeConfig";
import { MAX_DIMENSION } from "../../pages/images/ResizePage/resizeUtils";
import { getUniqueName } from "../../utils/uniqueIdGenerator";

export function useImageResize() {
    const [file, setFile] = useState([]);
    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [aspect, setAspect] = useState("free");
    const [isProcessing, setIsProcessing] = useState(false);
    const [originalWidth, setOriginalWidth] = useState(0);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [objectUrls, setObjectUrls] = useState([]);

    useEffect(() => {
        if (file.length > 0) {
            const objectUrl = URL.createObjectURL(file[0].file);
            setObjectUrls(prev => [...prev, objectUrl]);

            const img = new Image();
            img.src = objectUrl;
    
            img.onload = () => {
                setOriginalWidth(img.width);
                setOriginalHeight(img.height);
                setWidth(img.width);
                setHeight(img.height);
            };

            return () => {
                URL.revokeObjectURL(objectUrl);
                setObjectUrls(prev => prev.filter(url => url !== objectUrl));
            };
        }
    }, [file]);

    useEffect(() => {
        return () => {
            objectUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, []);

    const handleAspectChange = (newAspect) => {
        setAspect(newAspect);
        if (newAspect !== "free" && width) {
            const ratio = aspectRatios[newAspect];
            setHeight(Math.round(width / ratio));
        }
    };

    const handleWidthChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setWidth("");
            return;
        }

        const newWidth = Math.min(Number(value), MAX_DIMENSION);
        if (!isNaN(newWidth) && newWidth > 0) {
            setWidth(newWidth);
            if (aspect !== "free") {
                const ratio = aspectRatios[aspect];
                setHeight(Math.round(newWidth / ratio));
            }
        }
    };

    const handleHeightChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setHeight("");
            return;
        }

        const newHeight = Math.min(Number(value), MAX_DIMENSION);
        if (!isNaN(newHeight) && newHeight > 0) {
            if (aspect !== "free") {
                const ratio = aspectRatios[aspect];
                let newWidth = Math.round(newHeight * ratio);

                if (newWidth > MAX_DIMENSION) {
                    newWidth = MAX_DIMENSION;
                    const adjustedHeight = Math.round(newWidth / ratio);
                    setWidth(newWidth);
                    setHeight(adjustedHeight);
                } else {
                    setHeight(newHeight);
                    setWidth(newWidth);
                }
            } else {
                setHeight(newHeight);
            }
        }
    };

    const resizeImage = async () => {
        if (!file.length || !width || !height || width <= 0 || height <= 0) {
            console.error("Invalid resize parameters");
            return;
        }

        setIsProcessing(true);

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();

        return new Promise((resolve) => {
            img.onload = () => {
                try {
                    canvas.width = parseInt(width);
                    canvas.height = parseInt(height);

                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = "high";
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    const resizedDataURL = canvas.toDataURL("image/png", 1.0);

                    const link = document.createElement("a");
                    link.href = resizedDataURL;

                    link.download = getUniqueName(file[0].file.name, 'resized');
                    link.click();

                } catch (error) {
                    console.error("Error during image resize:", error);
                } finally {
                    setIsProcessing(false);
                    resolve();
                }
            };

            img.onerror = () => {
                console.error("Failed to load image for resizing");
                setIsProcessing(false);
                resolve();
            };

            img.src = file[0].preview;
        });
    };

    return {
        file,
        setFile,
        width,
        height,
        aspect,
        isProcessing,
        originalWidth,
        originalHeight,
        handleAspectChange,
        handleWidthChange,
        handleHeightChange,
        resizeImage,
    };
}