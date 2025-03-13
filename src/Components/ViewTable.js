import React, { memo, useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import styles from "../Styles/css/Table.module.css";
import { useMediaQueryContext } from "../store/MediaQueryContext";
import Toolbar from "./TableFooter";

const ViewTable = memo(
  ({
    columns,
    rows,
    totalRowCount,
    paginationModel,
    setPaginationModel,
    onSelectedAllRow,
    onRowDoubleClick,
    getRowId,
    id,
    isStudentTable,
    onPaginationChange,
  }) => {
    const { isSmallScreen } = useMediaQueryContext();

    // const [paginationModel, setPaginationModel] = useState({
    //   page: 0,
    //   pageSize: 10,
    // });

    const handlePaginationChange = useCallback(
      (newPaginationModel) => {
        if (onPaginationChange) {
          onPaginationChange(newPaginationModel);
        }
      },
      [onPaginationChange]
    );

    useEffect(() => {
      handlePaginationChange(paginationModel);
    }, []);

    const handleAllRowSelection = (params) => {
      onSelectedAllRow(params);
    };

    return (
      <div id={id ? styles[id] : ""}>
        <DataGrid
          sx={{
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#D8EDFF",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f0f0f0",
            },
            "& .MuiDataGrid-selectedRowCount": {
              display: isStudentTable ? "none" : "block",
            },
            height: isSmallScreen ? "70vh" : "60vh",
          }}
          rows={rows}
          columns={columns}
          // pageSizeOptions={[10, 30, 50, 100]}
          onRowSelectionModelChange={handleAllRowSelection}
          checkboxSelection={!(isStudentTable || isSmallScreen)}
          onRowDoubleClick={onRowDoubleClick}
          getRowId={getRowId}
          // rowCount={totalRowCount}
          paginationMode="server"
          // paginationModel={paginationModel}
          slots={{
            pagination: () => (
              <Toolbar
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                totalRowCount={totalRowCount}
              />
            ),
          }}
        />
      </div>
    );
  }
);

export default ViewTable;
