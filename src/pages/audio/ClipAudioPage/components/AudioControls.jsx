import { AudioPlayer, VolumeSection } from "../styles";
import { formatTime } from "../../../../utils/audioUtils";

export default function AudioControls({
    isPlaying,
    currentTime,
    duration,
    onPlayPause,
    audioRef,
    volume,
    setVolume
}) {
    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
    };

    return (
        <AudioPlayer>
            <button onClick={onPlayPause}>
                {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
            <VolumeSection>
                <span>{volume === 0 ? "🔇" : "🔉"}</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </VolumeSection>

            <span>
                {formatTime(currentTime)} / {formatTime(duration)}
            </span>
        </AudioPlayer>
    );
}