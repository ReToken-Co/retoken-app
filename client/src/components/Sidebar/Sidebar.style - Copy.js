import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core";

export const Sidebar = styled.div`
    background-color: #393d49;
    color: #fff;
    font-size: 1.2rem;
    position: fixed;
    top: 80px;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 220px;
    overflow-x: hidden;
`;

export const SideScroll = styled.div`
    position: relative;
    width: 220px;
    height: 100%;
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
    background-color: #393d49;
    color: #fff;
    transition: all 0.2s;
`;

export const SidebarItem = styled.li`
    color: #fff;
    font-size: 20px;
    width: 100%;
    line-height: 45px;
    position: relative;
    height: 45px;
    white-space: nowrap;
    &:hover {
        background-color: #4e5465;
    }
`;

export const SidebarChild = styled.dl`
    position: relative;
    z-index: 0;
    top: 0;
    border: none;
    box-shadow: none;
    height: 40px;
    line-height: 40px;
    color: #fff;
    &:hover {
        background: 0 0;
        color: #fff;
    }
`;

export const SidebarRef = styled.a`
    color: #fff;
    align-items: left;
    text-decoration: none;
    padding: 10px 10px;
    height: 100%;
    &:hover {
        color: #4b4d63;
        transition: all 0.3s ease;
      }
`;

export const SidebarLinks = styled(Link)`
    color: #fff;
    align-items: left;
    text-decoration: none;
    padding: 10px 10px;
    height: 100%;
    &:hover {
        color: #4b4d63;
        transition: all 0.3s ease;
      }
`;

export const useStyles = makeStyles({
    root: {
      width: 200,
  
      "& .MuiInputLabel-root": {
        color: "#fff"
      },
      "&:hover .MuiInputLabel-root": {
        color: "#4e5465"
      },
  
      "& .MuiFormLabel-root": {
        color: "#fff"
      },
    },
    input: {
      color: 'white'
    }
  });