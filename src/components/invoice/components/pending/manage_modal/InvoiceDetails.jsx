import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function InvoiceDetails({ data }) {
  const classes = useStyles();

  return (
    <Grid
      container
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <Grid item lg={6} md={12}>
        <List subheader={<h4>Invoice Details</h4>} className={classes.root}>
          <ListItem>
            <ListItemText primary="Invoice Type" />
            <ListItemSecondaryAction>Automatic</ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Company" />
            <ListItemSecondaryAction>
              7 Summits Marketing
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Campaigns" />
            <ListItemSecondaryAction>Home Improvement</ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemText primary="Start Date" />
            <ListItemSecondaryAction>January 12, 2019</ListItemSecondaryAction>
          </ListItem>

          <ListItem>
            <ListItemText primary="Due Date" />
            <ListItemSecondaryAction>December 2, 2020</ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
      <Grid item lg={6} md={12}>
        <List subheader={<h4>Items</h4>} className={classes.root}>
          <ListItem>
            <ListItemText primary="adasd" />
            <ListItemSecondaryAction>asdasd</ListItemSecondaryAction>
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
