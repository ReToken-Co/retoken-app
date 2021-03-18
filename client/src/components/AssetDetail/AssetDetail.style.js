import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

export const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
    flexGrow: 20,
  },
  paper: {
    padding: theme.spacing(5),
    margin: 'auto',
    maxWidth: 1000,
  },
  innerpaper: {
    padding: theme.spacing(5),
    margin: 0,
  },
  image: {
    width: 900,
    height: 500,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export const ImgWrapper = styled.div`
max-width: 100%;
  display: flex;
  justify-content: ${({ start }) => (start ? 'flex-start' : 'flex-end')};

  @media screen and (max-width: 768px) {
    padding-bottom: 65px;
  }
  `;

export const TopLine = styled.div`
  color: ${({ lightTopLine }) => (lightTopLine ? '#1c2237' : '#1c2237')};
  font-size: 18px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  margin-bottom: 16px;
`;

export const Img = styled.img`
  padding-right: 0;
  border: 0;
  max-width: 100%;
  vertical-align: middle;
  display: inline-block;
  max-height: 800px;
`;

export const Heading = styled.h1`
margin-top: -10px;
margin-bottom: 10px;
  max-width: 100%;
  font-size: 48px;
  line-height: 1.1;
  font-weight: 500;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
`;

export const Heading1 = styled.h1`
margin-top: -10px;
margin-bottom: 0 px;
  max-width: 100%;
  font-size: 35px;
  font-weight: 500;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
`;

export const Heading2 = styled.h2`
margin-top: -20px;
margin-bottom: ${({ bigMargin }) => (bigMargin ? '60px' : '40px')};
font-size: 25px;
  line-height: 1.1;
  font-weight: 400;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
`;

export const Heading3 = styled.h3`
margin-bottom: ${({ bigMargin }) => (bigMargin ? '36px' : '-5px')};
  font-size: 21px;
  line-height: 1.4;
  font-weight: 350;
  color: ${({ lightText }) => (lightText ? '#f7f8fa' : '#1c2237')};
`;

export const Subtitle = styled.p`
max-width: 300px;
margin-bottom: ${({ bigMargin }) => (bigMargin ? '40px' : '30px')};
  font-size: ${({ smallFont }) => (smallFont ? '18px' : '20px')};
  line-height: 0px;
  color: ${({ lightTextDesc }) => (lightTextDesc ? '#a9b3c1' : '#1c2237')};
`;

export const EthLink = styled.a`
max-width: 400px;
margin-bottom: ${({ bigMargin }) => (bigMargin ? '24px' : '5px')};
  font-size: 20px;
  line-height: 40px;
  color: ${({ lightTextDesc }) => (lightTextDesc ? '#a9b3c1' : '#1c2237')};

  &:hover {
    color: #0467fb;
    transition: 0.3s ease-out;
  }
`;

export const InvestmentInputRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: top;
  flex-direction: row;
`;

export const InvestmentInputColumn = styled.div`
  margin-bottom: 5px;
  padding-right: 5px;
  padding-left: 5px;
  flex: 1;
  max-width: 50%;
  flex-basis: 50%;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    flex-basis: 100%;
    display: flex;
    justify-content: top;
  }
`;
