import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    line-height: 1.6;
`;

export const SectionBox = styled.div`
    padding: ${({ $padding }) => $padding || "20px"};
    background: ${({ $bg }) => $bg || "transparent"};
    border-radius: ${({ $radius }) => $radius || "10px"};
    text-align: ${({ $center }) => ($center ? "center" : "left")};
    margin-bottom: ${({ $margin }) => $margin || "30px"};
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 30px;
    color: #2c3e50;
`;

export const MissionTitle = styled.h2`
    color: #2c3e50;
`;

export const MissionText = styled.p`
    font-size: 18px;
`;

export const Section = styled.div`
    margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
    color: #2c3e50;
    margin-bottom: 20px;
`;

export const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
`;

export const FeatureCard = styled.div`
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

export const FeatureTitle = styled.h3`
    margin-bottom: 10px;
    color: ${({ color }) => color || "#2c3e50"};
`;

export const Paragraph = styled.p`
    margin-bottom: 15px;
`;

export const List = styled.ul`
    padding-left: 20px;
`;

export const ListItem = styled.li`
    margin-bottom: 8px;
`;

export const CtaTitle = styled.h2`
    color: #2c3e50;
    margin-bottom: 15px;
`;

export const CtaButton = styled.button`
    padding: 12px 30px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background: #2980b9;
    }
`;

export const ContactTitle = styled.h3`
    color: #2c3e50;
    margin-bottom: 15px;
`;