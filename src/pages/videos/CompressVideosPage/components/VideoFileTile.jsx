import {
    FileTile,
    ProcessingOverlay,
    VideoPreview,
    FileInfo,
    FileMeta,
    ProgressWrapper,
    ProgressBar,
    ProgressFill,
    ProgressText,
    RemoveBtn,
} from "../../../commonStyles";
import { getProgressColor } from "../../../../utils/videoUtils";
import { useTranslation } from "react-i18next";

export default function VideoFileTile({
    fileObj,
    progress,
    isProcessing,
    isError,
    isComplete,
    onRemove,
    loading,
}) {
    const { t } = useTranslation();

    return (
        <FileTile>
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
                    <ProgressText
                        $color={getProgressColor(progress)}
                    >
                        {isError
                            ? t("error")
                            : isComplete
                                ? t("finished")
                                : `${progress}%`}
                    </ProgressText>
                </ProgressWrapper>
            )}

            <RemoveBtn
                onClick={onRemove}
                disabled={loading || isProcessing}
                $disabled={loading || isProcessing}
            >
                ×
            </RemoveBtn>
        </FileTile>
    );
}