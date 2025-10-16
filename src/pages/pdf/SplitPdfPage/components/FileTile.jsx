import PDFIcon from "../../../../components/PDFIcon";
import PageSelector from "./PageSelector";
import {
    FileTileWrapper,
    FilePreview,
    FileInfo,
    RemoveBtn,
    ProgressBar,
    ProgressText,
    ProcessingOverlay,
} from "./styles";

export default function FileTile({
    fileObj,
    t,
    progress,
    splitting,
    onRemove,
    selectedPages,
    onPageSelection,
}) {
    const isProcessing = progress > 0 && progress < 100;
    const isError = progress === -1;
    const isComplete = progress === 100;

    return (
        <FileTileWrapper>
            {isProcessing && <ProcessingOverlay>⏳</ProcessingOverlay>}

            <FilePreview $dimmed={isProcessing}>
                <PDFIcon />
            </FilePreview>

            <FileInfo>
                <div>{fileObj.shortName}</div>
                <div className="size">
                    {(fileObj.file.size / 1024 / 1024).toFixed(2)} MB
                </div>
                <div className="pages">
                    {fileObj.pages > 0 ? `${fileObj.pages}` + t("pages") : t("loading")}
                </div>
            </FileInfo>

            {fileObj.pages > 0 && (
                <PageSelector
                    fileObj={fileObj}
                    selectedPages={selectedPages}
                    handlePageSelection={onPageSelection}
                    t={t}
                />
            )}

            {(isProcessing || isComplete || isError) && (
                <>
                    <ProgressBar
                        $progress={progress}
                        $error={isError}
                        $complete={isComplete}
                    />
                    <ProgressText $error={isError} $complete={isComplete}>
                        {isError
                            ? t("error")
                            : isComplete
                                ? t("finished")
                                : `${progress}%`}
                    </ProgressText>
                </>
            )}

            <RemoveBtn
                onClick={() => onRemove(fileObj.id)}
                disabled={isProcessing || splitting}
            >
                ×
            </RemoveBtn>
        </FileTileWrapper>
    );
}