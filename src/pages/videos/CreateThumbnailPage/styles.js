import styled from "styled-components";

export const VideoPreview = styled.video`
    width: 100%;
    max-height: 500px;
    border-radius: 12px;
    background: #000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    
    @media (max-width: 768px) {
        max-height: 300px;
    }

    @media (max-width: 480px) {
        max-height: 250px;
    }
`;

export const VideoPreviewContainer = styled.div`
    margin: 20px 0;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 2px solid #e9ecef;
    text-align: center;

    @media (max-width: 768px) {
        padding: 15px;
        margin: 16px 0;
    }
`;

export const Thumbnail = styled.img`
    max-width: 100%;
    max-height: 400px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    border: 2px solid #e9ecef;
`;

export const ThumbnailContainer = styled.div`
    margin: 20px 0;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;
    border: 2px solid #e9ecef;
    text-align: center;

    @media (max-width: 768px) {
        padding: 15px;
        margin: 16px 0;
    }
`;

export const ThumbnailSectionTitle = styled.h3`
    margin-bottom: 16px;
    color: #495057;
    font-size: 18px;
    font-weight: 600;
`;

export const Button = styled.button`
    flex: 1 1 calc(50% - 12px);
    padding: 16px;
    border: none;
    border-radius: 8px;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    text-align: center;
    color: white;

    background: ${props => {
        switch (props.$variant) {
            case "primary": return "#007bff";
            case "secondary": return "#28a745";
            case "warning": return "#fd7e14";
            case "muted": return "#6c757d";
            default: return "#007bff";
        }
    }};

    &:hover {
        opacity: ${props => props.disabled ? "1" : "0.9"};
        transform: ${props => props.disabled ? "none" : "translateY(-2px)"};
        box-shadow: ${props => props.disabled ? "none" : "0 4px 12px rgba(0,0,0,0.2)"};
    }

    &:active {
        transform: ${props => props.disabled ? "none" : "scale(0.97)"};
    }

    @media (max-width: 768px) {
        flex: 1 1 100%;
    }
`;

export const ActionButtonsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 20px 0;
    justify-content: center;
`;

export const ProcessingOverlay = styled.div`
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

export const ProcessingText = styled.div`
    color: white;
    font-size: 18px;
    font-weight: bold;
    background: rgba(0, 0, 0, 0.8);
    padding: 20px 30px;
    border-radius: 10px;
`;