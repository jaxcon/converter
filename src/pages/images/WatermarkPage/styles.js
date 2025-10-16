import styled from "styled-components";

export const ImagePreviewContainer = styled.div`
    position: relative;
    margin: 20px 0;
    padding: 20px;
    background: #f8f9fa;
    border: 2px solid #e9ecef;
    border-radius: 12px;
    text-align: center;

    canvas {
        display: block;
        max-width: 100%;
        width: 100%;
        height: auto;
        margin: 0 auto;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.12);
    }
`;

export const ImagePreview = styled.img`
    max-width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

export const WatermarkText = styled.div`
    position: absolute;
    bottom: 16px;
    right: 16px;
    color: rgba(255, 255, 255, 0.7);
    font-size: 18px;
    font-weight: bold;
`;

export const ActionButtonsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 20px 0;
    flex-wrap: wrap;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 10px;
    }
`;

export const Button = styled.button`
    flex: 1 1 calc(50% - 12px);
    padding: 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    text-align: center;
    color: white;

    background: ${(props) => {
        switch (props.variant) {
            case "primary":
                return "#007bff";
            case "secondary":
                return "#28a745";
            case "warning":
                return "#fd7e14";
            default:
                return "#007bff";
        }
    }};
`;

export const ControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin: 20px 0;
`;

export const Input = styled.input`
    padding: 14px;
    border: 2px solid #e9ecef;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 6px rgba(0, 123, 255, 0.4);
    }
`;
