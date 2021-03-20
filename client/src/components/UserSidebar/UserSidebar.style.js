import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Sidebar = styled.div`
    background-color: #fafafa;
    color: #4b4d63;
    font-size: 1.2rem;
    position: fixed;
    top: 80px;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 220px;
    overflow-x: hidden;
`;

export const SidebarMenu = styled.ul`
    position: absolute;
    padding: 20px 20px;
    list-style: none;
    left: 0;
    top: 0;
    width: 0;
    height: 5px;
    background-color: #fafafa;
    color: #4b4d63;
    transition: all 0.2s;
`;

export const SidebarItem = styled.li`
    color: #4b4d63;
    font-size: 20px;
    width: 100%;
    line-height: 45px;
    position: relative;
    height: 45px;
    white-space: nowrap;
`;

export const SidebarLinks = styled(Link)`
    color: #4b4d63;
    align-items: left;
    text-decoration: none;
    padding: 10px 10px;
    height: 100%;
    :hover {
        color: #0246f7;
    }  
`;
