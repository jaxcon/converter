import { ToolsPanel, ButtonsRow, DownloadButton, InfoText } from "../../../commonStyles";
import { FormatWrapper, FormatLabel, FormatSelect } from "./styles";

export default function SplitToolsPanel({
    t,
    files,
    outputFormat,
    setOutputFormat,
    splitPDF,
    canSplit,
    splitting,
}) {
    return (
        <ToolsPanel>
            <FormatWrapper>
                <FormatLabel>{t("outputFormat")}</FormatLabel>
                <FormatSelect
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                >
                    <option value="pdf">PDF</option>
                    <option value="jpg">JPG</option>
                    <option value="png">PNG</option>
                </FormatSelect>
            </FormatWrapper>

            <InfoText>
                {t("selectedFiles")}{files.length}{t("selectPages")}
            </InfoText>

            <ButtonsRow>
                <DownloadButton onClick={splitPDF} disabled={!canSplit()}>
                    {splitting ? t("processing") : t("dividePdf")}
                </DownloadButton>
            </ButtonsRow>
        </ToolsPanel>
    );
}