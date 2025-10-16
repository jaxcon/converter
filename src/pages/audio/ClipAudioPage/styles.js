import styled from 'styled-components';

export const CropContainer = styled.div`
    position: relative;
    margin: 20px 0;
    background: #fafafa;
    border-radius: 8px;
    padding: 20px;
    border: 2px solid #eee;

    @media (max-width: 768px) {
        margin: 16px 0;
        padding: 16px;
    }
`;

export const TimelineWrapper = styled.div`
    position: relative;
    width: 100%;
    margin: 20px 0;
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    border: 2px solid #e9ecef;
`;

export const TimelineContainer = styled.div`
    position: relative;
    width: 100%;
    height: 120px;
    background: #f8f9fa;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid #dee2e6;

    @media (max-width: 768px) {
        height: 80px;
    }
`;
export const WaveformCanvas = styled.canvas`
    width: 100%;
    height: 100%;
    display: block;
`;

export const SelectionArea = styled.div`
    position: absolute;
    top: 0;
    height: 100%;
    background: rgba(255, 107, 53, 0.25);
    border: 2px solid #ff6b35;
    cursor: move;
    user-select: none;
    box-sizing: border-box;
    transition: all 0.1s ease;
    z-index: 10;

    @media (max-width: 768px) {
        border-width: 1px;
    }
`;
export const Handle = styled.div`
    position: absolute;
    width: 16px;
    height: 100%;
    background: #ff6b35;
    cursor: col-resize;
    top: 0;
    transition: all 0.2s ease;

    &.start-handle {
        left: -8px;
        border-radius: 4px 0 0 4px;
    }

    &.end-handle {
        right: -8px;
        border-radius: 0 4px 4px 0;
    }

    &:hover {
        background: #e55a2b;
        width: 18px;
    }

    @media (max-width: 768px) {
        width: 12px;

        &.start-handle {
            left: -6px;
        }
        &.end-handle {
            right: -6px;
        }
    }
`;

export const Instructions = styled.div`
    background: #e3f2fd;
    border: 1px solid #bbdefb;
    border-radius: 8px;
    padding: 15px;
    margin: 15px 0;
    text-align: center;

    p {
        margin: 5px 0;
        color: #1976d2;
        font-weight: 500;
    }
`;

export const TimeDisplay = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    margin-top: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #dee2e6;

    div {
        text-align: center;
        padding: 10px;
        background: white;
        border-radius: 6px;
        border: 1px solid #e9ecef;
        font-size: 14px;
    }

    strong {
        color: #495057;
        display: block;
        margin-bottom: 5px;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 10px;
    }
`;

export const AudioPlayer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
    margin: 25px 0;
    padding: 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-radius: 12px;
    border: 1px solid #dee2e6;
    flex-wrap: nowrap;

    button {
        padding: 12px 24px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        transition: all 0.3s ease;
        min-width: 140px;

        &:hover {
            background: #0056b3;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
        }

        &:active {
            transform: translateY(0);
        }

        &:disabled {
            background: #95a5a6;
            cursor: not-allowed;
            transform: none;
        }
    }

    span {
        font-size: 16px;
        font-weight: 600;
        color: #495057;
        background: white;
        padding: 8px 14px;
        border-radius: 8px;
        border: 1px solid #dee2e6;
        white-space: nowrap;
    }

    @media (max-width: 768px) {
        gap: 10px;
        padding: 12px;
        
        button {
            min-width: auto;
            padding: 10px 16px;
            font-size: 14px;
        }
        span {
            padding: 4px;
        }
    }
}
`;

export const ControlsRow = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
    width: 100%;

    @media (max-width: 768px) {
        margin: 16px 0;
    }
`;

export const ActionButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    padding: 20px 24px;
    background: ${props => props.disabled ? '#95a5a6' : '#007bff'};
    color: white;
    border-radius: 10px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 10px;
    transition: all 0.25s ease;
    box-sizing: border-box;
    gap: 8px;
    user-select: none;
    opacity: ${props => props.disabled ? 0.7 : 1};
    border: none;

    &:hover {
        background: ${props => props.disabled ? '#95a5a6' : '#0056b3'};
        transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
    }

    &:active {
        transform: ${props => props.disabled ? 'none' : 'scale(0.97)'};
    }

    @media (max-width: 768px) {
        width: 100%;
        padding: 16px;
        font-size: 15px;
        margin-bottom: 8px;
    }
`;

export const Canvas = styled.canvas`
    display: none;
`;

export const ProgressOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

export const ProgressText = styled.div`
    color: white;
    font-size: 18px;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px 30px;
    border-radius: 10px;
`;

export const VolumeSection = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;

    input[type="range"] {
        -webkit-appearance: none;
        width: 100px;
        height: 6px;
        border-radius: 3px;
        background: #ddd;
        outline: none;
        cursor: pointer;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
        }

        &::-moz-range-thumb {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
        }
    }
`;