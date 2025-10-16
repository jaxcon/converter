import styled from "styled-components";

export const FormatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    margin-top: 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const FormatButton = styled.button`
    padding: 12px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    transition: background 0.2s ease;

    &:hover {
        background: #0056b3;
    }

    &:disabled {
        background: #6c757d;
        cursor: not-allowed;
    }
`;

export const ConvertButton = styled(FormatButton)`
    background: #28a745;
    
    &:hover {
        background: #1e7e34;
    }

    &:disabled {
        background: #6c757d;
    }
`;



export const StyledRemoveBtn = styled.button`
    position: absolute;
    top: 4px;
    right: 6px;

    background: #e53935;
    border: none;
    color: white;
    font-size: 16px;
    line-height: 1;
    padding: 2px 6px;
    border-radius: 50%;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    transition: background 0.2s ease;

    &:hover {
        background: rgba(0, 0, 0, 0.6);
    }
`;

export const FileTileWrapper = styled.div`
  position: relative;
`;

export const FormatColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SelectTitle = styled.h3`
  margin-top: 16px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: bold;
`;