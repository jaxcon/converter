import styled, { keyframes } from 'styled-components';

const progressAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

export const ProgressContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #f0f0f0;
    z-index: 10000;
    overflow: hidden;
    user-select: none;
    -webkit-user-select: none;
`;

export const ProgressBar = styled.div`
    height: 100%;
    background: linear-gradient( 90deg, #007bff 0%, #0056b3 25%, #007bff 50%, #0056b3 75%, #007bff 100%);
    background-size: 200% 100%;
    animation: ${progressAnimation} 1.5s ease infinite;
    transition: width 0.3s ease;
    width: ${props => props.$progress}%;

`;

export const ProgressText = styled.div`
    position: fixed;
    top: 10px;
    right: 20px;
    background: rgba(0, 123, 255, 0.9);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    z-index: 10001;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
`;