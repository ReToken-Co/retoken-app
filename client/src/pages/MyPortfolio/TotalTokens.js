import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
//import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import { GiCrownCoin } from 'react-icons/gi';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.green[900]
  },
  differenceValue: {
    color: colors.green[900],
    marginRight: theme.spacing(1)
  }
}));

const TotalTokens = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              TOTAL TOKENS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              100
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <GiCrownCoin />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body1"
          >
            5%
          </Typography>
          <Typography
            color="textSecondary"
            variant="body2"
          >
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

TotalTokens.propTypes = {
  className: PropTypes.string
};

export default TotalTokens;