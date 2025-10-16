import styled from "styled-components";

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

    @media (max-width: 768px) {
        width: 100%;
        order: 1;
    }
`;

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 16px;
    gap: 32px;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
`;

export const Section = styled.div`
    width: 100%;
    max-width: 1100px;

    &:last-child {
        margin-bottom: 20px;
    }
`;

export const SectionTitle = styled.h2`
    font-size: 24px;
    font-weight: 700;
    color: #333;
    margin-bottom: 20px;
    text-align: left;
    padding-left: 8px;

    @media (max-width: 768px) {
        font-size: 20px;
        text-align: center;
        padding-left: 0;
    }
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 18px;
    width: 100%;

    @media (max-width: 768px) {
        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
        gap: 12px;
    }
`;

export const ToolCard = styled.div`
    background: #fff;
    border-radius: 14px;
    padding: 22px 18px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08);
    border: 1px solid rgba(0,0,0,0.06);
    transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
    display: grid;
    place-items: center;
    gap: 10px;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 24px rgba(0,0,0,0.12);
        border-color: ${(p) => p.color};
    }

    @media (max-width: 768px) {
        padding: 16px 12px;
    }
`;

export const IconCircle = styled.div`
    width: 56px;
    height: 56px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: ${(p) => p.color ? `rgba(${parseInt(p.color.slice(1, 3), 16)}, ${parseInt(p.color.slice(3, 5), 16)}, ${parseInt(p.color.slice(5, 7), 16)}, 0.08)` : 'rgba(25, 118, 210, 0.08)'};

    svg {
        width: 26px;
        height: 26px;
        stroke: ${(p) => p.color || '#1976d2'};
    }

    @media (max-width: 768px) {
        width: 48px;
        height: 48px;

        svg {
            width: 22px;
            height: 22px;
        }
    }
`;

export const ToolTitle = styled.div`
    font-weight: 700;
    font-size: 18px;
    color: #222;

    @media (max-width: 768px) {
        font-size: 16px;
  }
`;

export const ToolDesc = styled.div`
    font-size: 13px;
    color: #666;

    @media (max-width: 768px) {
        font-size: 12px;
    }
`;
