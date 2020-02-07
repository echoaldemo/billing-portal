import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { StateContext } from "context/StateContext";
import InvoiceTableToolbar from "./InvoiceTableToolbar";
import PendingCheckboxToolbar from "./pending/PendingCheckboxToolbar";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}

export default function SimpleTabs() {
  const { state, setTab, selectedItems } = React.useContext(StateContext);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div
      style={{
        borderBottom: "solid 1px #f1f1f1 ",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      {selectedItems.length > 0 ? (
        <PendingCheckboxToolbar />
      ) : (
        <React.Fragment>
          <Tabs value={state.active_tab} onChange={handleChange}>
            <Tab
              label="Pending Invoices"
              {...a11yProps(0)}
              className="tab-text"
            />
            <Tab
              label="Approved Invoices"
              {...a11yProps(1)}
              className="tab-text"
            />
          </Tabs>
          <InvoiceTableToolbar />
        </React.Fragment>
      )}
    </div>
  );
}
