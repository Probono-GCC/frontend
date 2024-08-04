import { DataGrid, GridColDef } from "@mui/x-data-grid";

import styles from "../Styles/css/Table.module.css";
function Table({ columns, rows, onRowSelection, onRowDoubleClick }) {
  return (
    <div id={styles.table_body}>
      <DataGrid
        sx={{
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "#D8EDFF", // 제목행(헤더) 배경색
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f0f0f0", // 셀 선
          },
        }}
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={(newSelection) =>
          onRowSelection(newSelection)
        }
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 15]}
        onRowDoubleClick={onRowDoubleClick}
        getRowId={(row) => row.sn} // ClassInfo.js에서 테이블 두 개 생성 시 고유 ID 필요해서 임시로 생성!
      />
    </div>
  );
}

export default Table;
