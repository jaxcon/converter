import { useTranslation } from "react-i18next";
import { PageContainer, Card } from "../../commonStyles";
import MainLayout from "../../../components/MainLayout";
import GlobalProgressBar from "../../../components/GlobalProgressBar";
import PageManual from "../../../components/PageManual";
import PDFUpload from "../../../components/Upload/PDFUpload";
import { usePdfMerge } from "../../../hooks/pdf/usePdfMerge";

import MergeProgressOverlay from "./components/MergeProgressOverlay";
import FilesGrid from "./components/FilesGrid";
import MergeToolsPanel from "./components/MergeToolsPanel";

export default function MergePdfPage({ pageKey }) {
    const { t } = useTranslation();

    const {
        files,
        setFiles,
        merging,
        progressMap,
        globalProgress,
        completedFiles,
        canMerge,
        getTotalPages,
        handleDragEnd,
        handleRemoveFile,
        mergePDFs,
    } = usePdfMerge();

    return (
        <MainLayout pageKey={pageKey}>
            <GlobalProgressBar
                progress={globalProgress}
                totalFiles={files.length}
                completedFiles={completedFiles}
                text={t("merging")}
            />

            <PageContainer>
                <Card>
                    <PDFUpload setFiles={setFiles} multiple={true} disabled={merging} />

                    {merging ? (
                        <MergeProgressOverlay
                            t={t}
                            globalProgress={globalProgress}
                            completedFiles={completedFiles}
                            totalFiles={files.length}
                        />
                    ) : (
                        <FilesGrid
                            files={files}
                            merging={merging}
                            progressMap={progressMap}
                            handleDragEnd={handleDragEnd}
                            handleRemoveFile={handleRemoveFile}
                            t={t}
                        />
                    )}
                </Card>

                {files.length > 0 ? (
                    <MergeToolsPanel
                        t={t}
                        files={files}
                        getTotalPages={getTotalPages}
                        merging={merging}
                        canMerge={canMerge}
                        mergePDFs={mergePDFs}
                    />
                ) : (
                    <PageManual pageKey={pageKey} />
                )}
            </PageContainer>
        </MainLayout>
    );
}