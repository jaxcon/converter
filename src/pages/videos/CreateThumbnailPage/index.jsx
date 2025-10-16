import { PageContainer, Card } from "../../commonStyles";
import { useTranslation } from "react-i18next";
import VideoUpload from "../../../components/Upload/VideoUpload";
import {
    VideoPreview,
    Thumbnail,
    Button,
    ThumbnailContainer,
    ActionButtonsContainer,
    ProcessingOverlay,
    ProcessingText,
    VideoPreviewContainer,
    ThumbnailSectionTitle
} from "./styles";
import MainLayout from "../../../components/MainLayout";
import PageManual from "../../../components/PageManual";
import { useCreateThumbnail } from "../../../hooks/video/useCreateThumbnail";

export default function CreateThumbnailPage({ pageKey }) {
    const { t } = useTranslation();
    const {
        setFiles,
        videoURL,
        videoRef,
        thumbnail,
        generateThumbnail,
        uploadThumbnailFromFile,
        downloadImage,
        downloadVideoWithThumbnail,
        isProcessing
    } = useCreateThumbnail();

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <VideoUpload setFiles={setFiles} multiple={false} />

                    {videoURL ? (
                        <>
                            <VideoPreviewContainer>
                                <VideoPreview ref={videoRef} src={videoURL} controls />
                            </VideoPreviewContainer>

                            <ActionButtonsContainer>
                                <Button onClick={generateThumbnail} $variant="primary">
                                    {t("createThumbnail")}
                                </Button>
                                <Button as="label" $variant="primary">
                                    {t("uploadThumbnail")}
                                    <input type="file" hidden onChange={uploadThumbnailFromFile} />
                                </Button>
                            </ActionButtonsContainer>

                            {thumbnail && (
                                <ThumbnailContainer>
                                    <ThumbnailSectionTitle>{t("thumbnailPreview")}</ThumbnailSectionTitle>
                                    <Thumbnail src={thumbnail} alt="Thumbnail" />
                                    <ActionButtonsContainer>
                                        <Button onClick={downloadImage} $variant="secondary">
                                            {t("downloadThumbnail")}
                                        </Button>
                                        <Button onClick={downloadVideoWithThumbnail} $variant="warning">
                                            {t("downloadThumbnailWithVideo")}
                                        </Button>
                                    </ActionButtonsContainer>
                                </ThumbnailContainer>
                            )}
                        </>
                    ) : (
                        <PageManual pageKey={pageKey} />
                    )}
                </Card>

                {isProcessing && (
                    <ProcessingOverlay>
                        <ProcessingText>{t("processing")}</ProcessingText>
                    </ProcessingOverlay>
                )}
            </PageContainer>
        </MainLayout>
    );
}