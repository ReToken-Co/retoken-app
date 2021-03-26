import React, { useState } from "react";
import { TextField, makeStyles } from "@material-ui/core";

export default function FileUpload() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignitems: "center",
      margin: "-10px 20px 0px 20px",
    },
    margin: {
      margin: theme.spacing(1),
      maxWidth: 720,
    },
  }));
  const classes = useStyles();

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      console.log(`selected file ${reader.result}`)
      setPreviewSource(reader.result);
    };
  };

  return (
    <>
      <TextField
        id="fileInput1"
        type="file"
        name="image"
        variant="outlined"
        fullWidth
        InputLabelProps={{ shrink: true }}
        onChange={handleFileInputChange}
        value={fileInputState}
        className={classes.margin}
      />
      {previewSource && (
        <img src={previewSource} alt="selected" style={{ height: "450px" }} className={classes.margin} />
      )}
    </>
  );
}
