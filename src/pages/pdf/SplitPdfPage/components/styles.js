import styled from "styled-components";

export const FileTileWrapper = styled.div`
    position: relative;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 12px;
    background: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

export const FilePreview = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    opacity: ${({ $dimmed }) => ($dimmed ? 0.7 : 1)};
`;

export const FileInfo = styled.div`
    font-size: 13px;
    margin-top: 8px;

    .size {
        font-size: 12px;
        color: #666;
    }

    .pages {
        font-size: 11px;
        color: #888;
    }
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

export const ProcessingOverlay = styled.div`
    position: absolute;
    top: 6px;
    left: 6px;
    font-size: 16px;
`;

export const ProgressBar = styled.div`
    margin-top: 8px;
    height: 6px;
    border-radius: 3px;
    background: #eee;
    position: relative;
    overflow: hidden;

    &::after {
        content: "";
        display: block;
        height: 100%;
        width: ${({ $progress }) => $progress}%;
        background-color: ${({ $error, $complete }) =>
        $error ? "#ff4757" : $complete ? "#10ac84" : "#007bff"};
        transition: width 0.3s ease;
    }
`;

export const ProgressText = styled.div`
    margin-top: 4px;
    font-size: 11px;
    font-weight: bold;
    color: ${({ $error, $complete }) =>
        $error ? "#ff4757" : $complete ? "#10ac84" : "#007bff"};
`;

export const PageSelectorWrapper = styled.div`
    margin-top: 10px;
`;

export const PageSelectorInfo = styled.div`
    font-size: 12px;
    margin-bottom: 8px;
    color: #666;
`;

export const PageSelectorButtons = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    margin-bottom: 8px;
`;

export const PageButton = styled.button`
    padding: 2px 6px;
    font-size: 10px;
    border: 1px solid #ccc;
    background: ${({ $selected }) => ($selected ? "#007bff" : "#fff")};
    color: ${({ $selected }) => ($selected ? "#fff" : "#333")};
    border-radius: 3px;
    cursor: pointer;
`;

export const ActionButton = styled.button`
    color: #007bff;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 11px;
    margin-right: 8px;
`;

export const FormatWrapper = styled.div`
    margin-bottom: 16px;
`;

export const FormatLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    margin-right: 10px;
`;

export const FormatSelect = styled.select`
    padding: 6px 12px;
    border-radius: 4px;
    border: 1px solid #ccc;
`;
