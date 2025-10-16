import styled, { keyframes } from "styled-components";

const pulse = keyframes`
    0% { opacity: 0.6; }
    50% { opacity: 0.8; }
    100% { opacity: 0.6; }
`;

export const UploadWrapper = styled.div`
    position: relative;
    border: 2px dashed ${props => props.$isDragging ? '#007bff' : props.$disabled ? '#ccc' : '#aaa'};
    border-radius: 12px;
    padding: 24px;
    text-align: center;
    margin-bottom: 18px;
    background: ${props => props.$disabled ? '#f5f5f5' : props.$isDragging ? '#e3f2fd' : '#fafafa'};
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    width: 100%;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:hover {
        background: ${props => props.$disabled ? '#f5f5f5' : '#f0f0f0'};
        border-color: ${props => props.$disabled ? '#ccc' : '#888'};
    }
`;

export const UploadButton = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;
    padding: 20px 24px;
    background: ${props => props.$disabled ? '#95a5a6' : '#007bff'};
    color: white;
    border-radius: 10px;
    cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 2px;
    transition: all 0.25s ease;
    box-sizing: border-box;
    word-break: keep-all;
    gap: 8px;
    user-select: none;
    opacity: ${props => props.$disabled ? 0.7 : 1};

    &:hover {
        background: ${props => props.$disabled ? '#95a5a6' : '#0056b3'};
        transform: ${props => props.$disabled ? 'none' : 'translateY(-2px)'};
    }

    &:active {
        transform: ${props => props.$disabled ? 'none' : 'scale(0.97)'};
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

export const FileInput = styled.input`
    display: none;
    
    &:disabled {
        cursor: not-allowed;
    }
`;

export const DisabledOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    z-index: 10;
`;

export const LoadingText = styled.div`
    color: #666;
    font-weight: 600;
    font-size: 16px;
    animation: ${pulse} 1.5s infinite;
`;

export const ErrorMessage = styled.div`
    background: #ff4757;
    color: white;
    padding: 12px 16px;
    border-radius: 8px;
    margin-top: 12px;
    font-size: 14px;
    font-weight: 500;
    animation: slideIn 0.3s ease;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const FormatsText = styled.p`
    margin-bottom: 12px;
    color: #555;
    font-size: 14px;
    font-weight: 500;
`;

export const HintText = styled.p`
    margin-top: 12px;
    color: #777;
    font-size: 13px;
`;