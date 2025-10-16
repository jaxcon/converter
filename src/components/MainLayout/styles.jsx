import styled from 'styled-components';

export const MainContainer = styled.div`
    display: flex;
    min-height: 100vh;
    width: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Sidebar = styled.div`
    width: 350px;
    min-width: 350px;
    position: relative;
    background: #f8f9fa;

    @media (max-width: 768px) {
        width: 100%;
        min-width: 100%;
        order: 2;
        margin-top: 20px;
    }
`;

export const Content = styled.div`
    flex: 1;
    min-height: 100vh;
    background: #ffffff;
    padding: 20px;

    @media (max-width: 768px) {
        width: 100%;
        order: 1;
        padding: 10px;
    }
`;