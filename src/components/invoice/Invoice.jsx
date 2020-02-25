import React from "react";
import { PanelHeader } from "common-components";
import {
  InvoiceTable,
  EditInvoice,
  TableTabs,
  PendingTable,
  FilterToolbar,
  InvoiceTableToolbar
} from "./components";
import PendingCheckboxToolbar from "./components/pending/PendingCheckboxToolbar";
import SearchData from "./components/filter-toolbar/SearchData";
import { Typography, Box, Paper, Divider, Grid } from "@material-ui/core";
import { StateContext } from "context/StateContext";
const Invoice = () => {
  const { selectedItems } = React.useContext(StateContext);

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
        {/* <Grid container className="p-normal">
          <Grid item lg={4}>
            <SearchData />
          </Grid>
        </Grid>
        <Divider /> */}
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

export default Invoice;
