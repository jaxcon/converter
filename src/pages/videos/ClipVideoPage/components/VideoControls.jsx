import { VideoPlayer as PlayerWrapper } from "../styles";

export default function VideoControls({ isPlaying, t, currentTime, duration, handlePlayPause }) {
    return (
        <PlayerWrapper>
            <button onClick={handlePlayPause}>
                {isPlaying ? t("pause") : t("play")}
            </button>
            <span>
                {currentTime} / {duration}
            </span>
        </PlayerWrapper>
    );
}