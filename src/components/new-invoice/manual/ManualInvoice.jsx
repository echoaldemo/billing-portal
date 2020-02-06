/* eslint-disable */
import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  Button,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
  TextField,
  Collapse,
  Checkbox,
  ListItemText,
  Popover
} from "@material-ui/core";
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowDropDown
} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { post, get } from "utils/api";
import { StateContext } from "context/StateContext";
import { mockCompanies, mockCampaigns } from "../mock";
import { useStyles, MenuProps } from "../styles";

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const defaultBillableHours = {
  name: "Billable hours",
  qty: "",
  rate: "",
  amt: ""
};
const defaultPerformance = {
  name: "Performance",
  qty: "",
  rate: "",
  amt: ""
};
const defaultDID = {
  name: "DID",
  qty: "",
  rate: "",
  amt: ""
};
const defaultLS = {
  name: "Litigator Scrubbing",
  qty: "",
  rate: "",
  amt: ""
};
const defaultMerchantFees = {
  name: "Merchant Fees",
  company: "",
  campaign: [],
  billingType: " ",
  billingPeriod: date
};

const defaultSelectInputs = {
  company: "",
  campaign: [],
  billingType: " ",
  billingPeriod: date
};

const NewInvoice = ({ handleClose, renderLoading, duplicate }) => {
  const classes = useStyles();
  const { setLoading, setData } = React.useContext(StateContext);
  const [selectInputs, setSelectInputs] = useState(defaultSelectInputs);
  const [billableHours, setBillableHours] = useState(defaultBillableHours);
  const [performance, setPerformance] = useState(defaultPerformance);
  const [did, setDID] = useState(defaultDID);
  const [ls, setLS] = useState(defaultLS);
  const [merchantFees, setMerchantFees] = useState(defaultMerchantFees);
  const [total, setTotal] = useState(0);
  const [itemsTotal, setItemsTotal] = useState(0);
  const [extraItemsTotal, setExtraItemsTotal] = useState(0);
  const [collapse, setCollapse] = useState(false);
  const [activeCompanies, setActiveCompanies] = useState([]);
  const [activeCompaniesLoading, setActiveCompaniesLoading] = useState(true);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [activeCampaignsLoading, setActiveCampaignsLoading] = useState(true);
  const [state, setState] = useState({
    anchorEl: null
  });

  useEffect(() => {
    getItemsTotal();
    getExtraItemsTotal();
  });

  useEffect(() => {
    if (typeof duplicate !== "undefined") {
      getActiveCampaigns(duplicate.company.uuid);
    }
  }, [activeCompanies]);

  useEffect(() => {
    if (typeof duplicate !== "undefined") {
      setSelectInputs({
        ...defaultSelectInputs,
        company: duplicate.company.uuid,
        billingType: duplicate.billingType,
        campaign: duplicate.campaigns.map((camp) => camp.uuid)
      });
    }
  }, [activeCampaigns]);

  useEffect(() => {
    getActiveCompainies();
    if (typeof duplicate !== "undefined") {
      if (
        typeof duplicate.Line[0] !== "undefined" &&
        typeof duplicate.Line[0].SubTotalLineDetail === "undefined"
      ) {
        setBillableHours({
          ...defaultBillableHours,
          qty: duplicate.Line[0].SalesItemLineDetail.Qty,
          rate: duplicate.Line[0].SalesItemLineDetail.ItemRef.value,
          amt: duplicate.Line[0].Amount
        });
      }
      if (
        typeof duplicate.Line[1] !== "undefined" &&
        typeof duplicate.Line[1].SubTotalLineDetail === "undefined"
      ) {
        setPerformance({
          ...defaultPerformance,
          qty: duplicate.Line[1].SalesItemLineDetail.Qty,
          rate: duplicate.Line[1].SalesItemLineDetail.ItemRef.value,
          amt: duplicate.Line[1].Amount
        });
      }
      if (
        typeof duplicate.Line[2] !== "undefined" &&
        typeof duplicate.Line[2].SubTotalLineDetail === "undefined"
      ) {
        setDID({
          ...defaultDID,
          qty: duplicate.Line[2].SalesItemLineDetail.Qty,
          rate: duplicate.Line[2].SalesItemLineDetail.ItemRef.value,
          amt: duplicate.Line[2].Amount
        });
      }
    }
  }, []);

  const getActiveCompainies = () => {
    setTimeout(() => {
      setActiveCompanies(mockCompanies);
      setActiveCompaniesLoading(false);
    }, 1000);
  };
  const getActiveCampaigns = (uuid) => {
    if (uuid === "") {
      setActiveCampaignsLoading(true);
      setSelectInputs({ ...selectInputs, company: uuid, campaign: [] });
      return;
    }
    setTimeout(() => {
      const campaigns = mockCampaigns.filter((c) => c.company === uuid);
      console.log(campaigns);
      setSelectInputs({
        ...selectInputs,
        campaign: campaigns.map((d) => d.uuid),
        company: uuid
      });
      setActiveCampaigns(campaigns);
      setActiveCampaignsLoading(false);
    }, 1000);
  };

  const appendLeadingZeroes = (n) => {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  };
  const handleSave = () => {
    if (
      !total ||
      !Boolean(selectInputs.company) ||
      !Boolean(selectInputs.campaign.length) ||
      selectInputs.billingType === " "
    ) {
      return;
    }
    setLoading(true);
    renderLoading();
    let line = [];
    let dt = new Date(selectInputs.billingPeriod);

    let startDate =
      dt.getFullYear() +
      "-" +
      appendLeadingZeroes(dt.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(dt.getDate());

    if (selectInputs.billingType === "1") dt.setMonth(dt.getMonth() + 1);
    else dt.setDate(dt.getDate() + 7);

    const dueDate =
      dt.getFullYear() +
      "-" +
      appendLeadingZeroes(dt.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(dt.getDate());

    billableHours.amt &&
      line.push({
        DetailType: "SalesItemLineDetail",
        Amount: billableHours.amt,
        SalesItemLineDetail: {
          ItemRef: {
            value: "21",
            name: "Billable hours"
          },
          Qty: billableHours.qty || 0,
          UnitPrice: billableHours.rate || 0
        }
      });
    performance.amt &&
      line.push({
        DetailType: "SalesItemLineDetail",
        Amount: performance.amt,
        SalesItemLineDetail: {
          ItemRef: {
            value: "22",
            name: "Performance"
          },
          Qty: performance.qty || 0,
          UnitPrice: performance.rate || 0
        }
      });
    did.amt &&
      line.push({
        DetailType: "SalesItemLineDetail",
        Amount: did.amt,
        SalesItemLineDetail: {
          ItemRef: {
            value: "23",
            name: "DID"
          },
          Qty: did.qty || 0,
          UnitPrice: did.rate || 0
        }
      });
    line.push({
      DetailType: "SubTotalLineDetail",
      Amount: total,
      SubTotalLineDetail: {}
    });
    if (line.length > 1) {
      const company = activeCompanies.filter(
        (i) => i.uuid === selectInputs.company
      );
      const campaigns = activeCampaigns.filter(
        (item) => selectInputs.campaign.indexOf(item.uuid) !== -1
      );
      post(`/api/create_pending`, {
        docNumber: Math.floor(Math.random() * 9999),
        Line: line,
        total,
        invoiceType: "Manual",
        company: company[0],
        campaigns: campaigns,
        billingType: selectInputs.billingType,
        startDate,
        dueDate,
        total
      }).then((res) => {
        get("/api/pending/list")
          .then((res) => {
            setLoading(false);
            setData(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        setBillableHours(defaultBillableHours);
        setPerformance(defaultPerformance);
        setDID(defaultDID);
        setLS(defaultLS);
        setMerchantFees(defaultMerchantFees);
        setSelectInputs(defaultSelectInputs);
      });
    }
  };
  const handleSaveAndApprove = () => {
    if (
      !total ||
      !Boolean(selectInputs.company) ||
      !Boolean(selectInputs.campaign.length)
    ) {
      return;
    }
    renderLoading();
    let line = [];

    billableHours.amt &&
      line.push({
        DetailType: "SalesItemLineDetail",
        Amount: billableHours.amt,
        SalesItemLineDetail: {
          ItemRef: {
            value: "21",
            name: "Billable hours"
          },
          Qty: billableHours.qty || 0,
          UnitPrice: billableHours.rate || 0
        }
      });
    performance.amt &&
      line.push({
        DetailType: "SalesItemLineDetail",
        Amount: performance.amt,
        SalesItemLineDetail: {
          ItemRef: {
            value: "22",
            name: "Performance"
          },
          Qty: performance.qty || 0,
          UnitPrice: performance.rate || 0
        }
      });
    did.amt &&
      line.push({
        DetailType: "SalesItemLineDetail",
        Amount: did.amt,
        SalesItemLineDetail: {
          ItemRef: {
            value: "23",
            name: "DID"
          },
          Qty: did.qty || 0,
          UnitPrice: did.rate || 0
        }
      });
    line.push({
      DetailType: "SubTotalLineDetail",
      Amount: total,
      SubTotalLineDetail: {}
    });
    if (line.length > 1) {
      const company = activeCompanies.filter(
        (i) => i.uuid === selectInputs.company
      );
      post(`/api/invoice`, {
        Line: line,
        CustomerRef: {
          value: company[0].qb_id
        }
      }).then((res) => {
        setBillableHours(defaultBillableHours);
        setPerformance(defaultPerformance);
        setDID(defaultDID);
        setLS(defaultLS);
        setMerchantFees(defaultMerchantFees);
        setSelectInputs(defaultSelectInputs);
      });
    }
  };

  const handleSelectChange = (event) => {
    if (event.target.name === "company") {
      getActiveCampaigns(event.target.value);
    } else {
      setSelectInputs({
        ...selectInputs,
        [event.target.name]: event.target.value
      });
    }
  };
  const handleDateChange = (date) => {
    setSelectInputs({ ...selectInputs, billingPeriod: date });
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
  const formatter2 = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2
  });
  const handleShowMore = (e) => {
    setState({
      ...state,
      anchorEl: e.currentTarget
    });
  };
  const handleCloseMore = () => {
    setState({
      ...state,
      anchorEl: null
    });
  };

  return (
    <>
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
          <Button
            classes={{ root: classes.save, disabled: classes.save_disabled }}
            onClick={() => handleSave()}
            color="inherit"
          >
            save
          </Button>
          <Button
            classes={{ root: classes.more }}
            color="inherit"
            onClick={handleShowMore}
          >
            <ArrowDropDown />
          </Button>
          <Popover
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            onClose={handleCloseMore}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <MenuItem style={{ padding: "15px 20px" }}>Save and send</MenuItem>
            <MenuItem
              style={{ padding: "15px 20px" }}
              onClick={() => handleSaveAndApprove()}
            >
              Save and approve
            </MenuItem>
          </Popover>
        </Toolbar>
      </AppBar>

      <form className={classes.form}>
        <Grid container spacing={2} style={{ marginBottom: 30 }}>
          <Grid item xs={3}>
            <InputLabel id="label">Company</InputLabel>
            <Select
              labelId="label"
              name="company"
              value={selectInputs.company}
              variant="outlined"
              onChange={(e) => handleSelectChange(e)}
              disabled={activeCompaniesLoading}
              MenuProps={MenuProps}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">Select company</MenuItem>
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
              onChange={(e) => {
                handleSelectChange(e);
              }}
              renderValue={(selected) =>
                selected.length === 0
                  ? "Select campaign"
                  : selected.length === activeCampaigns.length
                  ? "All"
                  : selected
                      .map((s) =>
                        activeCampaigns
                          .filter((a) => a.uuid === s)
                          .map((data) => data.name)
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

          <Grid item xs={2}>
            <InputLabel id="label1">Billing Period</InputLabel>
            <Select
              labelId="label1"
              name="billingType"
              variant="outlined"
              value={selectInputs.billingType}
              onChange={(e) => handleSelectChange(e)}
              fullWidth
            >
              <MenuItem value=" ">Select billing type</MenuItem>
              <MenuItem value="1">Monthly</MenuItem>
              <MenuItem value="2">Weekly</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
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

          <Grid item xs={2}>
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
                // onBlur={() => handleTotalAmount("4")}
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
    </>
  );
};

export default NewInvoice;
