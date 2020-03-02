import React, { useEffect } from "react";
import { PanelHeader } from "common-components";
import {
  EditInvoice,
  PendingTable,
  FilterToolbar,
  InvoiceTableToolbar
} from "./components";
import PendingCheckboxToolbar from "./components/pending/PendingCheckboxToolbar";
import SearchData from "./components/filter-toolbar/SearchData";
import { Paper, Divider, Grid } from "@material-ui/core";
import { StateContext } from "context/StateContext";
const Invoice = (props) => {
  const { selectedItems, state, dispatch, setFormState } = React.useContext(
    StateContext
  );
  useEffect(() => {
    if (props.location.state && state.data.length !== 0) {
      const id = props.location.state.invoiceId;
      const arr = [...state.data].filter((e) => e.id === id);
      if (arr.length > 0) {
        dispatch({
          type: "set-selected-data",
          payload: { selectedData: arr[0] }
        });
        setFormState(arr[0]);
        dispatch({
          type: "set-manage-modal",
          payload: { openManage: true }
        });
      }
    }
  }, [props.location.state, state.data]);
  return (
    <React.Fragment>
      <PanelHeader
        title="Invoices"
        subTitle="Manage all pending and approved invoices from quickbooks site."
      />
      <Grid container>
        <Grid
          item
          lg={4}
          style={{
            display: "flex",
            alignItems: "center"
          }}
        >
          <SearchData />
        </Grid>
        <Grid
          item
          lg={8}
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center"
          }}
        >
          {selectedItems.length > 0 ? (
            <PendingCheckboxToolbar />
          ) : (
            <InvoiceTableToolbar />
          )}
        </Grid>
      </Grid>
      <br />

      <Paper square={true}>
        <div style={{ padding: 15 }}>
          <FilterToolbar />
        </div>
        <Divider />
        <PendingTable />
      </Paper>

      <EditInvoice />
    </React.Fragment>
  );
};
export default Invoice;
