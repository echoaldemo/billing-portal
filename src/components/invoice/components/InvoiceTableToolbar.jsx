import React from "react";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Menu,
  MenuItem
} from "@material-ui/core";

import { Add, Delete as DeleteIcon } from "@material-ui/icons";
import Manual from "../../new-invoice/manual/ManualInvoice";
import Automatic from "../../new-invoice/automatic/AutomaticInvoice";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: "1 1 100%"
  }
}));

const InvoiceTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
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
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            List of all Invoices
        </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
          <Tooltip title="Add new invoice">
            <Button className="add-btn" onClick={handleOpenMenu}>
              <Add /> New Invoice
          </Button>
          </Tooltip>
        )}
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
