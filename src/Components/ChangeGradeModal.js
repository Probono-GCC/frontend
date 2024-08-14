import React, { useState } from "react";
import { styled, css } from "@mui/system";
import { grey } from "../Styles/Color"; // 색상 팔레트 임포트

import {
  Box,
  TextField,
  Grid,
  Modal as BaseModal,
  Backdrop,
  Button,
  MenuItem,
} from "@mui/material";

function CustomModal({ open, handleClose, title, rowData, rowsHeader }) {
  const [newGrade, setNewGrade] = useState("");
  const grades = [
    { value: "PlayGroup", label: "PlayGroup" },
    { value: "Nursery", label: "Nursery" },
    { value: "LowerKG", label: "LowerKG" },
    { value: "UpperKG", label: "UpperKG" },
    { value: "Class1", label: "Class 1" },
    { value: "Class2", label: "Class 2" },
    { value: "Class3", label: "Class 3" },
    { value: "Class4", label: "Class 4" },
    { value: "Class5", label: "Class 5" },
    { value: "Class6", label: "Class 6" },
    { value: "Class7", label: "Class 7" },
    { value: "Class8", label: "Class 8" },
    { value: "Class9", label: "Class 9" },
    { value: "Class10", label: "Class 10" },
  ];
  const handleSave = () => {
    console.log("?", rowData);
    setNewGrade("");
  };

  const handleNewGrade = (event) => {
    setNewGrade(event.target.value);
  };

  return (
    <div>
      <Modal
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
        keepMounted
      >
        <ModalContent
          sx={{
            width: 400,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 id="keep-mounted-modal-title" className="modal-title">
            {title}
          </h2>
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <Grid container spacing={2} sx={{ maxWidth: 600 }}>
              <Grid item xs={12} lg={12}>
                <TextField
                  disabled
                  fullWidth
                  label="name"
                  variant="outlined"
                  type="text"
                  value={rowData ? rowData.name : ""}
                  InputProps={{
                    style: {
                      fontWeight: "bold", // 텍스트를 bold로 설정
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={12}>
                <TextField
                  fullWidth
                  select
                  label="Grade"
                  value={newGrade}
                  onChange={(e) => setNewGrade(e.target.value)}
                >
                  {grades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleClose}
                  sx={{ marginRight: 2 }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  disabled={newGrade.length === 0}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Modal = styled(BaseModal)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  width: 90vw;
  margin: auto;
  align-items: center;
  justify-content: center;
  &.base-Modal-hidden {
    visibility: hidden;
  }
`);

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled("div")(
  ({ theme }) => css`
    height: 70vh;
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

export default CustomModal;
