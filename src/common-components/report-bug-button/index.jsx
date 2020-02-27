import React from "react";
import { Fab, Tooltip } from "@material-ui/core";
import BugReportIcon from "@material-ui/icons/BugReport";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    color: "#FFF",
    background: "#ffbc11"
  }
}));
const ReportBugButton = () => {
  const classes = useStyles();

  return (
    <Tooltip title="Report a bug">
      <Fab className={classes.fab}>
        <BugReportIcon />
      </Fab>
    </Tooltip>
  );
};

export default ReportBugButton;
