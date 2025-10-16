import styled from 'styled-components';

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    overflow-x: hidden;

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

export const CropContainer = styled.div`
    position: relative;
    overflow: hidden;
    border: 2px solid #eee;
    border-radius: 8px;
    margin: 20px 0;
    background: #fafafa;
    min-height: 400px;
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
    -webkit-user-select: none;
    user-select: none;
    
    img {
        display: block;
        user-select: none;
        width: 100%;
        height: 100%;
        object-fit: contain;
        max-width: 100%;
        pointer-events: none;
    }

    @media (max-width: 768px) {
        min-height: 300px;
        margin: 16px 0;
        border-radius: 6px;
    }
`;

export const CropArea = styled.div`
    position: absolute;
    border: 2px solid #007bff;
    background: rgba(0, 123, 255, 0.1);
    cursor: move;
    box-sizing: border-box;
    max-width: 100%;
    max-height: 100%;

    .crop-handle {
        position: absolute;
        width: 16px;
        height: 16px;
        background: #007bff;
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);

        @media (max-width: 768px) {
            width: 20px;
            height: 20px;
        }
    }

    .top-left {
        top: -8px;
        left: -8px;
        cursor: nwse-resize;
    }

    .top-right {
        top: -8px;
        right: -8px;
        cursor: nesw-resize;
    }

    .bottom-left {
        bottom: -8px;
        left: -8px;
        cursor: nesw-resize;
    }

    .bottom-right {
        bottom: -8px;
        right: -8px;
        cursor: nwse-resize;
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

export const PreviewCanvas = styled.img`
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain'
`