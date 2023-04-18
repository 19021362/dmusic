/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */

import PropTypes from "prop-types";

import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDButton from "components/MDButton";
import { useEffect, useState } from "react";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";

function DialogForm({ open, setOpen, handleSubmitAddSong }) {
  const [formValue, setFormValue] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setIsLoading(false);
    setFormValue({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const captureFile = (e) => {
    setFormValue({
      ...formValue,
      file: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleSubmitAddSong({ formValue, setOpenModal: setOpen });
  };

  useEffect(() => {
    if (!open && isLoading) {
      setIsLoading(false);
      setFormValue({});
    }
  }, [open]);

  return (
    <DashboardLayout>
      <MDBox px={3}>
        <Dialog open={open} onClose={handleClose}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <DialogTitle>
              <MDTypography pt={2} textAlign="center" variant="h4">
                RELEASE NEW
              </MDTypography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText py={2}>
                <MDTypography variant="h6">Fill information for the new release song</MDTypography>
              </DialogContentText>
              <MDInput
                required
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
                required
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
                required
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
                required
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
              {!isLoading ? (
                <>
                  <MDButton variant="contained" color="secondary" onClick={handleClose}>
                    Cancel
                  </MDButton>
                  <MDButton type="submit" variant="contained" color="info">
                    Submit
                  </MDButton>
                </>
              ) : (
                <MDButton
                  variant="contained"
                  color="secondary"
                  disabled
                  startDecorator={<CircularProgress variant="solid" thickness={2} />}
                >
                  Loading...
                </MDButton>
              )}
            </DialogActions>
          </MDBox>
        </Dialog>
      </MDBox>
    </DashboardLayout>
  );
}

DialogForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleSubmitAddSong: PropTypes.func.isRequired,
};

export default DialogForm;
