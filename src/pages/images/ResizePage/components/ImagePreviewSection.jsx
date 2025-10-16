import { ImagePreviewWrapper, ImagePreview } from "../styles";
import { ProcessingOverlay } from "../../../commonStyles";

export default function ImagePreviewSection({ file, width, height, isProcessing }) {
    return (
        <ImagePreviewWrapper>
            <ImagePreview
                src={file.preview}
                alt="preview"
                $width={`${width}px`}
                $height={`${height}px`}
                style={{ opacity: isProcessing ? 0.7 : 1 }}
            />
            {isProcessing && <ProcessingOverlay>⏳</ProcessingOverlay>}
        </ImagePreviewWrapper>
    );
}
