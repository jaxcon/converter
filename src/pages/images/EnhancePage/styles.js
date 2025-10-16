
import styled from "styled-components";

export const Description = styled.p`
    text-align: center;
    margin-bottom: 30px;
    color: #666;
    font-size: 1.1rem;
`;

export const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 30px;

    @media (max-width: 768px) {
        rid-template-columns: 1fr;
    }
`;

export const FiltersSection = styled.div`
    background: #f8f9fa;
    padding: 25px;
    border-radius: 12px;
    border: 1px solid #e9ecef;
`;

export const SectionTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 25px;
    color: #2c3e50;
    text-align: center;
`;

export const FilterGroup = styled.div`
    margin-bottom: 20px;
`;

export const FilterLabel = styled.label`
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #495057;
`;

export const Slider = styled.input`
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #dee2e6;
    outline: none;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #667eea;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: #667eea;
        cursor: pointer;
        border: none;
    }
`;

export const BaseButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    flex: 1;
    min-width: 100px;

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        transform: translateY(-1px);
    }
`;

export const ApplyButton = styled(BaseButton)`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
`;

export const ResetButton = styled(BaseButton)`
    background: #6c757d;
    color: white;
`;

export const PreviewSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const PreviewWrapper = styled.div`
    width: 100%;
    border: 2px dashed #dee2e6;
    border-radius: 12px;
    padding: 10px;
    background: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;

    canvas {
        width: 100%;
        height: auto;
        max-height: 600px;
        object-fit: contain;
        border-radius: 8px;
        display: block;
    }
`;

export const PreviewImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    display: block;
`;

export const ActionButton = styled(BaseButton)`
    background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
    color: white;
`;
export const UploadSection = styled.div`
    text-align: center;
    margin-bottom: 30px;
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin-top: 15px;
`;

export const FilterButton = styled.button`
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    background: ${(props) => (props.$active ? "#005bb5" : "#0070f3")};
    color: white;
    white-space: nowrap;

    &:hover {
        background: #005bb5;
    }

    @media (max-width: 480px) {
        padding: 6px 12px;
        font-size: 14px;
    }
`;
export const CanvasWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

export const Canvas = styled.canvas`
    max-width: 100%;
    height: 400px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

export const DownloadButton = styled.button`
    width: 100%;
    max-width: 600px;
    padding: 12px 18px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    color: white;
    font-size: 1rem;
    font-weight: 500;
    transition: background 0.2s ease;

    &:hover {
        background: #004999;
    }

    @media (max-width: 480px) {
        padding: 10px 14px;
        font-size: 14px;
    }
`;