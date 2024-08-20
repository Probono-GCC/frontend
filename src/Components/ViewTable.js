import React, { memo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../Styles/css/Table.module.css";
import {
  MediaQueryProvider,
  useMediaQueryContext,
} from "../store/MediaQueryContext";
const Table = memo(
  ({
    columns, //table 열 구성
    rows, // table 행 data
    onSelectedAllRow, // table에서 선택된 row id를 넘겨주기 위한 파라미터
    onRowDoubleClick, //더블 클릭이 감지됨을 전달하는 파라미터
    getRowId,
    id, // 테이블 id 속성 지정 (css 설정을 위한)
    isStudentTable, // student view 특수 동작을 위해
  }) => {
    const { isSmallScreen } = useMediaQueryContext();
    // const handleRowClick = (params) => {};

    const handleAllRowSelection = (params) => {
      onSelectedAllRow(params);
    };
    return (
      <div id={id ? styles[id] : ""}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#D8EDFF", // 제목행(헤더) 배경색
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0", // 셀 선
            },
            "& .MuiDataGrid-selectedRowCount": {
              display: isStudentTable ? "none" : "block", // 모바일 뷰 selected row 숨기기
            },
            "& .MuiDataGrid-footerContainer": {
              justifyContent: isStudentTable ? "flex-start" : "",
              flexDirection: isStudentTable ? "row-reverse" : "",
            },
            "& .MuiDataGrid-menuIcon": {
              display: isSmallScreen ? "none" : "block", //모바일 뷰 table column option 숨기기
            },
          }}
          rows={rows}
          columns={columns}
          onRowSelectionModelChange={handleAllRowSelection}
          checkboxSelection={!(isStudentTable || isSmallScreen)} // 라디오 버튼 모드에 따라 체크박스 선택 여부 조절
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 15]}
          onRowDoubleClick={onRowDoubleClick}
          getRowId={getRowId}
        />
      </div>
    );
  }
);

export default Table;
