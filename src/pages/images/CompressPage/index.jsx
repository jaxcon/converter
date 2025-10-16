import { useTranslation } from "react-i18next";

import { PageContainer, Card } from '../../commonStyles';
import MainLayout from "../../../components/MainLayout";
import ImageUpload from "../../../components/Upload/ImageUpload";
import GlobalProgressBar from "../../../components/GlobalProgressBar";
import PageManual from "../../../components/PageManual";

import { useImageCompress } from "../../../hooks/image/useImageCompress";
import ImageFileList from "./components/ImageFileList";
import CompressionOverlay from "./components/CompressionOverlay";
import CompressionTools from "./components/CompressionTools";

export default function CompressPage({ pageKey }) {
    const { t } = useTranslation();

    const {
        files,
        setFiles,
        compression,
        setCompression,
        loading,
        compressionProgress,
        completedFiles,
        globalProgress,
        isUploadDisabled,
        handleRemoveFile,
        handleCompressSeparate,
        handleCompressZip
    } = useImageCompress();

    return (
        <MainLayout pageKey={pageKey}>
            <GlobalProgressBar
                progress={globalProgress}
                totalFiles={files.length}
                completedFiles={completedFiles}
                text={t("compressing")}
            />

            <PageContainer>
                <Card>
                    <ImageUpload
                        setFiles={setFiles}
                        disabled={isUploadDisabled}
                    />

                    {loading ? (
                        <CompressionOverlay
                            progress={globalProgress}
                            completed={completedFiles}
                            total={files.length}
                            text={t("compressing")}
                        />
                    ) : (
                        <ImageFileList
                            files={files}
                            compressionProgress={compressionProgress}
                            loading={loading}
                            onRemove={handleRemoveFile}
                            t={t}
                        />
                    )}
                </Card>

                {files.length > 0 ? (
                    <CompressionTools
                        compression={compression}
                        setCompression={setCompression}
                        loading={loading}
                        isUploadDisabled={isUploadDisabled}
                        onCompressSeparate={handleCompressSeparate}
                        onCompressZip={handleCompressZip}
                        t={t}
                    />
                ) : (
                    <PageManual pageKey={pageKey} />
                )}
            </PageContainer>
        </MainLayout>
    );
}