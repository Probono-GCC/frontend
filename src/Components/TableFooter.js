import {
  DataGrid,
  useGridApiContext,
  useGridSelector,
  gridPageSelector,
  gridPageCountSelector,
} from "@mui/x-data-grid";
import TablePagination from "@mui/material/TablePagination";
const Toolbar = ({ paginationModel, setPaginationModel, totalRowCount }) => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  const handleChangePage = (event, newPage) => {
    setPaginationModel((prev) => ({ ...prev, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPaginationModel({ page: 0, pageSize: newPageSize });
  };

  return (
    <TablePagination
      component="div"
      color="primary"
      count={totalRowCount}
      page={paginationModel.page}
      onPageChange={handleChangePage}
      rowsPerPage={paginationModel.pageSize}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
export default Toolbar;
