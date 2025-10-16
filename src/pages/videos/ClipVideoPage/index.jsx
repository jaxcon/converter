import { useTranslation } from "react-i18next";
import PageManual from "../../../components/PageManual";
import VideoUpload from "../../../components/Upload/VideoUpload";
import MainLayout from "../../../components/MainLayout";
import { useVideoCrop } from "../../../hooks/video/useVideoCrop";

import {
    PageContainer,
    Card,
} from '../../commonStyles';

import {
    CropContainer,
    Instructions,
    ProgressText as StyledProgressText,
    ErrorMessage,
} from './styles';

import VideoPreviewBlock from "./components/VideoPreviewBlock";
import VideoControls from "./components/VideoControls";
import Timeline from "./components/Timeline";
import CropInfo from "./components//CropInfo";
import CropButton from "./components/CropButton";
import { SUPPORTED_FORMATS } from "./formatsConfig";

export default function VideoCropPage({ pageKey }) {
    const { t } = useTranslation();

    const {
        uploadedFiles,
        videoFile,
        isProcessing,
        isPlaying,
        currentTime,
        duration,
        selection,
        videoUrl,
        ffmpegLoading,
        conversionProgress,
        videoError,
        videoRef,
        canvasRef,
        timelineRef,
        setIsPlaying,
        setUploadedFiles,
        handlePlayPause,
        handleStart,
        handleCropAndDownload,
        formatTime
    } = useVideoCrop();

    return (
        <MainLayout pageKey={pageKey}>
            <PageContainer>
                <Card>
                    <VideoUpload
                        setFiles={setUploadedFiles}
                        multiple={false}
                        acceptedFormats={SUPPORTED_FORMATS}
                    />

                    {videoError && <ErrorMessage>⚠️ {videoError}</ErrorMessage>}

                    {videoUrl ? (
                        <>
                            <VideoPreviewBlock
                                videoUrl={videoUrl}
                                videoRef={videoRef}
                                videoFile={videoFile}
                                videoError={videoError}
                                setIsPlaying={setIsPlaying}
                            />

                            <VideoControls
                                isPlaying={isPlaying}
                                t={t}
                                currentTime={formatTime(currentTime)}
                                duration={formatTime(duration)}
                                handlePlayPause={handlePlayPause}
                            />

                            <Instructions>
                                <p>{t("cropHint1")}</p>
                                <p>{t("cropHint2")}</p>
                            </Instructions>

                            <CropContainer>
                                <Timeline
                                    timelineRef={timelineRef}
                                    canvasRef={canvasRef}
                                    handleStart={handleStart}
                                />
                                <CropInfo selection={selection} t={t} formatTime={formatTime} />
                            </CropContainer>

                            <CropButton
                                handleCropAndDownload={handleCropAndDownload}
                                isProcessing={isProcessing}
                                videoFile={videoFile}
                                ffmpegLoading={ffmpegLoading}
                                videoError={videoError}
                                conversionProgress={conversionProgress}
                                t={t}
                            />
                        </>
                    ) : uploadedFiles.length > 0 ? (
                        <StyledProgressText>{t('loadingVideo')}</StyledProgressText>
                    ) : (
                        <PageManual pageKey={pageKey} />
                    )}
                </Card>
            </PageContainer>
        </MainLayout>
    );
}