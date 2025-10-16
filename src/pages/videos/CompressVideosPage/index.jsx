import {
    PageContainer,
    Card,
    FileGrid,
    ToolsPanel,
    ButtonsRow,
    DownloadSeparateButton,
    DownloadButton,
} from "../../commonStyles";
import VideoUpload from "../../../components/Upload/VideoUpload";
import MainLayout from "../../../components/MainLayout";
import PageManual from "../../../components/PageManual";
import { useVideoCompress } from "../../../hooks/video/useVideoCompress";
import VideoFileTile from "./components/VideoFileTile";
import { useTranslation } from "react-i18next";

export default function CompressVideosPage({ pageKey }) {
    const {
        files,
        setFiles,
        loading,
        compressionProgress,
        handleRemoveFile,
        handleCompressSeparate,
        handleCompressZip,
    } = useVideoCompress();

    const { t } = useTranslation();

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <VideoUpload setFiles={setFiles} disabled={loading} />

                    <FileGrid>
                        {files.map((fileObj, index) => {
                            const progress = compressionProgress.get(fileObj.id) || 0;
                            const isProcessing = progress > 0 && progress < 100;
                            const isError = progress === -1;
                            const isComplete = progress === 100;

                            return (
                                <VideoFileTile
                                    key={fileObj.id}
                                    fileObj={fileObj}
                                    progress={progress}
                                    isProcessing={isProcessing}
                                    isError={isError}
                                    isComplete={isComplete}
                                    onRemove={() => handleRemoveFile(index)}
                                    loading={loading}
                                />
                            );
                        })}
                    </FileGrid>
                </Card>

                {files.length > 0 ? (
                    <ToolsPanel>
                        <ButtonsRow>
                            <DownloadSeparateButton
                                onClick={handleCompressSeparate}
                                disabled={loading}
                            >
                                {loading ? t("compressing") : t("separateDownload")}
                            </DownloadSeparateButton>

                            <DownloadButton
                                onClick={handleCompressZip}
                                disabled={loading}
                            >
                                {loading ? t("compressing") : t("downloadZIP")}
                            </DownloadButton>
                        </ButtonsRow>
                    </ToolsPanel>
                ) : (
                    <PageManual pageKey={pageKey} />
                )}
            </PageContainer>
        </MainLayout>
    );
}