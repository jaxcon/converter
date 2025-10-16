import {
    TimelineWrapper,
    TimelineContainer,
    SelectionArea,
    Handle
} from "../styles";
import WaveformCanvas from "./WaveformCanvas";

export default function WaveformTimeline({ timelineRef, canvasRef, selection, duration, handleStart }) {
    return (
        <TimelineWrapper>
            <TimelineContainer
                ref={timelineRef}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
            >
                <WaveformCanvas ref={canvasRef} height={120} />
                <SelectionArea
                    style={{
                        left: `${(selection.start / duration) * 100}%`,
                        width: `${((selection.end - selection.start) / duration) * 100}%`,
                    }}
                >
                    <Handle className="start-handle" />
                    <Handle className="end-handle" />
                </SelectionArea>
            </TimelineContainer>
        </TimelineWrapper>
    );
}