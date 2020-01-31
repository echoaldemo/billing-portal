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
  Collapse,
  InputAdornment,
  Checkbox,
  ListItemText
} from "@material-ui/core";
import { Close, KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { getMock, post, getAPI } from "../../../utils/api";

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";


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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewInvoice = ({ open = false, handleOpen, handleClose }) => {
  const classes = useStyles();
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [selectInputs, setSelectInputs] = useState({
    company: " ",
    campaign: [],
    billingType: " ",
    billingPeriod: date
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
  const [litigator, setLitigator] = useState({
    name: "Litigator Scrubbing",
    qty: "",
    rate: "",
    amt: ""
  });
  const [merchant, setMerchant] = useState("");
  const [collapse, setCollapse] = useState(false);
  const [activeCompanies, setActiveCompanies] = useState([]);
  const [activeCompaniesLoading, setActiveCompaniesLoading] = useState(true);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [activeCampaignsLoading, setActiveCampaignsLoading] = useState(true);

  useEffect(() => {
    getActiveCompainies();
  }, []);

  const getActiveCompainies = () => {
    getAPI("/identity/company/list?active=true").then(res => {
      setActiveCompanies(res.data);
      setActiveCompaniesLoading(false);
    });
  };
  const getActiveCampaigns = uuid => {
    if (uuid === " ") {
      return;
    }
    getAPI(`/identity/campaign/list?company=${uuid}&active=true`).then(res => {
      console.log(res.data.map(d => d.uuid));
      setSelectInputs({
        ...selectInputs,
        campaign: res.data.map(d => d.uuid),
        company: uuid
      });
      setActiveCampaigns(res.data);
      setActiveCampaignsLoading(false);
    });
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });

  const handleSelectChange = event => {
    if (event.target.name === "company") {
      getActiveCampaigns(event.target.value);
    } else {
      setSelectInputs({
        ...selectInputs,
        [event.target.name]: event.target.value
      });
    }
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
  const handleLitigator = (e, label) => {
    setLitigator({ ...litigator, [label]: e.target.value });
  };
  const handleDateChange = date => {
    setSelectInputs({ ...selectInputs, billingPeriod: date });
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
  const getAddSubtotal = () => {
    const total = litigator.qty * litigator.rate + merchant;
    if (total) return formatter.format(total);
    else return "0.00";
  };

  const getTotal = () => {
    const total =
      billableHours.qty * billableHours.rate +
      performance.qty * performance.rate +
      did.qty * did.rate +
      litigator.qty * litigator.rate +
      merchant;
    if (total) return formatter.format(total);
    else return "0.00";
  };

  const createInvoice = () => {
    let dt = new Date(selectInputs.billingPeriod);
    dt.setMonth(dt.getMonth() + 1);
    const dueDate = dt.toLocaleDateString().replace(/\//g, "-");

    const company = activeCompanies.filter(
      item => item.uuid === selectInputs.company
    )[0].name;

    const campaigns = activeCampaigns
      .filter(item => selectInputs.campaign.indexOf(item.uuid) !== -1)
      .map(data => data.name)
      .join(", ");

    const total =
      billableHours.qty * billableHours.rate +
      performance.qty * performance.rate +
      did.qty * did.rate;
    const data = {
      docNumber: "1070",
      invoiceType: "Automatic",
      company,
      campaigns,
      startDate: dt,
      dueDate,
      total,
      Line: [
        {
          LineNum: 1,
          Amount: billableHours.qty * billableHours.rate,
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: "NON"
            },
            ItemRef: {
              name: "Billable Hours",
              value: "21"
            },
            Qty: billableHours.qty,
            UnitPrice: billableHours.rate
          },
          Id: "1",
          DetailType: "SalesItemLineDetail",
          Description: "amount of services rendered in hours"
        },
        {
          LineNum: 2,
          Amount: performance.qty * performance.rate,
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: "NON"
            },
            ItemRef: {
              name: "Performance",
              value: "22"
            },
            Qty: performance.qty,
            UnitPrice: performance.rate
          },
          Id: "2",
          DetailType: "SalesItemLineDetail"
        },
        {
          LineNum: 3,
          Amount: did.qty * did.rate,
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: "NON"
            },
            ItemRef: {
              name: "DID",
              value: "23"
            },
            Qty: did.qty,
            UnitPrice: did.rate
          },
          Id: "3",
          DetailType: "SalesItemLineDetail",
          Description: "amount of DIDs used"
        },
        {
          DetailType: "SubTotalLineDetail",
          Amount: total,
          SubTotalLineDetail: {}
        }
      ]
    };
    post("/api/create_pending", data)
      .then(res => {
        handleClose()
      })
      .catch(err => {
        console.log(err);
      });
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
            New Automatic Invoice
          </Typography>
          <Button autoFocus color="inherit" onClick={createInvoice}>
            save
          </Button>
        </Toolbar>
      </AppBar>

      <form className={classes.form}>
        <Grid container spacing={2} xs={12} style={{ marginBottom: 10 }}>
          <Grid item xs={3}>
            <InputLabel id="label">Company</InputLabel>
            <Select
              labelId="label"
              name="company"
              value={selectInputs.company}
              variant="outlined"
              onChange={e => handleSelectChange(e)}
              disabled={activeCompaniesLoading}
              MenuProps={MenuProps}
              fullWidth
            >
              <MenuItem value=" ">Select company</MenuItem>
              {!activeCompaniesLoading &&
                activeCompanies.map((c, i) => (
                  <MenuItem value={c.uuid} key={i}>
                    {c.name}
                  </MenuItem>
                ))}
            </Select>
          </Grid>

          <Grid item xs={3}>
            <InputLabel id="label1">Campaign</InputLabel>
            <Select
              labelId="label1"
              id="label1"
              variant="outlined"
              name="campaign"
              multiple
              value={selectInputs.campaign}
              onChange={e => {
                handleSelectChange(e);
              }}
              renderValue={selected =>
                selected.length === 0
                  ? "Select campaign"
                  : selected.length === activeCampaigns.length
                  ? "All"
                  : selected
                      .map(s =>
                        activeCampaigns
                          .filter(a => a.uuid === s)
                          .map(data => data.name)
                      )
                      .join(", ")
              }
              disabled={activeCampaignsLoading}
              displayEmpty
              fullWidth
            >
              {!activeCampaignsLoading &&
                activeCampaigns.map((name, i) => (
                  <MenuItem key={i} value={name.uuid}>
                    <Checkbox
                      checked={selectInputs.campaign.indexOf(name.uuid) > -1}
                    />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
            </Select>
          </Grid>

          <Grid item xs={3}>
            <InputLabel id="label1">Billing Type</InputLabel>
            <Select
              labelId="label1"
              name="billingType"
              variant="outlined"
              value={selectInputs.billingType}
              onChange={e => handleBillingChange(e)}
              fullWidth
            >
              <MenuItem value=" ">Select billing type</MenuItem>
              <MenuItem value="1">Monthly</MenuItem>
              <MenuItem value="2">Weekly</MenuItem>
            </Select>
          </Grid>

          <Grid item xs={3}>
            <InputLabel id="label1">Billing Period</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="billingPeriod"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                value={selectInputs.billingPeriod}
                onChange={handleDateChange}
                inputVariant="outlined"
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={12}>
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
                {getTotal()}
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
                    ? formatter.format(billableHours.qty * billableHours.rate)
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
                value: performance.qty,
                readOnly: true
              }}
              onChange={e => handlePerformanceChange(e, "qty")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per interactions"
              inputProps={{
                value: performance.rate,
                readOnly: true
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
                    ? formatter.format(performance.qty * performance.rate)
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
                value: did.qty,
                readOnly: true
              }}
              onChange={e => handleDIDsChange(e, "qty")}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per DID"
              inputProps={{
                value: did.rate,
                readOnly: true
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
                  did.qty !== "" && did.rate !== ""
                    ? formatter.format(did.qty * did.rate)
                    : "",
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
              <TextField value={litigator.name} fullWidth />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="number of hours"
                onChange={e => handleLitigator(e, "qty")}
                fullWidth
                inputProps={{
                  value: litigator.qty
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="cost per hour"
                onChange={e => handleLitigator(e, "rate")}
                fullWidth
                inputProps={{
                  value: litigator.rate
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="Amount"
                inputProps={{
                  value:
                    litigator.qty !== "" && litigator.rate !== ""
                      ? formatter.format(litigator.qty * litigator.rate)
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
              <TextField
                placeholder="Item name"
                value="Merchant Fees"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <TextField
                onChange={e => setMerchant(parseFloat(e.target.value))}
                inputProps={{
                  value: merchant
                    ? (Math.round(merchant * 100) / 100).toFixed(2)
                    : "",
                  align: "right"
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  )
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
              {getAddSubtotal()}
            </span>
          </div>
        </Collapse>
      </form>
    </Dialog>
  );
};

export default NewInvoice;
