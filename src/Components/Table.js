import React, { memo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../Styles/css/Table.module.css";

const Table = memo(
  ({
    columns,
    rows,
    onRowSelection,
    onRowDoubleClick,
    getRowId,
    isRadioButton,
    id,
    isStudentTable,
    checkedRows,
    isReadOnly,
  }) => {
    const handleRowClick = (params) => {
      console.log("table:", checkedRows);
      if (isRadioButton) {
        onRowSelection(params.row.id);
      }
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
              display: isStudentTable ? "none" : "block", // selected row 숨기기
            },
            "& .MuiDataGrid-footerContainer": {
              justifyContent: isStudentTable ? "flex-start" : "",
              flexDirection: isStudentTable ? "row-reverse" : "",
            },
            // "& .MuiDataGrid-row": {
            //   // 동적 스타일링
            //   "&.MuiDataGrid-row": {
            //     backgroundColor: (params) =>
            //       checkedRows.includes(params.row.id)
            //         ? "blue !important"
            //         : "transparent",
            //     color: (params) =>
            //       checkedRows.includes(params.row.id) ? "white" : "inherit",
            //   },
            //   "&.Mui-selected": {
            //     backgroundColor: "#e0f7fa !important", // 선택된 행의 배경색
            //   },
            // },
          }}
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick}
          onRowSelectionModelChange={
            isStudentTable
              ? (newSelection) => onRowSelection(newSelection)
              : undefined
          }
          checkboxSelection={!(isRadioButton || isStudentTable || isReadOnly)} // 라디오 버튼 모드에 따라 체크박스 선택 여부 조절
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
