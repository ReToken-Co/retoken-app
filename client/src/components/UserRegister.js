import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { makeStyles, Button, TextField, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
      '& .MuiFormControl-root': {
          width: '80%',
          margin: theme.spacing(1)
      }
  }
}))

export default function UserRegister() {
  const { user, addUser } = useContext(UserContext);
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (!user || !user.name) setOpen(true);
    else setOpen(false);
  }, [user]);

  const handleSubmit = async (e) => {
    const _user = {
      address: user.address,
      name: e.target.name.value,
      email: e.target.email.value,
      role: "user"
    }
    await addUser(_user)
  }

  const handleClose = (data) => {
    console.log(`dialog  ${JSON.stringify(data.stateNode)}`);
    setOpen(false);
    history.push("/marketplace");
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">User Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your name and email to continue with our website. You
            can complete the KYC/AML process later
          </DialogContentText>
          <form id="userregister" className={classes.root} autoComplete="off" onSubmit={handleSubmit} >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            fullWidth
            required
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            required
          />
        <DialogActions>
          <Button id="cancel" onClick={(e) => {handleClose(e)}} color="primary">
            Cancel
          </Button>
          <Button id="register" name="register" type="submit" color="primary">
            Register
          </Button>
        </DialogActions>
        </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
