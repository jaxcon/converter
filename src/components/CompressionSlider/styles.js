import styled from 'styled-components';

export const SliderContainer = styled.div`
    width: 100%;
    padding: 20px 0;
    position: relative;
`;

export const SliderHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

export const SliderTitle = styled.h3`
    margin: 0;
    color: #2c3e50;
    font-size: 18px;
    font-weight: 600;
    opacity: ${props => props.$disabled ? 0.6 : 1};
    transition: opacity 0.3s ease;
`;

export const CompressionValue = styled.span`
    background: ${props => props.$disabled
        ? 'linear-gradient(135deg, #bdc3c7 0%, #95a5a6 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    color: white;
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 600;
    font-size: 14px;
    min-width: 60px;
    text-align: center;
    transition: all 0.3s ease;
`;

export const SliderWrapper = styled.div`
    position: relative;
    margin: 25px 0;
`;

export const SliderTrack = styled.div`
    width: 100%;
    height: 8px;
    background: ${props => props.$disabled
        ? 'linear-gradient(90deg, #bdc3c7 0%, #95a5a6 100%)'
        : 'linear-gradient(90deg, #ff6b6b 0%, #feca57 33%, #48dbfb 66%, #1dd1a1 100%)'};
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    opacity: ${props => props.$disabled ? 0.7 : 1};
    transition: all 0.3s ease;
`;

export const SliderThumb = styled.input`
    width: 100%;
    height: 8px;
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
    outline: none;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.$disabled ? 0.7 : 1};
    transition: all 0.3s ease;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: white;
        border: 3px solid ${props => props.$disabled ? '#95a5a6' : '#667eea'};
        box-shadow: 0 4px 15px rgba(102, 126, 234, ${props => props.$disabled ? 0.2 : 0.4});
        cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.3s ease;

        &:hover {
            transform: ${props => props.$disabled ? 'scale(1)' : 'scale(1.2)'};
            box-shadow: 0 6px 20px rgba(102, 126, 234, ${props => props.$disabled ? 0.2 : 0.6});
        }
    }

    &::-moz-range-thumb {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: white;
        border: 3px solid ${props => props.$disabled ? '#95a5a6' : '#667eea'};
        box-shadow: 0 4px 15px rgba(102, 126, 234, ${props => props.$disabled ? 0.2 : 0.4});
        cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
        transition: all 0.3s ease;

        &:hover {
            transform: ${props => props.$disabled ? 'scale(1)' : 'scale(1.2)'};
            box-shadow: 0 6px 20px rgba(102, 126, 234, ${props => props.$disabled ? 0.2 : 0.6});
        }
    }

    &::-webkit-slider-track {
        -webkit-appearance: none;
        width: 100%;
        height: 8px;
        background: transparent;
        border: none;
        border-radius: 10px;
    }

    &::-moz-range-track {
        width: 100%;
        height: 8px;
        background: transparent;
        border: none;
        border-radius: 10px;
    }
`;

export const LoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    z-index: 3;
`;

export const Spinner = styled.div`
    width: 24px;
    height: 24px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const DisabledText = styled.div`
    color: #7f8c8d;
    font-size: 12px;
    text-align: center;
    margin-top: 8px;
    font-style: italic;
`;