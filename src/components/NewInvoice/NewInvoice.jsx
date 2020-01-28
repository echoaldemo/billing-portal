import React, { useState } from "react";
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
  TextField,
  Collapse
} from "@material-ui/core";
import { Close, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
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

const NewInvoice = ({ open = false, handleOpen, handleClose }) => {
  const classes = useStyles();
  const [selectInputs, setSelectInputs] = useState({
    company: " ",
    campaign: " ",
    billingPeriod: " "
  });
  const [billableHours, setBillableHours] = useState({
    name: "Billable hours",
    qty: "",
    rate: "",
    amt: ""
  });
  const [performance, setPerformance] = useState({
    name: "Performance",
    qty: "",
    rate: "",
    amt: ""
  });
  const [did, setDID] = useState({
    name: "DID",
    qty: "",
    rate: "",
    amt: ""
  });
  const [collapse, setCollapse] = useState(false);

  const handleSelectChange = (event) => {
    setSelectInputs({
      ...selectInputs,
      [event.target.name]: event.target.value
    });
  };
  const handleBillableHoursChange = (e, label) => {
    let amt;
    setBillableHours({ ...billableHours, [label]: e.target.value });
    if (label !== "amt") {
      amt = (billableHours.qty || 0) * (billableHours.rate || 0);
    }
    console.log(amt);
  };
  const handlePerformanceChange = (e, label) => {
    setPerformance({ ...performance, [label]: e.target.value });
  };
  const handleDIDsChange = (e, label) => {
    setDID({ ...did, [label]: e.target.value });
  };

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
            New Manual Invoice
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
              name="company"
              value={selectInputs.company}
              variant="outlined"
              onChange={(e) => handleSelectChange(e)}
              fullWidth
            >
              <MenuItem value=" ">Select company</MenuItem>
              <MenuItem value="1">Company 1</MenuItem>
              <MenuItem value="2">Company 2</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3}>
            <InputLabel id="label1">Campaign</InputLabel>
            <Select
              labelId="label1"
              name="campaign"
              value={selectInputs.campaign}
              variant="outlined"
              onChange={(e) => handleSelectChange(e)}
              fullWidth
            >
              <MenuItem value=" ">Select campaign</MenuItem>
              <MenuItem value="1">campaign 1</MenuItem>
              <MenuItem value="2">campaign 2</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3}>
            <InputLabel id="label1">Billing Period</InputLabel>
            <Select
              labelId="label1"
              name="billingPeriod"
              variant="outlined"
              value={selectInputs.billingPeriod}
              onChange={(e) => handleSelectChange(e)}
              fullWidth
            >
              <MenuItem value=" ">Select billing period</MenuItem>
              <MenuItem value="1">Monthly</MenuItem>
              <MenuItem value="2">Weekly</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center"
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  fontSize: 28
                }}
              >
                TOTAL
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 32
                }}
              >
                &#36;00.00
              </span>
            </div>
          </Grid>
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
          <Grid item xs={6} className={classes.head}>
            Name
          </Grid>
          <Grid item xs={2} className={classes.head}>
            Quantity
          </Grid>
          <Grid item xs={2} className={classes.head}>
            Rate
          </Grid>
          <Grid item xs={2} className={classes.head}>
            Amount
          </Grid>
        </Grid>

        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={6}>
            <TextField
              placeholder="Item name"
              value={billableHours.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="number of hours"
              inputProps={{
                value: billableHours.qty
              }}
              onChange={(e) => handleBillableHoursChange(e, "qty")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per hour"
              inputProps={{
                value: billableHours.rate
              }}
              onChange={(e) => handleBillableHoursChange(e, "rate")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value: billableHours.amt
              }}
              onChange={(e) => handleBillableHoursChange(e, "amt")}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={6}>
            <TextField
              placeholder="Item name"
              value={performance.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="number of interactions"
              inputProps={{
                value: performance.qty
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per interactions"
              inputProps={{
                value: performance.rate
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value: performance.amt
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={6}>
            <TextField placeholder="Item name" value={did.name} fullWidth />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="total DID"
              inputProps={{
                value: did.qty
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per DID"
              inputProps={{
                value: did.rate
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value: did.amt
              }}
              fullWidth
            />
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

        <div
          style={{ padding: "30px 0", display: "flex", alignItems: "center" }}
        >
          <Typography variant="h5">Additional fees</Typography>
          {collapse ? (
            <KeyboardArrowUp onClick={() => setCollapse(false)} />
          ) : (
            <KeyboardArrowDown onClick={() => setCollapse(true)} />
          )}
        </div>
        <Collapse in={collapse}>
          <Grid
            container
            spacing={1}
            xs={12}
            style={{ marginBottom: 30, boxSizing: "border-box" }}
          >
            <Grid item xs={6} className={classes.head}>
              Name
            </Grid>
            <Grid item xs={2} className={classes.head}>
              Quantity
            </Grid>
            <Grid item xs={2} className={classes.head}>
              Rate
            </Grid>
            <Grid item xs={2} className={classes.head}>
              Amount
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            xs={12}
            style={{ marginBottom: 30, boxSizing: "border-box" }}
          >
            <Grid item xs={6}>
              <TextField
                placeholder="Item name"
                value="Litigator Scrubbing(optional)"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder="number of hours" fullWidth />
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder="cost per hour" fullWidth />
            </Grid>
            <Grid item xs={2}>
              <TextField placeholder="Amount" fullWidth />
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
        </Collapse>
      </form>
    </Dialog>
  );
};

export default NewInvoice;
