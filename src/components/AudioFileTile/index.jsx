import { getFileFormat, getTargetFormat, getProgressColor } from "../../utils/audioUtils";
import { iconColors } from "./iconColorsConfig";

import {
    FileTile,
    ProcessingOverlay,
    FileInfo,
    ProgressBar,
    ProgressText,
    RemoveBtn,
} from "../../pages/commonStyles";

import AudioIcon from "./AudioIcon";

import {
    IconWrapper,
    FileSize,
    FileFormat,
    TargetFormat,
    ProgressWrapper,
} from "./styles";

export default function AudioFileTile({
    fileData,
    progress,
    onRemove,
    working,
    isTarget = false,
}) {
    const isProcessing = progress > 0 && progress < 100;
    const format = getFileFormat(fileData.file.name);
    const target = getTargetFormat(format);
    const iconColor = iconColors[format.toLowerCase()] || iconColors.default;
    const progressColor = getProgressColor(progress);
    const showProgress = isProcessing || progress === 100 || progress < 0 || working;

    const sizeMB = (fileData.file.size / 1024 / 1024).toFixed(2);

    return (
        <FileTile>
            {isProcessing && <ProcessingOverlay>⏳</ProcessingOverlay>}

            <IconWrapper>
                <AudioIcon color={iconColor} />
            </IconWrapper>

            <FileInfo>
                <div>{fileData.shortName}</div>
                <FileSize>{sizeMB} MB</FileSize>
                <FileFormat>
                    {format}
                    {format !== target && isTarget && (
                        <TargetFormat> → {target}</TargetFormat>
                    )}
                </FileFormat>
            </FileInfo>

            {showProgress && (
                <ProgressWrapper>
                    <ProgressBar>
                        <div
                            style={{
                                width: `${progress < 0 ? 100 : progress}%`,
                                backgroundColor: progressColor,
                                height: 6,
                                borderRadius: 3,
                            }}
                        />
                    </ProgressBar>
                    <ProgressText style={{ color: progressColor }}>
                        {progress < 0
                            ? "Error"
                            : progress === 100
                                ? "Finished"
                                : `${progress}%`}
                    </ProgressText>
                </ProgressWrapper>
            )}

            <RemoveBtn onClick={onRemove} disabled={isProcessing || working}>
                ×
            </RemoveBtn>
        </FileTile>
    );
}
