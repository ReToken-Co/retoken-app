import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Button } from "../../globalStyles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  img: {
    height: 300,
    width: 500
  }
}));

const TokenCard = ({ className, token, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h5"
          style={{ fontWeight: 600 }}
        >
          {token.title} ({token.asset})
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          mb={3}
        >
          <img
            className={classes.img}
            alt="Product"
            src={token.media}
          />
        </Box>
        <Typography
            align="center"
            color="textSecondary"
            variant="h5"
            style={{ fontWeight: 600 }}
            >
            Investment: US${token.investment}
        </Typography>
        <Typography
            align="center"
            color="textPrimary"
            variant="h5"
            style={{ fontWeight: 600 }}
            >
            No. of tokens: {token.quantity}
        </Typography>
      </CardContent>
      <Box 
      p={2}
      align="right">
        <Button style={{ textTransform: 'none' }}
            color="primary"
            variant="contained"
          >
            <Link to='/marketplace' style={{textDecoration: 'None', color: '#FFF'}}>
                Invest More
            </Link>
          </Button>
      </Box>
    </Card>
  );
};

TokenCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default TokenCard;