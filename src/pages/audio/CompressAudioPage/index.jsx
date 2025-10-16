import { useTranslation } from "react-i18next";
import MainLayout from "../../../components/MainLayout";
import AudioUpload from "../../../components/Upload/AudioUpload";
import PageManual from "../../../components/PageManual";
import { useAudioCompressor } from "../../../hooks/audio/useAudioCompressor";
import {
    PageContainer,
    Card,
    FileGrid,
    ToolsPanel,
    ButtonsRow,
    DownloadButton,
    DownloadSeparateButton,
    InfoText,
} from "../../commonStyles";
import AudioFileTile from "../../../components/AudioFileTile";
import { getFileFormat } from "../../../utils/audioUtils";

export default function CompressAudioPage({ pageKey }) {
    const { t } = useTranslation();

    const {
        files,
        setFiles,
        compressing,
        progressMap,
        handleRemoveFile,
        handleCompress,
    } = useAudioCompressor();

    const canCompress = files.length > 0 && !compressing;

    return (
        <MainLayout pageKey={pageKey} >
            <PageContainer>
                <Card>
                    <AudioUpload setFiles={setFiles} disabled={compressing} />
                    <FileGrid>
                        {files.map((fileObj, i) => (
                            <AudioFileTile
                                key={fileObj.id}
                                fileData={fileObj}
                                progress={progressMap.get(fileObj.id) || 0}
                                onRemove={() => handleRemoveFile(i)}
                                working={compressing}
                                isTarget={true}
                            />
                        ))}
                    </FileGrid>
                </Card>

                {files.length > 0 ? (
                    <ToolsPanel>
                        <InfoText>
                            {files.some((f) =>
                                ["WAV", "AIFF", "FLAC", "ALAC"].includes(
                                    getFileFormat(f.file.name)
                                )
                            )
                                ? t("needConvertToMp3")
                                : t("noNeedConvert")}
                        </InfoText>
                        <ButtonsRow>
                            <DownloadSeparateButton
                                onClick={() => handleCompress(false)}
                                disabled={!canCompress}
                            >
                                {compressing ? t("compressing") : t("separateDownload")}
                            </DownloadSeparateButton>
                            <DownloadButton
                                onClick={() => handleCompress(true)}
                                disabled={!canCompress}
                            >
                                {compressing ? t("compressing") : t("downloadZIP")}
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