import { useTranslation } from "react-i18next";

import MainLayout from "../../../components/MainLayout";
import PageManual from "../../../components/PageManual";
import AudioUpload from "../../../components/Upload/AudioUpload";

import { useAudioCrop } from "../../../hooks/audio/useAudioCrop";

import { PageContainer, Card } from "../../commonStyles";

import AudioControls from "./components/AudioControls";
import CropAction from "./components/CropAction";
import CropInstructions from "./components/CropInstructions";
import SelectionInfo from "./components/SelectionInfo";
import WaveformTimeline from "./components/WaveformTimeline";

export default function CropAudioPage({ pageKey }) {
    const {
        setUploadedFiles,
        audioFile,
        isProcessing,
        isPlaying,
        currentTime,
        duration,
        selection,
        volume,
        setVolume,
        conversionProgress,
        canvasRef,
        audioRef,
        timelineRef,
        handleStart,
        handlePlayPause,
        handleCropAndDownload,
    } = useAudioCrop();

    const { t } = useTranslation();


    return (
        <MainLayout pageKey={pageKey} >
            <PageContainer>
                <Card>
                    <AudioUpload
                        setFiles={setUploadedFiles}
                        multiple={false}
                        disabled={isProcessing}
                    />

                    {audioFile && duration > 0 ? (
                        <>
                            <AudioControls
                                isPlaying={isPlaying}
                                currentTime={currentTime}
                                duration={duration}
                                onPlayPause={handlePlayPause}
                                audioRef={audioRef}
                                volume={volume}
                                setVolume={setVolume}
                            />

                            <CropInstructions t={t} />

                            <WaveformTimeline
                                timelineRef={timelineRef}
                                canvasRef={canvasRef}
                                selection={selection}
                                duration={duration}
                                handleStart={handleStart}
                            />

                            <SelectionInfo
                                selection={selection}

                                t={t}
                            />

                            <CropAction
                                isProcessing={isProcessing}
                                conversionProgress={conversionProgress}
                                onCrop={handleCropAndDownload}
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
