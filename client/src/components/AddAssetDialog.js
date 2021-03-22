import { Modal, Backdrop, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function AddAssetDialog(props) {
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Application Successful!</h2>
            <p id="transition-modal-description">
              We will be processing your application and contact you within 5
              working days.
            </p>
          </div>
        </Fade>
      </Modal>
    </>
  );
}
