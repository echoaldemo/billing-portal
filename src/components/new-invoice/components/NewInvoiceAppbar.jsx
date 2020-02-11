/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Button,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
  TextField,
  Collapse,
  Checkbox,
  ListItemText,
  Popover
} from "@material-ui/core";
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowDropDown
} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { post, get } from "utils/api";
import { StateContext } from "context/StateContext";
import { mockCompanies, mockCampaigns } from "../mock";
import { useStyles, MenuProps } from "../styles";
export default function NewInvoiceAppbar({ handleClose }) {
  const classes = useStyles();

  const [state, setState] = useState({
    anchorEl: null,
    tax: false,
    taxValue: ""
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
          New Manual Invoice
        </Typography>
        <Button
          classes={{ root: classes.save, disabled: classes.save_disabled }}
          onClick={() => handleSave()}
          color="inherit"
        >
          save
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
            onClick={() => handleSaveAndApprove()}
          >
            Save and approve
          </MenuItem>
        </Popover>
      </Toolbar>
    </AppBar>
  );
}
