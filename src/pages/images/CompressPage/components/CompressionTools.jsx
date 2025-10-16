import {
    ToolsPanel,
    ButtonsRow,
    DownloadButton,
    DownloadSeparateButton
} from "../../../commonStyles";
import CompressionSlider from "../../../../components/CompressionSlider";

export default function CompressionTools({
    compression,
    setCompression,
    loading,
    isUploadDisabled,
    onCompressSeparate,
    onCompressZip,
    t
}) {
    return (
        <ToolsPanel>
            <CompressionSlider
                value={compression}
                setValue={setCompression}
                disabled={loading}
                loading={loading}
            />

            <ButtonsRow>
                <DownloadSeparateButton
                    onClick={onCompressSeparate}
                    disabled={isUploadDisabled}
                >
                    {loading ? t("compressing") : t("separateDownload")}
                </DownloadSeparateButton>

                <DownloadButton
                    onClick={onCompressZip}
                    disabled={isUploadDisabled}
                >
                    {loading ? t("compressing") : t("downloadZIP")}
                </DownloadButton>
            </ButtonsRow>
        </ToolsPanel>
    );
}
