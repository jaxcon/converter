import { useTranslation } from "react-i18next";
import { PageContainer, Card } from "../../commonStyles";
import { Canvas } from "./styles";
import ImageUpload from "../../../components/Upload/ImageUpload";
import MainLayout from "../../../components/MainLayout";
import { useImageCrop } from "../../../hooks/image/useImageCrop";
import PageManual from "../../../components/PageManual";
import { Cropper } from "./components/Cropper";
import { CropControls } from "./components/CropControls";

export default function CropPage({ pageKey }) {
    const { t } = useTranslation();

    const {
        setUploadedFiles,
        file,
        image,
        crop,
        containerRef,
        cropAreaRef,
        canvasRef,
        handleStart,
        handleMove,
        isDragging,
        isResizing,
        isProcessing,
        resizeDirection,
        downloadCroppedImage,
    } = useImageCrop();

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <ImageUpload
                        setFiles={setUploadedFiles}
                        multiple={false}
                        disabled={isProcessing}
                    />

                    {file && image ? (
                        <>
                            <Cropper
                                file={file}
                                image={image}
                                crop={crop}
                                containerRef={containerRef}
                                cropAreaRef={cropAreaRef}
                                handleStart={handleStart}
                                handleMove={handleMove}
                                isDragging={isDragging}
                                isResizing={isResizing}
                                resizeDirection={resizeDirection}
                            />

                            <CropControls
                                isProcessing={isProcessing}
                                onDownload={() => file && downloadCroppedImage()}
                                t={t}
                            />

                            <Canvas ref={canvasRef} />
                        </>
                    ) : (
                        <PageManual pageKey={pageKey}/>
                    )}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}
