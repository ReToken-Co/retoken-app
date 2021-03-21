import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import { Button } from "../../globalStyles";

const Password = ({ className, ...rest }) => {
  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Use at least 8 characters. Don’t use a password from another site, or something too obvious like your pet’s name."
          title="Change Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="New Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm new password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
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
            Change Password
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;