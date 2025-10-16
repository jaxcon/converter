import {
    ProgressBar,
    ProgressText,
    ProcessingOverlay,
    FileInfo,
    FileMeta,
    ProgressWrapper,
    ProgressFill,
    VideoPreview,
    RemoveBtn,
} from "../../../commonStyles";
import { FileTileWrapper } from "../styles";

export default function FileItem({
    fileObj,
    index,
    progress,
    converting,
    onRemove,
    getProgressColor,
    t,
}) {
    const isProcessing = progress > 0 && progress < 100;
    const isError = progress === -1;
    const isComplete = progress === 100;

    return (
        <FileTileWrapper>
            {isProcessing && <ProcessingOverlay>⏳</ProcessingOverlay>}

            <VideoPreview src={fileObj.preview} muted $isProcessing={isProcessing} />

            <FileInfo>
                <div>{fileObj.shortName}</div>
                <FileMeta>{(fileObj.file.size / 1024 / 1024).toFixed(1)} MB</FileMeta>
            </FileInfo>

            {(isProcessing || isComplete || isError) && (
                <ProgressWrapper>
                    <ProgressBar>
                        <ProgressFill
                            $width={isError ? 100 : progress}
                            $color={getProgressColor(progress)}
                        />
                    </ProgressBar>
                    <ProgressText $color={getProgressColor(progress)}>
                        {isError
                            ? t("error")
                            : isComplete
                            ? t("finished")
                            : `${progress}%`}
                    </ProgressText>
                </ProgressWrapper>
            )}

            <RemoveBtn
                onClick={() => onRemove(index)}
                disabled={converting || isProcessing}
            >
                ×
            </RemoveBtn>
        </FileTileWrapper>
    );
}