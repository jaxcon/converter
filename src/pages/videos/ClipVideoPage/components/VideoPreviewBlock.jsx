import { VideoPreview, VideoElement } from "../styles";

export default function VideoPreviewBlock({ videoUrl, videoRef, videoFile, videoError, setIsPlaying }) {
    return (
        <VideoPreview>
            <VideoElement
                ref={videoRef}
                hasError={!!videoError}
                controls
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={videoUrl} type={videoFile?.file.type} />
            </VideoElement>
        </VideoPreview>
    );
}