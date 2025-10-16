import { useTranslation } from "react-i18next";
import MainLayout from "../../../components/MainLayout";
import PageManual from "../../../components/PageManual";
import PDFUpload from "../../../components/Upload/PDFUpload";
import {
    PageContainer,
    Card,
    FileGrid
} from "../../commonStyles";

import { usePdfSplit } from "../../../hooks/pdf/usePdfSplit";
import FileTile from "./components/FileTile";
import SplitToolsPanel from "./components/SplitToolsPanel"

export default function SplitPdfPage({ pageKey }) {
    const { t } = useTranslation();
    const {
        files,
        setFiles,
        splitting,
        splitPDF,
        canSplit,
        outputFormat,
        setOutputFormat,
        splitProgress,
        handleRemoveFile,
        selectedPages,
        handlePageSelection,
    } = usePdfSplit();

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <PDFUpload setFiles={setFiles} multiple disabled={splitting} />

                    <FileGrid>
                        {files.map((fileObj) => (
                            <FileTile
                                key={fileObj.id}
                                fileObj={fileObj}
                                t={t}
                                progress={splitProgress[fileObj.id] || 0}
                                splitting={splitting}
                                onRemove={handleRemoveFile}
                                selectedPages={selectedPages}
                                onPageSelection={handlePageSelection}
                            />
                        ))}
                    </FileGrid>
                </Card>

                {files.length > 0 ? (
                    <SplitToolsPanel
                        t={t}
                        files={files}
                        outputFormat={outputFormat}
                        setOutputFormat={setOutputFormat}
                        splitPDF={splitPDF}
                        canSplit={canSplit}
                        splitting={splitting}
                    />
                ) : (
                    <PageManual pageKey={pageKey} />
                )}
            </PageContainer>
        </MainLayout>
    );
}