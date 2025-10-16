import { memo, forwardRef } from "react";
import { WaveformCanvas as StyledCanvas } from "../styles";

const WaveformCanvas = memo(
    forwardRef(({ height }, ref) => {
        return <StyledCanvas ref={ref} height={height} />;
    })
);

WaveformCanvas.displayName = "WaveformCanvas";

export default WaveformCanvas;