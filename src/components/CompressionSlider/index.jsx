import { useTranslation } from "react-i18next";
import {
    SliderContainer,
    SliderHeader,
    SliderTitle,
    CompressionValue,
    SliderWrapper,
    SliderTrack,
    SliderThumb,
    LoadingOverlay,
    Spinner,
    DisabledText
} from './styles';

const CompressionSlider = ({
    value,
    setValue,
    disabled = false,
    loading = false
}) => {

    const { t } = useTranslation();

    return (
        <SliderContainer>
            <SliderHeader>
                <SliderTitle $disabled={disabled}>
                    {t("compressionValue")}
                </SliderTitle>
                <CompressionValue $disabled={disabled}>
                    {value}%
                </CompressionValue>
            </SliderHeader>

            <SliderWrapper>
                <SliderTrack $disabled={disabled} />
                <SliderThumb
                    type="range"
                    min="0"
                    max="100"
                    aria-label={t("compressionValue")}
                    value={value}
                    onChange={(e) => !disabled && setValue(Number(e.target.value))}
                    $disabled={disabled}
                />
                {loading && (
                    <LoadingOverlay>
                        <Spinner />
                    </LoadingOverlay>
                )}
            </SliderWrapper>

            {disabled && (
                <DisabledText>
                    {t("changeBlocked")}
                </DisabledText>
            )}
        </SliderContainer>
    );
};

export default CompressionSlider;