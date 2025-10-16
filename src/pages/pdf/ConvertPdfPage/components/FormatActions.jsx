import {
    FormatsGrid,
    FormatButton,
    ConvertButton,
    SelectTitle,
} from "../../../commonStyles";

export default function FormatActions({
    t,
    formats,
    disabled,
    canZip,
    onSingle,
    onZip,
}) {
    return (
        <>
            <SelectTitle>{t("formatSelect")}</SelectTitle>
            <FormatsGrid>
                {formats.map((format) => (
                    <div
                        key={format}
                        style={{ display: "flex", flexDirection: "column", gap: 8 }}
                    >
                        <FormatButton onClick={() => onSingle(format)} disabled={disabled}>
                            {t("in")} {format}
                        </FormatButton>

                        {canZip && (
                            <ConvertButton onClick={() => onZip(format)} disabled={disabled}>
                                {t("in")} {format} (ZIP)
                            </ConvertButton>
                        )}
                    </div>
                ))}
            </FormatsGrid>
        </>
    );
}