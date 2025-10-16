import { useTranslation } from "react-i18next";
import { PageContainer, Card } from "../../commonStyles";
import MainLayout from "../../../components/MainLayout";
import ImageUpload from "../../../components/Upload/ImageUpload";
import PageManual from "../../../components/PageManual";
import { useImageResize } from "../../../hooks/image/useImageResize";
import { MAX_DIMENSION } from "./resizeUtils";

import ImagePreviewSection from "./components/ImagePreviewSection";
import ResizeControls from "./components/ResizeControls";
import { OriginalSizeInfo } from "./styles";

export default function ResizePage({ pageKey }) {
    const {
        file,
        setFile,
        width,
        height,
        aspect,
        isProcessing,
        originalWidth,
        originalHeight,
        handleAspectChange,
        handleWidthChange,
        handleHeightChange,
        resizeImage,
    } = useImageResize();

    const { t } = useTranslation();

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <ImageUpload setFiles={setFile} multiple={false} disabled={isProcessing} />

                    {file.length > 0 ? (
                        <>
                            <ImagePreviewSection
                                file={file[0]}
                                width={width}
                                height={height}
                                isProcessing={isProcessing}
                            />

                            <ResizeControls
                                t={t}
                                width={width}
                                height={height}
                                aspect={aspect}
                                isProcessing={isProcessing}
                                handleWidthChange={handleWidthChange}
                                handleHeightChange={handleHeightChange}
                                handleAspectChange={handleAspectChange}
                                resizeImage={resizeImage}
                                maxDimension={MAX_DIMENSION}
                            />

                            {originalWidth !== parseInt(width) || originalHeight !== parseInt(height) ? (
                                <OriginalSizeInfo>
                                    {t("sourceSize")}{originalWidth}×{originalHeight}px
                                </OriginalSizeInfo>
                            ) : null}
                        </>
                    ) : (
                        <PageManual pageKey={pageKey} />
                    )}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}