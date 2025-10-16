import { ControlsRow, ActionButton } from "../styles";

export default function CropButton({ handleCropAndDownload, isProcessing, videoFile, ffmpegLoading, videoError, conversionProgress, t }) {
    return (
        <ControlsRow>
            <ActionButton
                onClick={handleCropAndDownload}
                disabled={isProcessing || !videoFile || ffmpegLoading || !!videoError}
            >
                {isProcessing ? `${t("processing")} (${conversionProgress}%)` : t("cropAndDownload")}
            </ActionButton>
        </ControlsRow>
    );
}