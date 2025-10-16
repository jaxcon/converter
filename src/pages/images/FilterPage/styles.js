import styled from "styled-components";

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    gap: 24px;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 8px;
    }
`;

export const Card = styled.div`
    background: #fff;
    border-radius: 12px;
    padding: 16px 24px;
    width: 100%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);

    @media (max-width: 768px) {
        padding: 12px;
    }
`;

export const CanvasContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-top: 20px;
`;

export const Canvas = styled.canvas`
    width: 100%;
    height: 500px;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    background: #f8f9fa;
`;

export const PresetsGrid = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    justify-content: center;
`;
export const FiltersGrid = styled.div`
    margin-top: 16px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;

    @media (max-width: 768px) {
        gap: 6px;
    }
`;

export const FilterButton = styled.button`
    padding: 12px 20px;
    border-radius: 8px;
    border: none;
    background: ${props => props.$active ? "#007bff" : "#f0f0f0"};
    color: ${props => props.$active ? "#fff" : "#333"};
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.25s ease;
    min-width: 100px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);

    &:hover {
        background: ${props => props.$active ? "#0056b3" : "#e0e0e0"};
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.97);
    }

    @media (max-width: 768px) {
        padding: 10px 16px;
        font-size: 13px;
        min-width: 90px;
    }
`;

export const CustomControls = styled.div`
    margin-top: 20px;
    display: grid;
    gap: 16px;
    max-width: 400px;
    margin-inline: auto;
    text-align: left;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 12px;

    @media (max-width: 768px) {
        max-width: 100%;
        padding: 16px;
        gap: 12px;
    }
`;

export const ControlLabel = styled.label`
    display: grid;
    gap: 8px;
    font-weight: 500;
    color: #333;
`;

export const RangeInput = styled.input`
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #ddd;
    outline: none;
    -webkit-appearance: none;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #007bff;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #007bff;
        cursor: pointer;
        border: none;
    }
`;

export const SaveButton = styled.button`
    width: 100%;
    max-width: 600px;
    padding: 16px 32px;
    border-radius: 8px;
    background: #007bff;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.25s ease;
    font-size: 16px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);

    &:hover {
        background: #0056b3;
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.97);
    }

    @media (max-width: 768px) {
        padding: 14px 20px;
        font-size: 15px;
    }
`;

export const ResetButton = styled.button`
    flex: 1;
    min-width: 140px;
    padding: 16px 32px;
    border-radius: 8px;
    background: #f44336;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.25s ease;
    font-size: 16px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.1);

    &:hover {
        background: #d32f2f;
        transform: translateY(-2px);
    }

    &:active {
        transform: scale(0.97);
    }

    @media (max-width: 768px) {
        padding: 14px 20px;
        font-size: 15px;
        flex: 1 1 100%;
    }
`;
export const ValueDisplay = styled.span`
    font-weight: 600;
    color: #007bff;
    margin-left: 8px;
`;

export const ActionsRow = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
`;