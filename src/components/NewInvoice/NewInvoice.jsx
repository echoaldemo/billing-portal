import React from "react";
import {
  Dialog,
  AppBar,
  IconButton,
  Button,
  Typography,
  Toolbar,
  Slide,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
  TextField
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    backgroundColor: "#5F7D98"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    padding: 30
  },
  head: {
    backgroundColor: "#5F7D98",
    border: "1px solid #fff",
    color: "#fff"
  },
  dialog: {
    minWidth: "80vw"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewInvoice = ({ open, handleOpen, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      maxWidth="sm"
      onClose={handleClose}
      classes={{ paperWidthSm: classes.dialog }}
      TransitionComponent={Transition}
    >
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
            New Invoice
          </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <form className={classes.form}>
        <Grid container spacing={2} xs={12} style={{ marginBottom: 30 }}>
          <Grid item xs={3}>
            <InputLabel id="label">Company</InputLabel>
            <Select
              labelId="label"
              id="select"
              value=" "
              variant="outlined"
              fullWidth
            >
              <MenuItem value=" ">no selected</MenuItem>
              <MenuItem value="10">Company 1</MenuItem>
              <MenuItem value="20">Company 2</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <InputLabel id="label1">Campaign</InputLabel>
            <Select
              labelId="label1"
              id="select1"
              value=" "
              variant="outlined"
              fullWidth
            >
              <MenuItem value=" ">no selected</MenuItem>
              <MenuItem value="10">campaign 1</MenuItem>
              <MenuItem value="20">campaign 2</MenuItem>
            </Select>
          </Grid>
          <Grid item></Grid>
          <Grid item></Grid>
        </Grid>
        <Divider />
        <div style={{ padding: "30px 0" }}>
          <Typography variant="h5">Items</Typography>
        </div>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={3} className={classes.head}>
            Name
          </Grid>
          <Grid item xs={6} className={classes.head}>
            Description
          </Grid>
          <Grid item xs={3} className={classes.head}>
            Value
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={3}>
            <TextField
              placeholder="Item name"
              value="Billable hours"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField placeholder="Item description" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField placeholder="Value" fullWidth />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={3}>
            <TextField placeholder="Item name" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField placeholder="Item description" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField placeholder="Value" fullWidth />
          </Grid>
        </Grid>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <span>SUBTOTAL</span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 20
            }}
          >
            &#36;00.00
          </span>
        </div>
        <Divider />

        <div style={{ padding: "30px 0" }}>
          <Typography variant="h5">Additional fees</Typography>
        </div>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={3} className={classes.head}>
            Name
          </Grid>
          <Grid item xs={6} className={classes.head}>
            Description
          </Grid>
          <Grid item xs={3} className={classes.head}>
            Value
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={3}>
            <TextField placeholder="Item name" fullWidth />
          </Grid>
          <Grid item xs={6}>
            <TextField placeholder="Item description" fullWidth />
          </Grid>
          <Grid item xs={3}>
            <TextField placeholder="Value" fullWidth />
          </Grid>
        </Grid>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <span>SUBTOTAL</span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 20
            }}
          >
            &#36;00.00
          </span>
        </div>
      </form>
    </Dialog>
  );
};

export default NewInvoice;
