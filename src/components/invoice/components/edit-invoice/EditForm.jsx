/* eslint-disable */
import React, { useState } from "react";
import {
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
import { StateContext } from "context/StateContext"
import { getMock } from "utils/api";

const useStyles = makeStyles(theme => ({
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

const EditForm = () => {
  const { state } = React.useContext(StateContext)

  const classes = useStyles();
  const [selectInputs, setSelectInputs] = useState({
    company: "1",
    campaign: "2",
    billingPeriod: "1"
  });
  const [billableHours, setBillableHours] = useState({
    name: "Billable hours",
    qty: "2.0",
    rate: "12.0",
    amt: "1.0"
  });
  const [performance, setPerformance] = useState({
    name: "Performance",
    qty: "1",
    rate: "1.0",
    amt: "2.0"
  });
  const [did, setDID] = useState({
    name: "DID",
    qty: "1",
    rate: "2.0",
    amt: "23.3"
  });
  const [litigator, setLitigator] = useState({
    name: "Litigator Scrubbing",
    qty: "1",
    rate: "2",
    amt: "3.2"
  });
  const [merchant, setMerchant] = useState({
    name: "Merchant Fees",
    qty: "3",
    rate: "21",
    amt: "12.0"
  });
  const [collapse, setCollapse] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  const handleSelectChange = event => {
    setSelectInputs({
      ...selectInputs,
      [event.target.name]: event.target.value
    });
  };
  const handleBillableHoursChange = (e, label) => {
    setBillableHours({ ...billableHours, [label]: e.target.value });
  };
  const handlePerformanceChange = (e, label) => {
    setPerformance({ ...performance, [label]: e.target.value });
  };
  const handleDIDsChange = (e, label) => {
    setDID({ ...did, [label]: e.target.value });
  };

  const handleBillingChange = event => {
    setSelectInputs({
      ...selectInputs,
      [event.target.name]: event.target.value
    });
    getMock("/company1", {}).then(res => {
      const mock = res.data[Math.floor(Math.random() * 10)];
      setBillableHours({
        ...billableHours,
        qty: mock.billable_hours,
        rate: mock.bill_rate
      });
      setPerformance({
        ...performance,
        qty: mock.performance,
        rate: mock.performance_rate
      });
      setDID({
        ...did,
        qty: mock.did,
        rate: mock.did_rate
      });
    });
  };
  const getItemSubtotal = () => {
    const total =
      billableHours.qty * billableHours.rate +
      performance.qty * performance.rate +
      did.qty * did.rate;
    if (total) return formatter.format(total);
    else return "0.00";
  };



  return (

    <React.Fragment>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            // onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Edit Invoice
          </Typography>
          <Button autoFocus color="inherit" onClick={() => { return null }}>
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
              onChange={e => handleSelectChange(e)}
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
              onChange={e => handleSelectChange(e)}
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
              onChange={e => handleBillingChange(e)}
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
                {getItemSubtotal()}
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
              number
              placeholder="number of hours"
              inputProps={{
                value: billableHours.qty
              }}
              onChange={e => handleBillableHoursChange(e, "qty")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per hour"
              inputProps={{
                value: billableHours.rate
              }}
              onChange={e => handleBillableHoursChange(e, "rate")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value:
                  billableHours.qty !== "" && billableHours.rate !== ""
                    ? billableHours.qty * billableHours.rate
                    : "",
                readOnly: true
              }}
              onChange={e => handleBillableHoursChange(e, "amt")}
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
              onChange={e => handlePerformanceChange(e, "qty")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per interactions"
              inputProps={{
                value: performance.rate
              }}
              onChange={e => handlePerformanceChange(e, "rate")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value:
                  performance.qty !== "" && performance.rate !== ""
                    ? performance.qty * performance.rate
                    : "",
                readOnly: true
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
              onChange={e => handleDIDsChange(e, "qty")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per DID"
              inputProps={{
                value: did.rate
              }}
              onChange={e => handleDIDsChange(e, "rate")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value:
                  did.qty !== "" && did.rate !== "" ? did.qty * did.rate : "",
                readOnly: true
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
            {getItemSubtotal()}
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
                value="Litigator Scrubbing"
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
          <Grid
            container
            spacing={1}
            xs={12}
            style={{ marginBottom: 30, boxSizing: "border-box" }}
          >
            <Grid item xs={6}>
              <TextField
                placeholder="Item name"
                value="Merchant Fees"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
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
              &#36;0.00
            </span>
          </div>
        </Collapse>
      </form>
    </React.Fragment>
  );
};

export default EditForm;
