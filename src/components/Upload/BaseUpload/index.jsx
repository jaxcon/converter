import { useTranslation } from "react-i18next";
import {
    UploadWrapper, UploadButton, FileInput,
    DisabledOverlay, LoadingText, ErrorMessage,
    FormatsText, HintText,
} from "../../commonStyles";
import { useFileInput } from "../../../hooks/common/useFileInput";
import { FILE_CONFIGS } from "./fileInputConfigs";

export default function BaseUpload({ type, setFiles, multiple = true, disabled = false }) {
    const { t } = useTranslation();
    const config = FILE_CONFIGS[type];
    const Icon = config.icon;

    const {
        inputRef, isDragging, error,
        handleDrop, handleFileChange, handleClick, setIsDragging
    } = useFileInput({ setFiles, multiple, disabled, accept: config.accept });

    return (
        <>
            <UploadWrapper
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); !disabled && setIsDragging(true); }}
                onDragLeave={(e) => { e.preventDefault(); !disabled && setIsDragging(false); }}
                onClick={handleClick}
                $isDragging={isDragging}
                $disabled={disabled}
            >
                <FormatsText>{t(config.i18n.formats)}</FormatsText>

                <UploadButton as="div" $disabled={disabled}>
                    <Icon />
                    {multiple ? t(config.i18n.dragMany) : t(config.i18n.dragOne)}
                </UploadButton>

                <HintText>
                    {t(config.i18n.desc)} <b>(Ctrl+V)</b>
                </HintText>

                <FileInput
                    ref={inputRef}
                    type="file"
                    multiple={multiple}
                    accept={config.accept}
                    onChange={handleFileChange}
                    disabled={disabled}
                />

                {disabled && (
                    <DisabledOverlay>
                        <LoadingText>{t(config.i18n.processing)}</LoadingText>
                    </DisabledOverlay>
                )}
            </UploadWrapper>

            {error && <ErrorMessage>⚠️ {t(config.i18n.error)}</ErrorMessage>}
        </>
    );
}
