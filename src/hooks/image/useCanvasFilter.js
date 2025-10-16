import { useEffect } from "react";

export function useCanvasFilter(files, filter, custom, canvasRef) {
    useEffect(() => {
        if (!files?.length) return;
        if (!canvasRef?.current) return;

        const img = new Image();

        img.onload = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            try {
                canvas.width = img.width;
                canvas.height = img.height;

                ctx.filter =
                    filter === "custom"
                        ? `
              brightness(${custom.brightness || 100}%)
              contrast(${custom.contrast || 100}%)
              saturate(${custom.saturate || 100}%)
              hue-rotate(${custom.hue || 0}deg)
              blur(${custom.blur || 0}px)
            `.trim()
                        : filter || "none";

                ctx.drawImage(img, 0, 0);
            } catch (err) {
                console.error("Canvas render error:", err);
            }
        };

        img.onerror = (err) => {
            console.error("Image load error:", err);
        };

        img.src = files[0].preview;

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [files, filter, custom, canvasRef]);

    useEffect(() => {
        return () => {
            files.forEach(fileObj => {
                if (fileObj.preview) {
                    URL.revokeObjectURL(fileObj.preview);
                }
            });
        };
    }, [files]);
}