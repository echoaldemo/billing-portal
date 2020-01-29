/* eslint-disable */
import React from "react";
import {
  Table,
  TableContainer,
  TablePagination,
} from "@material-ui/core";


import { get } from "utils/api";
import { TableLoader } from "common_components";
import {
  InvoiceTableHeader,
  InvoiceTableToolbar,
  InvoiceTableBody
} from "./index";
import { StateContext } from "context/StateContext";

const InvoiceTable = () => {
  const { state, setLoading, setData } = React.useContext(StateContext);

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  React.useEffect(() => {
    setLoading(true);

    get("/api/invoice")
      .then(res => {
        setLoading(false);
        setData(res.data.QueryResponse.Invoice);
        console.log(res.data.QueryResponse.Invoice);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }
  function getSorting(order, orderBy) {
    return order === "desc"
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy);
  }

  function sortData(data) {
    return stableSort(data, getSorting(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }
  return (
    <div className="mt-normal">
      <InvoiceTableToolbar numSelected={0} />
      {state.loading ? (
        <TableLoader />
      ) : (
          <React.Fragment>
            <TableContainer>
              <Table>
                <InvoiceTableHeader />
                <InvoiceTableBody data={sortData(state.data)} />
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={state.data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </React.Fragment>
        )}
    </div>
  );
};

export default InvoiceTable;
