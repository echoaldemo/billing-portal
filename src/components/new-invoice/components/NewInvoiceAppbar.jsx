/* eslint-disable */
import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Button,
  Typography,
  Toolbar,
  MenuItem,
  Popover
} from "@material-ui/core";
import { Close, ArrowDropDown } from "@material-ui/icons";
import { useStyles } from "../styles";

export default function NewInvoiceAppbar({
  createFn,
  handleClose,
  type,
  balance,
  selectedCompany
}) {
  const classes = useStyles();

  const [state, setState] = useState({
    anchorEl: null
  });
  const handleShowMore = e => {
    setState({
      ...state,
      anchorEl: e.currentTarget
    });
  };
  const handleCloseMore = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          New {type || "Manual"} Invoice
        </Typography>
        <Button
          classes={{ root: classes.save, disabled: classes.save_disabled }}
          onClick={() => {
            createFn("draft");
          }}
          color="inherit"
          disabled={!selectedCompany}
        >
          Save
        </Button>
        <Button
          classes={{ root: classes.more }}
          color="inherit"
          onClick={handleShowMore}
        >
          <ArrowDropDown />
        </Button>
        <Popover
          anchorEl={state.anchorEl}
          open={Boolean(state.anchorEl)}
          onClose={handleCloseMore}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
        >
          <MenuItem style={{ padding: "15px 20px" }}>Save and send</MenuItem>
          <MenuItem
            style={{ padding: "15px 20px" }}
            onClick={() => {
              if (balance !== 0) {
                createFn("approve");
              }
            }}
            disabled={balance === 0}
          >
            Save and approve
          </MenuItem>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
