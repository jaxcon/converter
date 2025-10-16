import {
    FormatsGrid,
    FormatButton,
    ConvertButton,
    SelectTitle
} from "../../../commonStyles";

export default function FormatActions({ filesCount, converting, formats, t, onConvert, onBatchConvert }) {
    return (
        <>
            <SelectTitle>{t("formatSelect")}</SelectTitle>
            <FormatsGrid>
                {formats.map((format) => (
                    <div key={format} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <FormatButton onClick={() => onConvert(format)} disabled={converting}>
                            {t("in")} {format}
                        </FormatButton>
                        {filesCount > 1 && (
                            <ConvertButton onClick={() => onBatchConvert(format)} disabled={converting}>
                                {t("in")} {format} (ZIP)
                            </ConvertButton>
                        )}
                    </div>
                ))}
            </FormatsGrid>
        </>
    );
}
