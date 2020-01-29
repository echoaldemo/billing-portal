/* eslint-disable */
import React, { useState, useEffect } from "react";
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
  const [ls, setLS] = useState({
    name: "Litigator Scrubbing",
    qty: "",
    rate: "",
    amt: ""
  });
  const [merchantFees, setMerchantFees] = useState({
    name: "Merchant Fees",
    qty: "",
    rate: "",
    amt: ""
  });
  const [total, setTotal] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [extraItemsTotal, setExtraItemsTotal] = useState(0);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    getItemsTotal();
    getExtraItemsTotal();
  });

  const handleSelectChange = (event) => {
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
  const handleLSChange = (e, label) => {
    setLS({ ...ls, [label]: e.target.value });
  };
  const handleMerchantFees = (e, label) => {
    setMerchantFees({ ...merchantFees, [label]: e.target.value });
  };
  const handleTotalAmount = (key) => {
    if (key === "1") {
      let amt = (billableHours.qty || 0) * (billableHours.rate || 0);
      setBillableHours({ ...billableHours, amt });
    } else if (key === "2") {
      let amt = (performance.qty || 0) * (performance.rate || 0);
      setPerformance({ ...performance, amt });
    } else if (key === "3") {
      let amt = (did.qty || 0) * (did.rate || 0);
      setDID({ ...did, amt });
    } else if (key === "4") {
      let amt = (ls.qty || 0) * (ls.rate || 0);
      setLS({ ...ls, amt });
    }
  };

  const getItemsTotal = () => {
    let arr = [];
    arr.push(billableHours.amt ? parseInt(billableHours.amt) : 0);
    arr.push(performance.amt ? parseInt(performance.amt) : 0);
    arr.push(did.amt ? parseInt(did.amt) : 0);
    const it = arr.reduce((total, value) => total + value);
    setTotal(parseInt(it) + parseInt(extraItemsTotal));
    setItemsTotal(it);
  };
  const getExtraItemsTotal = () => {
    let arr = [];
    arr.push(ls.amt ? parseInt(ls.amt) : 0);
    arr.push(merchantFees.amt ? parseInt(merchantFees.amt) : 0);
    const et = arr.reduce((total, value) => total + value);
    setTotal(parseInt(et) + parseInt(itemsTotal));
    setExtraItemsTotal(et);
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

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
                {formatter.format(total)}
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
              onBlur={() => handleTotalAmount("1")}
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
              onBlur={() => handleTotalAmount("1")}
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
              onFocus={() => handleTotalAmount("1")}
              onBlur={() => handleTotalAmount("1")}
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
              onBlur={() => handleTotalAmount("2")}
              onChange={(e) => handlePerformanceChange(e, "qty")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per interactions"
              inputProps={{
                value: performance.rate
              }}
              onBlur={() => handleTotalAmount("2")}
              onChange={(e) => handlePerformanceChange(e, "rate")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value: performance.amt
              }}
              onFocus={() => handleTotalAmount("2")}
              onBlur={() => handleTotalAmount("2")}
              onChange={(e) => handlePerformanceChange(e, "amt")}
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
              onBlur={() => handleTotalAmount("3")}
              onChange={(e) => handleDIDsChange(e, "qty")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per DID"
              inputProps={{
                value: did.rate
              }}
              onBlur={() => handleTotalAmount("3")}
              onChange={(e) => handleDIDsChange(e, "rate")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value: did.amt
              }}
              onFocus={() => handleTotalAmount("3")}
              onBlur={() => handleTotalAmount("3")}
              onChange={(e) => handleDIDsChange(e, "amt")}
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
            {formatter.format(itemsTotal)}
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
                value={ls.name + "(optional)"}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="number of hours"
                onBlur={() => handleTotalAmount("4")}
                inputProps={{
                  value: ls.qty
                }}
                onChange={(e) => handleLSChange(e, "qty")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="cost per hour"
                onBlur={() => handleTotalAmount("4")}
                inputProps={{
                  value: ls.rate
                }}
                onChange={(e) => handleLSChange(e, "rate")}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="Amount"
                onFocus={() => handleTotalAmount("4")}
                inputProps={{
                  value: ls.amt
                }}
                onBlur={() => handleTotalAmount("4")}
                onChange={(e) => handleLSChange(e, "amt")}
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
                value="Merchant fees"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="Amount"
                inputProps={{
                  value: merchantFees.amt
                }}
                onChange={(e) => handleMerchantFees(e, "amt")}
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
              {formatter.format(extraItemsTotal)}
            </span>
          </div>
        </Collapse>
      </form>
    </Dialog>
  );
};

export default NewInvoice;
