import React from "react";
import { PanelHeader } from "common-components";
import {
  InvoiceTable,
  EditInvoice,
  TableTabs,
  PendingTable,
  FilterToolbar
} from "./components";
import { Typography, Box, Paper } from "@material-ui/core";
import { StateContext } from "context/StateContext";
const Invoice = () => {
  const { state } = React.useContext(StateContext);

  return (
    <React.Fragment>
      <PanelHeader
        title="Invoices"
        subTitle="Manage all pending and approved invoices from quickbooks site."
      />

      <FilterToolbar />
      <Paper className="mt-normal" square={true}>
        <TableTabs />

        {/* Pending */}
        <TabPanel value={state.active_tab} index={0}>
          <PendingTable />
        </TabPanel>
        {/* Approved */}
        <TabPanel value={state.active_tab} index={1}>
          <InvoiceTable />
        </TabPanel>
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
