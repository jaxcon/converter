import styled from "styled-components";
import { Link } from "react-router-dom";

export const Title = styled.h1`
    font-size: 4rem;
    font-weight: bold;
    color: #d32f2f;
    text-align: center;
    margin: 0;
`;

export const Subtitle = styled.p`
    font-size: 1.2rem;
    color: #666;
    text-align: center;
    margin: 8px 0 24px;
`;

export const HomeButton = styled(Link)`
    display: inline-block;
    padding: 14px 24px;
    background: #28a745;
    color: white;
    font-weight: 500;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.25s ease;

    &:hover {
        background: #1e7e34;
        transform: translateY(-1px);
    }

    &:active {
        transform: scale(0.98);
    }
`;