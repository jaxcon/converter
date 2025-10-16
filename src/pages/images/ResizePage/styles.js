import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
    50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.7; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
`;

export const ProcessingOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${pulse} 1.5s infinite;
`;

export const ActionButtonWrapper = styled.div`
    display: flex;
    align-items: end;
`;

export const OriginalSizeInfo = styled.div`
    margin-top: 12px;
    padding: 8px 12px;
    background: #f8f9fa;
    border-radius: 6px;
    font-size: 13px;
    color: #666;
    text-align: center;
`;
export const ImagePreviewWrapper = styled.div`
    height: 50vh;
    display: flex;
    background: #fafafa;
    border: 1px solid #eee;
    border-radius: 8px;
    overflow: auto;
    padding: 20px;
    
    & > * {
        margin: auto;
    }
    
    @media (max-width: 768px) {
        height: 40vh;
    }
`;
export const ImagePreview = styled.img`
    display: block;
    width: ${props => props.$width || 'auto'};
    height: ${props => props.$height || 'auto'};
    max-width: none;
    max-height: none;
    ${props =>
        (props.$width && parseInt(props.$width) < 100) ||
            (props.$height && parseInt(props.$height) < 100)
            ? `
            border: 2px dashed #ccc;
            padding: 10px;
            background: white;
        `
            : ''
    }
`;

export const InputsRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 20px;

    .desktop-only {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        align-items: end;

        @media (max-width: 768px) {
            display: none;
        }
    }

    .mobile-only {
        display: none;

        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
            gap: 12px;
            width: 100%;
        }
    }

    label {
        display: flex;
        flex-direction: column;
        font-size: 14px;
        color: #333;
        margin-bottom: 4px;
    }
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

export const Input = styled.input`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    width: 100%;
    margin-top: 4px;
`;

export const Select = styled.select`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    width: 100%;
    margin-top: 4px;
`;

export const ActionButton = styled.button`
    padding: ${props => props.$mobile ? '10px 12px' : '10px 16px'};
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-size: ${props => props.$mobile ? '14px' : '14px'};
    font-weight: 500;
    transition: all 0.3s ease;
    width: 100%;
    min-height: 38px;
    white-space: nowrap;

    &:hover {
        background: ${props => props.disabled ? '#95a5a6' : '#0056b3'};
        transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
    }

    &:active {
        transform: ${props => props.disabled ? 'none' : 'scale(0.98)'};
    }

    &:disabled {
        background: #95a5a6;
        opacity: 0.7;
    }

    @media (max-width: 768px) {
        min-height: 42px;
        font-size: 14px;
    }
`;

export const ButtonRow = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 20px;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 12px;
    }
`;

export const DownloadLink = styled.a`
    display: inline-block;
    padding: 12px 24px;
    background: #28a745;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        background: #1e7e34;
        transform: translateY(-2px);
    }
`;

export const MobileRow = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
    align-items: end;

    &:last-child {
        margin-bottom: 10px;
    }
`;