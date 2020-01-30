import React from "react";
import {
  Button,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem
} from "@material-ui/core";

import { Add } from "@material-ui/icons";
import Manual from "../../new-invoice/manual/ManualInvoice";
import Automatic from "../../new-invoice/automatic/AutomaticInvoice";


const InvoiceTableToolbar = props => {

  const [state, setState] = React.useState({
    manual: false,
    automatic: false,
    anchorEl: null
  });

  const handleOpen = label => {
    setState({ ...state, [label]: true });
  };

  const handleClose = label => {
    setState({ ...state, [label]: false });
  };

  const handleOpenMenu = event => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleCloseMenu = () => {
    setState({ ...state, anchorEl: null });
  };

  return (
    <Toolbar>



      <Tooltip title="Add new invoice">
        <Button className="add-btn" onClick={handleOpenMenu}>
          <Add /> New Invoice
          </Button>
      </Tooltip>

      <Menu
        anchorEl={state.anchorEl}
        keepMounted
        open={Boolean(state.anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          style={{ padding: "15px 20px" }}
          onClick={() =>
            setState({ ...state, automatic: true, anchorEl: null })
          }
        >
          Automatic
        </MenuItem>
        <MenuItem
          style={{ padding: "15px 20px" }}
          onClick={() => setState({ ...state, manual: true, anchorEl: null })}
        >
          Manual
        </MenuItem>
      </Menu>
      <Manual
        open={state.manual}
        handleClose={() => handleClose("manual")}
        handleOpen={handleOpen}
      />
      <Automatic
        open={state.automatic}
        handleClose={() => handleClose("automatic")}
        handleOpen={handleOpen}
      />
    </Toolbar>
  );
};

export default InvoiceTableToolbar;
