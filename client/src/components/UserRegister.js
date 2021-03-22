import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { UserRegContext } from "../context/UserRegContext";
import {
  makeStyles,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
}));

export default function UserRegister(props) {
  const { formOpen, setFormOpen } = useContext(UserRegContext);
  const { user, addUser } = useContext(UserContext);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    const _user = {
      address: user.address,
      name: e.target.name.value,
      email: e.target.email.value,
      role: "user",
    };
    await addUser(_user);
//    console.log(`handle submit ${JSON.stringify(user)} ${assets}`)

  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setFormOpen(false);
  };

  const handleClose = async (e) => {
//console.log(`handle close ${JSON.stringify(user)} ${assets}`)
    e.preventDefault();
   // await assetDispatch({ type: "GET_ASSETS" })
   // await getUser()
  };

  return (
    <div>
      <Dialog
        open={formOpen}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">User Registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your name and email to continue with our website. You
            can complete the KYC/AML process later
          </DialogContentText>
          <form
            id="userregister"
            className={classes.root}
            autoComplete="off"
            onSubmit={handleSubmit}
          >
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
              <Button
                id="cancel"
                onClick={(e) => {
                  handleCancel(e);
                }}
                color="primary"
              >
                Cancel
              </Button>
              <Button
                id="register"
                name="register"
                type="submit"
                color="primary"
              >
                Register
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
