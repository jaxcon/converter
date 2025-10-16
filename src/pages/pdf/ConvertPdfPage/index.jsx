import { useTranslation } from "react-i18next";
import MainLayout from "../../../components/MainLayout";
import PDFUpload from "../../../components/Upload/PDFUpload";
import PageManual from "../../../components/PageManual";
import { usePdfConverter } from "../../../hooks/pdf/usePdfConverter";
import { targetFormats } from "./pdfFormatsConfig";

import { PageContainer, Card } from "../../commonStyles";

import PdfFileGrid from "./components/PdfFileGrid";
import FormatActions from "./components/FormatActions";

export default function ConvertPdfPage({ pageKey }) {
    const { t } = useTranslation();

    const {
        files,
        setFiles,
        converting,
        progressMap,
        handleSingleConvert,
        handleZipConvert,
        handleRemoveFile,
    } = usePdfConverter();

    const hasFiles = files.length > 0;

    return (
        <MainLayout pageKey={pageKey} >
            <PageContainer>
                <Card>
                    <PDFUpload setFiles={setFiles} disabled={converting} />

                    <PdfFileGrid
                        files={files}
                        progressMap={progressMap}
                        converting={converting}
                        onRemove={handleRemoveFile}
                        t={t}
                    />

                    {hasFiles ? (
                        <FormatActions
                            t={t}
                            formats={targetFormats}
                            disabled={converting}
                            canZip={hasFiles}
                            onSingle={handleSingleConvert}
                            onZip={handleZipConvert}
                        />
                    ) : (
                        <PageManual pageKey={pageKey} />
                    )}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}