import React from "react";
import { Divider, Grid } from "@material-ui/core";
import SEO from "utils/seo";
import Companies from "./Companies";
import "./styles.scss";
import Services from "./Services";
import QuickbooksConnect from "./QuickbooksConnect";
export default function GeneralSettings() {
  return (
    <div className="container">
      <SEO title="General Settings" />
      <QuickbooksConnect />
      <Divider />
      <br />
      <Grid container className="section-2-container" spacing={5}>
        <Grid item xs={6}>
          <Companies className="section-2-item" />
        </Grid>
        <Grid item xs={6}>
          <Services className="section-2-item" />
        </Grid>
      </Grid>
    </div>
  );
}
