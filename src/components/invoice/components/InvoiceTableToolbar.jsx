import React from "react";
import {
  Button,
  Toolbar,
  Tooltip,
  Menu,
  MenuItem,
  Dialog
} from "@material-ui/core";

import { Add } from "@material-ui/icons";
import Manual from "../../new-invoice/manual/ManualInvoice";
import Automatic from "../../new-invoice/automatic/AutomaticInvoice";
import { useStyles, Transition } from "../../new-invoice/styles";

import { LoadingNoDialog as Loading } from "common-components";

const InvoiceTableToolbar = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    anchorEl: null,
    type: ""
  });

  const handleClose = () => {
    setState({ ...state, type: "" });
  };

  const handleOpenMenu = event => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleCloseMenu = () => {
    setState({ ...state, anchorEl: null });
  };

  const renderLoading = () => {
    setState({ ...state, type: "loading" });
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const renderModal = () => {
    if (state.type === "manual")
      return (
        <Manual
          renderLoading={renderLoading}
          handleClose={() => handleClose("manual")}
        />
      );
    else if (state.type === "automatic")
      return (
        <Automatic
          renderLoading={renderLoading}
          handleClose={() => handleClose("automatic")}
        />
      );
    else if (state.type === "loading")
      return <Loading text="Saving invoice..." />;
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
            setState({
              ...state,
              type: "automatic",
              anchorEl: null
            })
          }
        >
          Automatic
        </MenuItem>
        <MenuItem
          style={{ padding: "15px 20px" }}
          onClick={() => setState({ ...state, type: "manual", anchorEl: null })}
        >
          Manual
        </MenuItem>
      </Menu>
      <Dialog
        open={state.type !== ""}
        maxWidth="sm"
        fullScreen
        classes={
          state.type === "loading" ? {} : { paperWidthSm: classes.dialog }
        }
        disableBackdropClick
        disableEscapeKeyDown
        TransitionComponent={Transition}
      >
        {renderModal()}
      </Dialog>
    </Toolbar>
  );
};

export default InvoiceTableToolbar;
