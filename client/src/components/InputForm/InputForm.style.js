import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
  // import ReactDropzone from "react-dropzone";

export const InputContainer = styled.div`
    background-color: #fff;
    padding: 4rem 0 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 760px) {
        flex-direction: column;
        width: 100%;
   }
`;

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: -30px 0px -15px 15px;
    max-width: 100%;
    @media screen and (max-width: 760px) {
        flex-direction: column;
        width: 100%;
   }
`;

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignitems: 'center',
        margin: '-10px 20px 0px 20px',
    },
    paper: {
        display: 'flex',
        flexWrap: 'wrap',
        marginBottom: '20px',
        maxWidth: '760px',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        margin: theme.spacing(1), 
        InputLabelProps: '{{ shrink: true, }}'
    },
}))