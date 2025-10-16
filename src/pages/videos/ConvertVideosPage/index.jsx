import { useTranslation } from "react-i18next";
import MainLayout from "../../../components/MainLayout";
import VideoUpload from "../../../components/Upload/VideoUpload";
import PageManual from "../../../components/PageManual";
import { PageContainer, Card, FileGrid } from "../../commonStyles";
import { useVideoConverter } from "../../../hooks/video/useVideoConverter";
import { TARGET_FORMATS } from "./formatsConfig";

import FileItem from "./components/FileItem";
import FormatSelector from "./components/FormatSelector";
import { SelectTitle } from "./styles";

export default function ConvertVideosPage({ pageKey }) {
    const { t } = useTranslation();
    const {
        files,
        setFiles,
        converting,
        progress,
        handleRemoveFile,
        handleConvert,
        handleBatchConvert,
        getProgressColor
    } = useVideoConverter();

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <VideoUpload setFiles={setFiles} disabled={converting} />

                    <FileGrid>
                        {files.map((fileObj, index) => (
                            <FileItem
                                key={fileObj.id}
                                fileObj={fileObj}
                                index={index}
                                progress={progress[fileObj.id] || 0}
                                converting={converting}
                                onRemove={handleRemoveFile}
                                getProgressColor={getProgressColor}
                                t={t}
                            />
                        ))}
                    </FileGrid>

                    {files.length > 0 ? (
                        <>
                            <SelectTitle>{t("formatSelect")}</SelectTitle>
                            <FormatSelector
                                files={files}
                                formats={TARGET_FORMATS}
                                converting={converting}
                                onConvert={handleConvert}
                                onBatchConvert={handleBatchConvert}
                                t={t}
                            />
                        </>
                    ) : (
                        <PageManual pageKey={pageKey} />
                    )}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}