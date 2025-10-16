import { TimelineWrapper, TimelineContainer, TimelineCanvas } from "../styles";

export default function Timeline({ timelineRef, canvasRef, handleStart }) {
    return (
        <TimelineWrapper>
            <TimelineContainer
                ref={timelineRef}
                onMouseDown={handleStart}
                onTouchStart={handleStart}
            >
                <TimelineCanvas ref={canvasRef} height={120} />
            </TimelineContainer>
        </TimelineWrapper>
    );
}