import { ControlsRow, ActionButton } from "../styles";

export default function CropAction({ isProcessing, conversionProgress, onCrop, t}) {
    return (
        <ControlsRow>
            <ActionButton onClick={onCrop} disabled={isProcessing}>
                {isProcessing 
                    ? `${t("processing")} (${conversionProgress}%)`
                    : t("cropAndDownload")}
            </ActionButton>
        </ControlsRow>
    );
}