import { ToolsPanel, ButtonsRow, DownloadButton, InfoText } from "../../../commonStyles";

export default function MergeToolsPanel({ t, files, getTotalPages, merging, canMerge, mergePDFs }) {
    return (
        <ToolsPanel>
            <InfoText>
                {files.length >= 2
                    ? `${t("readyToMerge")} ${files.length} ${t("filesOf")} ${getTotalPages} ${t("pagesOf")}`
                    : t("minimumMerge")}
            </InfoText>

            <ButtonsRow>
                <DownloadButton onClick={mergePDFs} disabled={!canMerge}>
                    {merging ? t("processing") : t("mergePdf")}
                </DownloadButton>
            </ButtonsRow>
        </ToolsPanel>
    );
}