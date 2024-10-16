import React, { useEffect, useState } from "react";
import { styled, css } from "@mui/system";
import { Modal as BaseModal, Backdrop } from "@mui/material";
import { grey } from "../Styles/Color"; // 색상 팔레트 임포트
import { useMediaQueryContext } from "../store/MediaQueryContext";

import DetailTable from "./DetailTable";
// import DefaultImg from "../Assets/img/profile_temp.png";
import DefaultImg from "../Assets/img/default_profile.png";
//api
import { getTeacher, getStudent } from "../Apis/Api/User";
function createData(gender, name, birth, id, phone_num) {
  return { gender, name, birth, id, phone_num };
}
function CustomModal({ open, handleClose, title, rowData, rowsHeader }) {
  const { isSmallScreen } = useMediaQueryContext();
  const [profileImgPath, setProfileImgPath] = useState("");
  const [detailRowData, setDetailRowData] = useState();
  useEffect(() => {
    if (title === "Teacher Detail Info") {
      if (rowData && rowData.id) {
        getTeacher(rowData.id).then((result) => {
          // //console.log("getteacher", result, "rowData", rowData);
          if (result && result.imageId && result.imageId.imagePath) {
            // //console.log("getteacher image pth", result.imageId.imagePath);
            setProfileImgPath(result.imageId.imagePath);
          } else {
            setProfileImgPath("");
          }
          if (result && result.classId) {
            const updatedRowData = {
              ...createData(
                result.sex,
                result.name,
                result.birth,
                result.username,
                result.phoneNum
              ),
              home_room: result.classId.grade + "-" + result.classId.section,
            };
            // 상태를 업데이트하여 UI에서 변경된 데이터를 사용
            setDetailRowData(updatedRowData);
          } else if (result) {
            const updatedRowData = {
              ...createData(
                result.sex,
                result.name,
                result.birth,
                result.username,
                result.phoneNum
              ),
              home_room: "",
            };
            setDetailRowData(updatedRowData);
          }
        });
      }
    } else if (title === "Student Detail Info") {
      if (rowData && rowData.id) {
        setDetailRowData(rowData);
        getStudent(rowData.id).then((result) => {
          if (
            result &&
            result.imageResponseDTO &&
            result.imageResponseDTO.imagePath
          ) {
            // //console.log(
            //   "get stud image pth",
            //   result.imageResponseDTO.imagePath
            // );
            setProfileImgPath(result.imageResponseDTO.imagePath);
          } else {
            setProfileImgPath("");
          }
        });
      }
    }
    // //console.log("recieveted", rowData);
  }, [open, profileImgPath]);
  // 이미지가 로드되지 않을 경우를 대비한 예외 처리
  const handleImageError = (event) => {
    event.target.src = DefaultImg; // 기본 이미지로 대체
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h2 id="keep-mounted-modal-title" className="modal-title">
            {title}
          </h2>
          <img
            src={profileImgPath || DefaultImg}
            width="120px"
            height="120px"
            alt="loading"
            onError={handleImageError}
            style={modalImageStyle}
          />
          <TableContainer sx={{ width: isSmallScreen ? "270px" : "400px" }}>
            <DetailTable data={detailRowData} rowsHeader={rowsHeader} />
          </TableContainer>

          {/* <p id="keep-mounted-modal-description" className="modal-description">
            {JSON.stringify(rowData)}
          </p> */}
        </ModalContent>
      </Modal>
    </div>
  );
}
const modalImageStyle = {
  borderRadius: "50%",
  width: "120px",
  height: "120px",
  objectFit: "cover", // 비율 유지하면서 이미지 전체를 표시 cover or contain
  display: "block",
  margin: "auto",
};
const TableContainer = styled("div")(
  ({ theme }) => css`
    height: auto;
    overflow-y: scroll;
    padding: 24px;
  `
);
const Modal = styled(BaseModal)(`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
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
