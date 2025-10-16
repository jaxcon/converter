import {
    InputsRow,
    InputGroup,
    Input,
    ActionButton,
    MobileRow,
    ActionButtonWrapper,
} from "../styles";
import AspectSelect from "./AspectSelect";

export default function ResizeControls({
    t,
    width,
    height,
    aspect,
    isProcessing,
    handleWidthChange,
    handleHeightChange,
    handleAspectChange,
    resizeImage,
    maxDimension
}) {
    return (
        <InputsRow>
            <div className="desktop-only">
                <label>
                    {t("width")}
                    <Input
                        type="number"
                        value={width}
                        onChange={handleWidthChange}
                        min="1"
                        max={maxDimension}
                    />
                </label>
                <label>
                    {t("heigth")}
                    <Input
                        type="number"
                        value={height}
                        onChange={handleHeightChange}
                        min="1"
                        max={maxDimension}
                    />
                </label>
                <label>
                    {t("aspect")}
                    <AspectSelect value={aspect} onChange={handleAspectChange} t={t} />
                </label>
                <ActionButtonWrapper>
                    <ActionButton
                        onClick={resizeImage}
                        disabled={isProcessing || !width || !height}
                    >
                        {isProcessing ? t("processing") : t("changeAndDownload")}
                    </ActionButton>
                </ActionButtonWrapper>
            </div>

            <div className="mobile-only">
                <MobileRow>
                    <InputGroup>
                        <label>{t("width")}</label>
                        <Input
                            type="number"
                            value={width}
                            onChange={handleWidthChange}
                            min="1"
                            max={maxDimension}
                        />
                    </InputGroup>
                    <InputGroup>
                        <label>{t("heigth")}</label>
                        <Input
                            type="number"
                            value={height}
                            onChange={handleHeightChange}
                            min="1"
                            max={maxDimension}
                        />
                    </InputGroup>
                </MobileRow>

                <MobileRow>
                    <InputGroup style={{ flex: 2 }}>
                        <label>{t("aspect")}</label>
                        <AspectSelect value={aspect} onChange={handleAspectChange} t={t} />
                    </InputGroup>
                    <InputGroup style={{ flex: 1 }}>
                        <ActionButton
                            onClick={resizeImage}
                            disabled={isProcessing || !width || !height}
                            $mobile
                        >
                            {isProcessing ? "..." : t("apply")}
                        </ActionButton>
                    </InputGroup>
                </MobileRow>
            </div>
        </InputsRow>
    );
}