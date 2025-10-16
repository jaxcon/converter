import styled from "styled-components";

export const ManualContainer = styled.div`
  background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)";
    border: 2px solid "#e3e8ff";
    border-radius: 16px;
    padding: 28px;
    margin: 24px 0;
    box-shadow: 0 4px 20px rgba(0, 123, 255, 0.08);
    position: relative;
    overflow: hidden;
`;

export const Title = styled.h2`
    color: "#2c3e50";
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 10px;
    padding-left: 12px;
    border-left: 3px solid #007bff;
    line-height: 1.3;
`;

export const Subtitle = styled.p`
    font-size: 0.95rem;
    color: "#5f6c7b";
    margin-bottom: 20px;
    padding-left: 12px;
`;

export const StepsList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 16px;
`;

export const StepItem = styled.li`
    background: "white";
    padding: 18px 20px 18px 56px;
    border-radius: 12px;
    border-left: 4px solid #007bff;
    box-shadow: 0 2px 12px rgba(0, 123, 255, 0.1);
    position: relative;
    transition: all 0.3s ease;
    font-size: clamp(14px, 1vw, 15px);
    line-height: 1.5;
    color: "#2c3e50";

    &:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 16px rgba(0, 123, 255, 0.15);
    }

    svg {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        width: 22px;
        height: 22px;
        color: #007bff;
        opacity: 0.85;
    }
`;
