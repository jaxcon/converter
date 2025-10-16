import { CropContainer, PreviewCanvas, CropArea } from "../styles";

export function Cropper({
    file,
    image,
    crop,
    containerRef,
    cropAreaRef,
    handleStart,
    handleMove,
    isDragging,
    isResizing,
    resizeDirection
}) {
    return (
        <CropContainer
            ref={containerRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            style={{
                cursor: isDragging
                    ? "grabbing"
                    : isResizing
                        ? `${resizeDirection}-resize`
                        : "default",
            }}
        >
            <PreviewCanvas
                src={file.preview}
                alt="Original"
                onError={(e) => {
                    console.error("Failed to load image preview");
                    e.target.style.display = "none";
                }}
            />

            <CropArea
                ref={cropAreaRef}
                style={{
                    left: `${(crop.x / image.width) * 100}%`,
                    top: `${(crop.y / image.height) * 100}%`,
                    width: `${(crop.width / image.width) * 100}%`,
                    height: `${(crop.height / image.height) * 100}%`,
                    cursor: isDragging ? "grabbing" : "move",
                }}
            >
                <div className="crop-handle top-left"></div>
                <div className="crop-handle top-right"></div>
                <div className="crop-handle bottom-left"></div>
                <div className="crop-handle bottom-right"></div>
            </CropArea>
        </CropContainer>
    );
}
