import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 8px;
    }
`;

export const Card = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 12px 22px;
    width: 100%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);

    @media (max-width: 768px) {
        padding-inline: 8px;
    }
`;


export const FileGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 16px;

    @media (min-width: 1024px) {
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
`;

export const FileTile = styled.div`
    background: #f9f9f9;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    font-size: 0.85rem;
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    position: relative;
`;

export const FilePreview = styled.img`
    max-width: 100%;
    height: 80px;
    object-fit: cover;
    border-radius: 6px;
    margin-bottom: 6px;
`;

export const RemoveBtn = styled.button`
    position: absolute;
    top: 6px;
    right: 6px;
    border: none;
    background: #ff4d4d;
    color: white;
    border-radius: 50%;
    width: 22px;
    height: 22px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
`;

export const FileInfo = styled.div`
    margin-bottom: 8px;

    div:first-child {
        font-weight: 500;
        margin-bottom: 2px;
    }
  
    div:last-child {
        color: #666;
    }
`;

export const FormatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
    margin-top: 16px;
    margin-bottom: 10px;
`;

export const FormatButton = styled.button`
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background: #f8f8f8;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
        background: #eaeaea;
    }

    &:active {
        transform: scale(0.97);
    }
`;

export const ConvertButton = styled.button`
    padding: 10px;
    background: ${props => props.disabled ? '#95a5a6' : '#28a745'};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-size: 12px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        background: ${props => props.disabled ? '#95a5a6' : '#1e7e34'};
        transform: ${props => props.disabled ? 'none' : 'translateY(-1px)'};
    }
`;

export const ProgressBar = styled.div`
    width: 100%;
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 4px;
`;

export const ProgressText = styled.div`
    text-align: center;
    font-size: 10px;
    font-weight: 600;
`;

export const ProcessingOverlay = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    z-index: 2;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: pulse 1.5s infinite;

    @keyframes pulse {
        0% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
`;

export const SelectTitle = styled.h3`
    margin: 24px 0 16px;
    text-align: center;
`;

export const SettingsPanel = styled.div`
    background: #f8f9fa;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
    border: 1px solid #e9ecef;

    h3 {
        margin: 0 0 16px 0;
        font-size: 16px;
        color: #333;
    }
`;

export const SettingRow = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 12px;
    justify-content: space-between;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const SettingLabel = styled.label`
    font-size: 14px;
    color: #555;
    margin-right: 12px;
    min-width: 120px;
`;

export const SettingSelect = styled.select`
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    min-width: 180px;
`;

export const SettingInput = styled.input`
    padding: 6px 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    min-width: 180px;
`;