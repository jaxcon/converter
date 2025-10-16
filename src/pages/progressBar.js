import styled from 'styled-components';

export const ProcessingOverlay = styled.div`
  position: relative;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 12px;
  margin: 20px 0;
`;

export const ProgressBar = styled.div`
  width: 100%;
  max-width: 300px;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
  margin: 16px 0;
`;

export const ProgressText = styled.div`
  font-size: 14px;
  color: #6c757d;
  font-weight: 500;
  margin-top: 8px;
`;