import { useTranslation } from "react-i18next";
import MainLayout from "../../../components/MainLayout";
import GlobalProgressBar from "../../../components/GlobalProgressBar";
import ImageUpload from "../../../components/Upload/ImageUpload";
import PageManual from "../../../components/PageManual";
import {
    PageContainer,
    Card,
} from "../../commonStyles";

import { useImageConvert } from "../../../hooks/image/useImageConvert";
import ProcessingOverlayContent from "./components/ProcessingOverlayContent";
import FilesList from "./components/FilesList";
import FormatActions from "./components/FormatActions";

export default function ConvertPage({ pageKey }) {
    const { t } = useTranslation();
    const {
        files,
        setFiles,
        converting,
        progressMap,
        completedFiles,
        globalProgress,
        handleRemoveFile,
        handleConvert,
        handleBatchConvert,
        SUPPORTED_FORMATS
    } = useImageConvert();

    return (
        <MainLayout pageKey={pageKey}>
            <GlobalProgressBar
                progress={globalProgress}
                totalFiles={files.length}
                completedFiles={completedFiles}
                text={t("converting")}
            />
            <PageContainer>
                <Card>
                    <ImageUpload setFiles={setFiles} disabled={converting} />

                    {converting ? (
                        <ProcessingOverlayContent
                            t={t}
                            progress={globalProgress}
                            completed={completedFiles}
                            total={files.length}
                        />
                    ) : (
                        <FilesList
                            files={files}
                            progressMap={progressMap}
                            converting={converting}
                            onRemove={handleRemoveFile}
                            t={t}
                        />
                    )}

                    {files.length > 0 ? (
                        <FormatActions
                            filesCount={files.length}
                            converting={converting}
                            formats={SUPPORTED_FORMATS}
                            t={t}
                            onConvert={handleConvert}
                            onBatchConvert={handleBatchConvert}
                        />
                    ) : (
                        <PageManual pageKey={pageKey} />
                    )}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}