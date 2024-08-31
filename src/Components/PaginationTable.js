import React, { memo, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../Styles/css/Table.module.css";
import { useMediaQueryContext } from "../store/MediaQueryContext";

const Table = memo(
  ({
    columns,
    rows,
    totalRowCount,
    onRowSelection,
    onRowSelectedId,
    onRowDoubleClick,
    isRadioButton,
    id,
    isStudentTable,
    isReadOnly,

    handlePageNumber, // 페이지 변경 핸들러
    onPageSizeChange, // 페이지 크기 변경 핸들러
  }) => {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(400);
    const { isSmallScreen } = useMediaQueryContext();

    // 페이지 변경 핸들러
    const handlePageChange = (page, newPage) => {
      setPage(newPage);
      if (handlePageNumber) {
        handlePageNumber(page, newPage); // 페이지 변경 시 부모에게 전달
      }
    };

    // 페이지 크기 변경 핸들러
    const handlePageSizeChange = (newPageSize) => {
      setPageSize(newPageSize);
      if (onPageSizeChange) {
        onPageSizeChange(page, newPageSize); // 페이지 크기 변경 시 부모에게 전달
      }
    };
    const handleRowClick = (params) => {
      onRowSelection(params.row);
    };
    const handleRowSelection = (newSelection) => {
      // console.log("table selected rows:", newSelection);
      if (id === "student_select_body") {
        onRowSelectedId(newSelection); // 선택된 행 ID들을 상위 컴포넌트에 전달
      }
    };

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
            "& .MuiDataGrid-menuIcon": {
              display: isSmallScreen ? "none" : "block", // 화면 크기에 따라 아이콘 숨기기
            },
            // overflowY: "auto", // 스크롤 추가
            height: "60vh",
          }}
          rows={rows}
          columns={columns}
          onRowClick={handleRowClick} //한개씩 전달
          onRowSelectionModelChange={handleRowSelection} //여러개 선택전달
          checkboxSelection={!(isRadioButton || isStudentTable || isReadOnly)} // 라디오 버튼 모드에 따라 체크박스 선택 여부 조절
          onRowDoubleClick={onRowDoubleClick}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          //   onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[]}
          rowCount={totalRowCount} // 총 데이터 수
          page={page}
          pagination
          paginationMode="server" //설정하지 않으면 Datagrid가 서버에서 모든 데이터를 한 번에 가져오는 것을 전제
        />
      </div>
    );
  }
);

export default Table;
