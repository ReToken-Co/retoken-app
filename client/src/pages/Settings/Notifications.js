import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Button } from "../../globalStyles";

const useStyles = makeStyles(({
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      {...rest}
    >
      <Card>
        <CardHeader
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Notifications
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Email"
              />
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Push Notifications"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Text Messages"
              />
            </Grid>
            <Grid
              className={classes.item}
              item
              md={4}
              sm={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Messages
              </Typography>
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Push Notifications"
              />
              <FormControlLabel
                control={(
                  <Checkbox defaultChecked />
                )}
                label="Text Messages"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button style={{ textTransform: 'none' }}
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;