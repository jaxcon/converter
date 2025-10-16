import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

export const GlobalContainer = styled.div`
    width: 100%;
    overflow-x: visible;
    
    * {
        box-sizing: border-box;
    }
`;

export const Nav = styled.nav`
    background: #ffffff;
    padding: 6px 5%;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 6px 4% 8px 4%;
    }
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 1001;
`;

export const LogoText = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Logo = styled.div`
    font-size: 1.4rem;
    font-weight: bold;
    color: #333;
`;

export const SubLogo = styled.div`
    font-size: 0.9rem;
    color: #666;
`;

export const Menu = styled.ul`
    list-style: none;
    display: flex;
    gap: 24px;
    align-items: center;
    margin: 0;
    padding: 0;
    position: relative;

    @media (max-width: 768px) {
        display: none;
        flex-direction: column;
        gap: 0;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #fff;
        padding: 80px 20px 20px;
        margin: 0;
        z-index: 999;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        overflow-y: auto;
        
        li {
            width: 100%;
            border-bottom: 1px solid #eee;
            
            &:last-child {
                border-bottom: none;
            }
        }
    }

    &.open {
        display: flex;
        
        @media (max-width: 768px) {
            transform: translateX(0);
        }
    }
`;

export const StyledLink = styled(NavLink)`
    font-size: 1rem;
    color: #444;
    text-decoration: none;
    transition: all 0.2s ease;
    padding: 8px 12px;
    display: block;
    white-space: nowrap;

    &.active {
        color: #007bff;
        font-weight: 600;
        background: #f8f9fa;
        border-radius: 6px;
    }

    &:hover {
        color: #007bff;
        background: #f8f9fa;
        border-radius: 6px;
    }

    @media (max-width: 768px) {
        padding: 16px 0;
        font-size: 1.1rem;
        width: 100%;
    }
`;

export const BurgerButton = styled.button`
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    z-index: 1001;
    padding: 8px;

    @media (max-width: 768px) {
        display: block;
    }
`;

export const GradientLogo = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
`;

export const MenuBackdrop = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 998;
    }
`;

export const Dropdown = styled.li`
  position: relative;
  list-style: none;

  @media (min-width: 769px) {
    &:hover > ul {
      display: block;
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DropdownToggle = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    color: ${props => props.$active ? '#007bff' : '#444'};
    font-size: 1rem;
    padding: 8px 12px;
    border-radius: 6px;
    transition: all 0.2s ease;
    white-space: nowrap;
    position: relative;
    font-weight: ${props => props.$active ? '600' : 'normal'};

    &:hover {
        color: #007bff;
        background: #f8f9fa;
    }

    @media (max-width: 768px) {
        padding: 16px 0;
        font-size: 1.1rem;
        width: 100%;
        justify-content: space-between;
    }
`;

export const DropdownMenu = styled.ul`
    position: absolute;
    top: 100%;
    left: 0;
    background: white;
    padding: 8px 0;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    min-width: 200px;
    z-index: 1002;
    display: block;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.2s ease;
    margin: 0;
    padding: 0;

    li {
        padding: 0;
        border-bottom: none;
        list-style: none;
    }

    @media (min-width: 769px) {
        ${Dropdown}:hover & {
            display: block;
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
    }

    &.show {
        display: block;
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        
        @media (max-width: 768px) {
            position: static;
            box-shadow: none;
            margin-top: 8px;
        }
    }

    @media (max-width: 768px) {
        position: static;
        box-shadow: none;
        min-width: unset;
        padding: 0;
        margin: 0;
        display: none;
        background: #f8f9fa;
        border-radius: 6px;
        margin-top: 8px;
        opacity: 1;
        visibility: visible;
        transform: none;

        &.show {
            display: block;
        }
    }
`;

export const ActiveCategoryIndicator = styled.div`
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    background: #007bff;
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 10px;
    font-weight: 600;
    white-space: nowrap;
    
    @media (max-width: 768px) {
        position: static;
        transform: none;
        margin-left: 8px;
        padding: 1px 6px;
        font-size: 9px;
    }
`;

export const LogoLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:hover, &:focus {
        text-decoration: none;
        color: inherit;
    }
`;