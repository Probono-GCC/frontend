import React, { memo, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../Styles/css/Table.module.css";

const Table = memo(
  ({
    columns,
    rows,
    onRowSelection,
    onRowSelectedId,
    onRowDoubleClick,
    isRadioButton,
    id,
    isStudentTable,
    checkedRows,
    isReadOnly,
  }) => {
    const handleRowClick = (params) => {
      console.log("table:", params.row);
      onRowSelection(params.row);
    };
    const handleRowSelection = (newSelection) => {
      console.log("table selected rows:", newSelection);
      if ((id = "student_select_body")) {
        onRowSelectedId(newSelection); // 선택된 행 ID들을 상위 컴포넌트에 전달
      }
    };
    useEffect(() => {
      console.log("내가 받은 row", rows);
    }, []);
    return (
      <div id={id ? styles[id] : ""}>
        <DataGrid
          getRowId={(row) => row.id}
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
          }}
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick} //한개씩 전달
          onRowSelectionModelChange={handleRowSelection} //여러개 선택전달
          checkboxSelection={!(isRadioButton || isStudentTable || isReadOnly)} // 라디오 버튼 모드에 따라 체크박스 선택 여부 조절
          onRowDoubleClick={onRowDoubleClick}
          pageSizeOptions={[]}
          // pagination={false} // 페이지네이션 비활성화
          // pageSize={rows.length} // 모든 데이터를 한 페이지에 표시
          // paginationMode="server" // 클라이언트 측 페이지네이션을 기본값으로 설정
        />
      </div>
    );
  }
);

export default Table;
