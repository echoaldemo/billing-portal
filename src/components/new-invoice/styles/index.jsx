import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    backgroundColor: "#5F7D98"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    padding: 30,
    overflow: "auto"
  },
  head: {
    backgroundColor: "#5F7D98",
    border: "1px solid #fff",
    color: "#fff"
  },
  dialog: {
    minWidth: "80vw"
  },
  save: {
    borderRadius: "3px 0 0 3px",
    color: "#fff",
    padding: "5px 0",
    backgroundColor: "#7C8A97",
    fontWeight: 600,
    "&:hover": {
      opacity: "0.7"
    }
  },
  save_disabled: {
    borderRadius: "3px 0 0 3px",
    color: "rgba(255,255,255,0.24) !important",
    padding: "5px 0",
    backgroundColor: "#7C8A97",
    fontWeight: 600,
    "&:hover": {
      opacity: "0.7"
    }
  },
  more: {
    borderRadius: "0 3px 3px 0",
    color: "#fff",
    minWidth: 10,
    padding: "5px 5px",
    backgroundColor: "#7C8A97",
    fontWeight: 600,
    "&:hover": {
      opacity: "0.7"
    }
  },
  more_disabled: {
    borderRadius: "0 3px 3px 0",
    color: "rgba(255,255,255,0.24) !important",
    minWidth: 10,
    padding: "5px 5px",
    backgroundColor: "#7C8A97",
    fontWeight: 600,
    "&:hover": {
      opacity: "0.7"
    }
  },
  actions: {
    backgroundColor: "#5F7D98",
    color: "#fff"
  }
}));

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
