import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DetailsContainer from "./components/DetailsContainer";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function InvoiceDetails({ data }) {
  const classes = useStyles();

  return (
    <div className="modal-details-container">
      <div className="display-space-between">
        <DetailsContainer title="DOC Number" value="1070" />
        <DetailsContainer title="Company" value="Sample Company 1" />
        <DetailsContainer title="Campaigns" value="Zen Demo Campaign" />
      </div>
    </div>
  );
}
