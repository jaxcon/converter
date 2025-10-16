import { ControlsRow, ActionButton } from "../styles";

export function CropControls({ isProcessing, onDownload, t }) {
    return (
        <ControlsRow>
            <ActionButton onClick={onDownload} disabled={isProcessing}>
                {isProcessing ? t("processing") : t("resizeAndDownload")}
            </ActionButton>
        </ControlsRow>
    );
}