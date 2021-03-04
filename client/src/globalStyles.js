import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Source Sans Pro', sans-serif;
 } 
`;

export const Container = styled.div`
  z-index: 1;
  width: 100%;
  max-width: 1300px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 50px;
  padding-left: 50px;

  @media screen and (max-width: 991px) {
    padding-right: 30px;
    padding-left: 30px;
  }
`;

export const Button = styled.button`
  border-radius: 4px;
  background: ${({ primary, live, closed }) => (primary ? '#0f4c96' : (live ? '#f76611' : (closed ? '#c91414' : '#17d2eb')))};
  white-space: nowrap;
  padding: ${({ big }) => (big ? '10px 20px' : '10px 20px')};
  margin: ${({ big }) => (big ? '0px 0px' : '0px 5px')};
  color: #fff;
  font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
  outline: none;
  border: none;
  cursor: pointer;

  &:hover {
    transition: all 0.3s ease-out;
    background: #fff;
    background-color: ${({ primary }) => (primary ? '#17d2eb' : '#0f4c96')};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
  
  @media screen and (max-width: 960px) {
    width: 100%;
  }
`;


export default GlobalStyle;
