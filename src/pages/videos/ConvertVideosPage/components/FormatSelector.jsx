import { FormatsGrid, FormatButton, ConvertButton, FormatColumn } from "../styles";

export default function FormatSelector({
    files,
    formats,
    converting,
    onConvert,
    onBatchConvert,
    t,
}) {
    return (
        <FormatsGrid>
            {formats.map((format) => (
                <FormatColumn key={format}>
                    <FormatButton
                        onClick={() => onConvert(format)}
                        disabled={converting}
                    >
                        {t("in")}
                        {format}
                    </FormatButton>
                    {files.length > 1 && (
                        <ConvertButton
                            onClick={() => onBatchConvert(format)}
                            disabled={converting}
                        >
                            {t("in")}
                            {format} (ZIP)
                        </ConvertButton>
                    )}
                </FormatColumn>
            ))}
        </FormatsGrid>
    );
}