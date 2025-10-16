import styled from "styled-components";
import { RemoveBtn } from "../../pages/commonStyles";

export const PdfPreviewWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-color: #f5f5f5;
    border-radius: 8px;
`;

export const FileSize = styled.div`
    font-size: 12px;
    color: #666;
`;

export const PdfPages = styled.div`
    font-size: 10px;
    color: #888;
`;

export const ProgressWrapper = styled.div`
    margin-top: 8px;
`;

export const StyledRemoveBtn = styled(RemoveBtn)`
    opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
    cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
`;

export const ProgressFill = styled.div`
  width: ${({ $progress }) => $progress}%;
    height: 6px;
    border-radius: 3px;
    background-color: ${({ $color }) => $color};
    transition: width 0.3s ease;
`;

export const ProgressLabel = styled.div`
    font-size: 11px;
    font-weight: bold;
    color: ${({ $color }) => $color};
`;