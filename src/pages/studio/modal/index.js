/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */

import PropTypes from "prop-types";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import { useState } from "react";

function DialogForm({ open, setOpen, handleSubmitAddSong }) {
  const [formValue, setFormValue] = useState({});

  const handleClose = () => {
    setOpen(false);
    setFormValue({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const captureFile = (e) => {
    console.log(e.target.files[0]);
    setFormValue({
      ...formValue,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ formValue });
    handleSubmitAddSong({ formValue });
    setOpen(false);
  };

  return (
    <DashboardLayout>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>RELEASE NEW</DialogTitle>
          <DialogContent>
            <DialogContentText>Fill information for the new release song</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Song name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="genre"
              name="genre"
              label="Genre"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              id="file"
              name="file"
              label="Song file"
              type="file"
              fullWidth
              variant="standard"
              onChange={captureFile}
            />
          </DialogContent>
          <DialogActions>
            <MDButton variant="contained" color="secondary" onClick={handleClose}>
              Cancel
            </MDButton>
            <MDButton type="submit" variant="contained" color="info">
              Submit
            </MDButton>
          </DialogActions>
        </form>
      </Dialog>
    </DashboardLayout>
  );
}

DialogForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleSubmitAddSong: PropTypes.func.isRequired,
};

export default DialogForm;
