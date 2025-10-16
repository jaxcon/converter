import { memo, useState, useEffect } from "react";
import PDFIcon from "../PDFIcon";
import {
    FileTile,
    FilePreview,
    FileInfo,
    ProgressBar,
    ProcessingOverlay
} from "../../pages/commonStyles";
import {
    PdfPreviewWrapper,
    FileSize,
    PdfPages,
    ProgressWrapper,
    StyledRemoveBtn
} from "./styles";
import { getProgressColor } from "../../utils/audioUtils";
import { ProgressFill, ProgressLabel } from "./styles";

const ImageFileTile = ({ fileObj, progress, isProcessing, loading, onRemove, t, icon, pages }) => {
    const [preview, setPreview] = useState(fileObj.preview || null);
    const [failedPreview, setFailedPreview] = useState(false);

    useEffect(() => {
        if (!preview && fileObj.file.type.startsWith("image/")) {
            const url = URL.createObjectURL(fileObj.file);
            setPreview(url);
            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [fileObj.file, preview]);

    if (!fileObj || !fileObj.file) {
        console.error("Invalid fileObj:", fileObj);
        return null;
    }

    const isProcessingFile = progress > 0 && progress < 100;
    const isError = progress === -1;
    const isComplete = progress === 100;

    const fileName = fileObj.file.name || "Unknown file";
    const fileSize = fileObj.file.size || 0;
    const shortName = fileObj.shortName || (fileName.length > 20 ? fileName.slice(0, 17) + "..." : fileName);
    const progressColor = getProgressColor(progress);

    return (
        <FileTile>
            {isProcessingFile && <ProcessingOverlay>⏳</ProcessingOverlay>}

            {icon === "pdf" ? (
                <PdfPreviewWrapper>
                    <PDFIcon />
                </PdfPreviewWrapper>
            ) : (
                <FilePreview
                    src={preview}
                    alt={fileName}
                    loading="lazy"
                    $failed={failedPreview}
                    $processing={isProcessingFile}
                    onError={() => setFailedPreview(true)}
                />
            )}

            <FileInfo>
                <div>{shortName}</div>
                <FileSize>
                    {icon === "pdf"
                        ? (fileSize / 1024 / 1024).toFixed(2) + " MB"
                        : (fileSize / 1024).toFixed(1) + " KB"}
                </FileSize>
                {icon === "pdf" && (
                    <PdfPages>{pages > 0 ? `${pages} ${t("pages")}` : t("loading")}</PdfPages>
                )}
            </FileInfo>

            {(isProcessingFile || isComplete || isError) && (
                <ProgressWrapper>
                    <ProgressBar>
                        <ProgressFill $progress={progress} $color={progressColor} />
                    </ProgressBar>
                    <ProgressLabel $color={progressColor}>
                        {isError ? t("error") : isComplete ? t("finished") : `${progress}%`}
                    </ProgressLabel>
                </ProgressWrapper>
            )}

            <StyledRemoveBtn
                onClick={onRemove}
                disabled={isProcessing || loading}
                $disabled={isProcessingFile || loading}
            >
                ×
            </StyledRemoveBtn>
        </FileTile>
    );
};

export default memo(ImageFileTile, (prev, next) => {
    return (
        prev.fileObj?.id === next.fileObj?.id &&
        prev.progress === next.progress &&
        prev.isProcessing === next.isProcessing &&
        prev.loading === next.loading &&
        prev.pages === next.pages &&
        prev.icon === next.icon
    );
});
