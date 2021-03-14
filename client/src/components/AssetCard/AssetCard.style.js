import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 20,
    },
    paper: {
      padding: theme.spacing(5),
      margin: 'auto',
      maxWidth: 900,
    },
    image: {
      width: 450,
      height: 400,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }));

export const Heading = styled.h1`
  margin-bottom: 12px;
  font-size: 28px;
  line-height: 1.1;
  font-weight: 400;
  color:'#1c2237';
  max-width: 500px;
  `;

export const Subheading = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
  line-height: 1.1;
  font-weight: 200;
  color:'#1c2237';
`;

export const Subtitle = styled.h4`
  margin-bottom: 24px;
  font-size: 20px;
  line-height: 1.1;
  font-weight: 200;
  color:'#1c2237';
`;

export const BodyText = styled.p`
  max-width: 500px;
  margin-bottom: 5px;
  font-size: 18px;
  line-height: 24px;
  color:'#1c2237';
`;

export const TextWrapper = styled.div`
  max-width: 500px;
  padding: 0 0 0 0;
  margin: 0 0 0 0;
  word-wrap: break-word;

`;
