import { useTranslation } from "react-i18next";
import MainLayout from "../../../components/MainLayout";
import AudioUpload from "../../../components/Upload/AudioUpload";
import PageManual from "../../../components/PageManual";
import AudioFileTile from "../../../components/AudioFileTile";
import { useAudioConvert } from "../../../hooks/audio/useAudioConvert";

import {
    Card,
    PageContainer
} from "../../commonStyles";
import {
    ConvertButton,
    FileGrid,
    FormatButton,
    FormatsGrid,
    SelectTitle
} from "./styles";
import { targetFormats } from "./targetFormatsConfig";

export default function ConvertAudioPage({ pageKey }) {
    const {
        files,
        setFiles,
        converting,
        isLoading,
        progressMap,
        handleRemoveFile,
        handleConvert,
        handleBatchConvert,
        canConvert
    } = useAudioConvert();

    const { t } = useTranslation();

    return (
        <MainLayout pageKey={pageKey} >
            <PageContainer>
                <Card>
                    <AudioUpload setFiles={setFiles} disabled={converting || isLoading} />

                    <FileGrid>
                        {files.map((fileObj, index) => (
                            <AudioFileTile
                                key={fileObj.id}
                                fileData={fileObj}
                                progress={progressMap.get(fileObj.id) || 0}
                                onRemove={() => handleRemoveFile(index)}
                                working={converting}
                                isTarget={false}
                            />
                        )
                        )}
                    </FileGrid>

                    {(files.length > 0) ? (
                        <>
                            <SelectTitle>{t("formatSelect")}</SelectTitle>
                            <FormatsGrid>
                                {targetFormats.map((format) => (
                                    <div key={format} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <FormatButton onClick={() => handleConvert(format)} disabled={!canConvert()}>
                                            {t("in")} {format}
                                        </FormatButton>
                                        {files.length > 1 && (
                                            <ConvertButton onClick={() => handleBatchConvert(format)} disabled={!canConvert()}>
                                                {t("in")} {format} (ZIP)
                                            </ConvertButton>
                                        )}
                                    </div>
                                ))}
                            </FormatsGrid>
                        </>
                    ) : <PageManual pageKey={pageKey} />}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}