import styled from 'styled-components';

export const CookieAlert = styled.div`
    position: fixed;
    z-index: 10000;
    background: #f8f9fa;
    border: 2px solid #dee2e6;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);

    @media (min-width: 769px) {
        bottom: 20px;
        right: 20px;
        left: 370px;
        max-width: 400px;
    }

    @media (max-width: 768px) {
        bottom: 210px;
        right: 10px;
        left: 10px;
        padding: 16px;
    }
`;

export const CookieContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 15px;
    }
`;

export const CookieText = styled.p`
    margin: 0;
    color: #495057;
    font-size: 14px;
    line-height: 1.5;
    flex: 1;
`;

export const CookieButton = styled.button`
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
        background: #0056b3;
        transform: translateY(-1px);
    }

    @media (max-width: 768px) {
        width: 100%;
    }
`;