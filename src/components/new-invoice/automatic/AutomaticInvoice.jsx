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
  InputAdornment,
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

import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { StateContext } from "context/StateContext";
import { useStyles, MenuProps } from "../styles";
import { getMock, post, get } from "utils/api";
import { mockCompanies, mockCampaigns } from "../mock";

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
const defaultSelectInputs = {
  company: " ",
  campaign: [],
  billingType: " ",
  billingPeriod: date,
  taxation: " "
};

const mockTaxation = [
  { code: "5", taxrate: "7", name: "Utah", percentage: 6.1 },
  { code: "6", taxrate: "8", name: "California", percentage: 8 },
  { code: "7", taxrate: "11", name: "Mexico", percentage: 16 }
];

const NewInvoice = ({ handleClose, renderLoading, duplicate }) => {
  const { setLoading, setData } = React.useContext(StateContext);
  const classes = useStyles();

  const [selectInputs, setSelectInputs] = useState(defaultSelectInputs);
  const [billableHours, setBillableHours] = useState(defaultBillableHours);
  const [performance, setPerformance] = useState(defaultPerformance);
  const [did, setDID] = useState(defaultDID);
  const [litigator, setLitigator] = useState(defaultLS);
  const [merchant, setMerchant] = useState("");
  const [collapse, setCollapse] = useState(false);
  const [activeCompanies, setActiveCompanies] = useState([]);
  const [activeCompaniesLoading, setActiveCompaniesLoading] = useState(true);
  const [activeCampaigns, setActiveCampaigns] = useState([]);
  const [activeCampaignsLoading, setActiveCampaignsLoading] = useState(true);
  const [state, setState] = useState({
    anchorEl: null,
    tax: false,
    taxValue: ""
  });

  useEffect(() => {
    getActiveCompainies();
  }, []);

  const handleServiceChange = (event, i, label) => {
    let temp = activeCampaigns;
    temp.map((item, index) => {
      if (i === index) {
        item[label] = event.target.value;
      }
    });
    setActiveCampaigns(temp);
    setSelectInputs({ ...selectInputs });
  };

  const renderItems = () => {
    const campaigns = activeCampaigns.filter(
      item => selectInputs.campaign.indexOf(item.uuid) !== -1
    );
    const options = [
      { label: "Billable Hours", value: 1 },
      { label: "Performance", value: 2 },
      { label: "DID", value: 3 }
    ];
    return campaigns.map((campaign, i) => (
      <Grid
        container
        spacing={1}
        xs={12}
        style={{ marginBottom: 30, boxSizing: "border-box" }}
      >
        <Grid item xs={3}>
          <TextField value={campaign.name} fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField
            select
            value={campaign.service}
            fullWidth
            onChange={e => handleServiceChange(e, i, "service")}
          >
            {options.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            placeholder="number of hours"
            inputProps={{
              value: campaign.qty ? campaign.qty : " ",
              style: { textAlign: "right" }
            }}
            onChange={e => handleServiceChange(e, i, "qty")}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            placeholder="cost per hour"
            inputProps={{
              value: campaign.rate ? campaign.rate : " ",
              style: { textAlign: "right" }
            }}
            onChange={e => handleServiceChange(e, i, "rate")}
            fullWidth
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            placeholder="Amount"
            inputProps={{
              value:
                campaign.qty && campaign.rate
                  ? formatter.format(campaign.qty * campaign.rate)
                  : "",
              readOnly: true,
              style: { textAlign: "right" }
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    ));
  };

  const getActiveCompainies = () => {
    setTimeout(() => {
      setActiveCompanies(mockCompanies);
      setActiveCompaniesLoading(false);
    }, 1000);
  };
  const getActiveCampaigns = uuid => {
    if (uuid === "") {
      setActiveCampaignsLoading(true);
      setSelectInputs({ ...selectInputs, company: uuid, campaign: [] });
      return;
    }
    setTimeout(() => {
      let temp = mockCampaigns.filter(c => c.company === uuid);
      const campaigns = temp.map(item => (item = { ...item, service: 1 }));
      setSelectInputs({
        ...selectInputs,
        campaign: campaigns.map(d => d.uuid),
        company: uuid
      });
      setActiveCampaigns(campaigns);
      setActiveCampaignsLoading(false);
    }, 1000);
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
    const campaigns = activeCampaigns.filter(
      item => selectInputs.campaign.indexOf(item.uuid) !== -1
    );
    let total = 0;
    campaigns.forEach(item => {
      total += item.qty * item.rate;
    });
    /* const total =
      billableHours.qty * billableHours.rate +
      performance.qty * performance.rate +
      did.qty * did.rate;*/
    if (total) return total;
    else return "0.00";
  };
  const getAddSubtotal = () => {
    const total = litigator.qty * litigator.rate + merchant;
    if (total) return total;
    else return "0.00";
  };

  const getTotal = () => {
    const campaigns = activeCampaigns.filter(
      item => selectInputs.campaign.indexOf(item.uuid) !== -1
    );
    let total = 0;
    campaigns.forEach(item => {
      total += item.qty * item.rate;
    });
    /* const total =
      billableHours.qty * billableHours.rate +
      performance.qty * performance.rate +
      did.qty * did.rate +
      litigator.qty * litigator.rate +
      merchant; */
    if (total) return total;
    else return "0.00";
  };

  const getTax = () => {
    const tax =
      selectInputs.taxation !== " "
        ? Math.round(
            (parseFloat(selectInputs.taxation) / 100) * getItemSubtotal() * 100
          ) / 100
        : 0;
    return tax;
  };

  const getBalanceDue = () => {
    const tax = getTax();
    const total = getTotal();
    if (total) return parseFloat(total) + tax;
    else return "0.00";
  };
  const appendLeadingZeroes = n => {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  };

  const createInvoice = type => {
    if (buttonStatus()) {
      setLoading(true);
      renderLoading();
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

      const company = activeCompanies.filter(
        item => item.uuid === selectInputs.company
      )[0];

      const campaigns = activeCampaigns.filter(
        item => selectInputs.campaign.indexOf(item.uuid) !== -1
      );
      const total = getBalanceDue();

      const taxableAmt = parseFloat(getTotal());
      const taxPercent = parseFloat(selectInputs.taxation);
      const tax = getTax();
      const taxType = mockTaxation.filter(
        item => item.percentage === taxPercent
      )[0];

      const finalLine = {
        DetailType: "SubTotalLineDetail",
        Amount: total,
        SubTotalLineDetail: {}
      };

      let data = {
        CustomerRef: {
          value: company.qb_id
        },
        TxnDate: startDate,
        DueDate: dueDate,
        Line: [
          {
            LineNum: 1,
            Amount: billableHours.qty * billableHours.rate,
            SalesItemLineDetail: {
              TaxCodeRef: {
                value: tax ? "TAX" : "NON"
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
            Description:
              campaigns[Math.floor(Math.random() * campaigns.length)].name
          },
          {
            LineNum: 2,
            Amount: performance.qty * performance.rate,
            SalesItemLineDetail: {
              TaxCodeRef: {
                value: tax ? "TAX" : "NON"
              },
              ItemRef: {
                name: "Performance",
                value: "22"
              },
              Qty: performance.qty,
              UnitPrice: performance.rate
            },
            Id: "2",
            Description:
              campaigns[Math.floor(Math.random() * campaigns.length)].name,
            DetailType: "SalesItemLineDetail"
          },
          {
            LineNum: 3,
            Amount: did.qty * did.rate,
            SalesItemLineDetail: {
              TaxCodeRef: {
                value: tax ? "TAX" : "NON"
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
            Description:
              campaigns[Math.floor(Math.random() * campaigns.length)].name
          }
        ],
        CustomerMemo: {
          value: `Wire/ACH Instructions:\nRouting 124301025\nAccount: 4134870\nBIC: AMFOUS51\nPeople's Intermountain Bank\n712 E Main St\nLehi, UT, 84043\nIf paying by wire, please include your\ncompany name in the memo.\n\nIf you have any questions or concerns about current or past invoices,\ncontact Tanner Purser directly at 801-805-4602`
        }
      };

      if (tax !== 0) {
        const taxObject = {
          TxnTaxCodeRef: {
            value: taxType.code
          },
          TotalTax: tax,
          TaxLine: [
            {
              DetailType: "TaxLineDetail",
              Amount: tax,
              TaxLineDetail: {
                NetAmountTaxable: taxableAmt,
                TaxPercent: taxType.percentage,
                TaxRateRef: {
                  value: taxType.taxrate
                },
                PercentBased: true
              }
            }
          ]
        };
        data = { ...data, TxnTaxDetail: taxObject };
      }

      if (litigator.qty !== "" && litigator.rate !== "") {
        const litigatorObj = {
          LineNum: 4,
          Amount: litigator.qty * litigator.rate,
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: tax ? "TAX" : "NON"
            },
            ItemRef: {
              name: "Litigator Scrubbing",
              value: "24"
            },
            Qty: parseFloat(litigator.qty),
            UnitPrice: parseFloat(litigator.rate)
          },
          Id: "4",
          DetailType: "SalesItemLineDetail"
        };
        data.Line.push(litigatorObj);
      }

      if (merchant !== "") {
        const merchantObj = {
          LineNum: 5,
          Amount: merchant,
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: tax ? "TAX" : "NON"
            },
            ItemRef: {
              name: "Merchant Fees",
              value: "25"
            },
            Qty: 1,
            UnitPrice: merchant
          },
          Id: "5",
          DetailType: "SalesItemLineDetail"
        };
        data.Line.push(merchantObj);
      }

      data.Line.push(finalLine);

      if (type === "approve") {
        post("/api/invoice", data)
          .then(() => {
            get("/api/pending/list")
              .then(res => {
                setLoading(false);
                setData(res.data);
                resetState();
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        data = {
          ...data,
          invoiceType: "Automatic",
          company,
          campaigns,
          startDate,
          dueDate,
          total,
          billingType: selectInputs.billingType,
          docNumber: Math.floor(Math.random() * 9999)
        };
        post("/api/create_pending", data)
          .then(() => {
            get("/api/pending/list")
              .then(res => {
                setLoading(false);
                setData(res.data);
                resetState();
              })
              .catch(err => {
                console.log(err);
              });
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  const resetState = () => {
    setBillableHours(defaultBillableHours);
    setPerformance(defaultPerformance);
    setDID(defaultDID);
    setLitigator(defaultLS);
    setMerchant(" ");
    setSelectInputs(defaultSelectInputs);
  };

  const closeModal = () => {
    resetState();
    handleClose();
  };

  const handleShowMore = e => {
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

  const handleTax = event => {
    if (event.target.checked === false) {
      setSelectInputs({ ...selectInputs, taxation: " " });
    }
    setState({
      ...state,
      tax: event.target.checked
    });
  };

  const buttonStatus = () => {
    const { company, campaign, billingType } = selectInputs;
    const total = getTotal();
    if (
      company !== " " &&
      campaign.length !== 0 &&
      billingType !== " " &&
      total !== "0.00"
    ) {
      return true;
    } else return false;
  };

  const renderTax = () => {
    return (
      <div
        style={{
          marginTop: 20,
          display: "grid",
          gridTemplateColumns: "30px 300px 200px 235px",
          justifyContent: "end",
          gridGap: 25
        }}
      >
        <Checkbox
          checked={state.tax}
          disableRipple
          disableTouchRipple
          disableFocusRipple
          style={{ backgroundColor: "transparent" }}
          onChange={handleTax}
          value="secondary"
        />
        <div>
          <TextField
            select
            disabled={!state.tax}
            label="Taxable"
            name="taxation"
            variant="outlined"
            value={selectInputs.taxation}
            onChange={e => handleSelectChange(e)}
            fullWidth
          >
            <MenuItem value=" ">Select taxation</MenuItem>
            <MenuItem value="6.1">Utah (6.1%)</MenuItem>
            <MenuItem value="8">California (8%)</MenuItem>
            <MenuItem value="16">Mexico (16%)</MenuItem>
          </TextField>
        </div>
        <TextField
          disabled={!state.tax}
          variant="outlined"
          inputProps={{
            value:
              selectInputs.taxation !== " " && getBalanceDue() !== 0
                ? Math.round(
                    (parseFloat(selectInputs.taxation) / 100) *
                      (getItemSubtotal() + parseInt(getAddSubtotal())) *
                      100
                  ) / 100
                : " ",
            style: { textAlign: "right" },
            readOnly: true
          }}
          fullWidth
        />

        <div>
          <span
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              marginTop: 15,
              gridGap: 24,
              alignItems: "center",
              justifyItems: "end"
            }}
          >
            BALANCE DUE
            <span
              style={{
                fontWeight: 600,
                fontSize: 20
              }}
            >
              {formatter.format(getBalanceDue())}
            </span>
          </span>
        </div>
      </div>
    );
  };
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={closeModal}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            New Automatic Invoice
          </Typography>
          <Button
            classes={{ root: classes.save, disabled: classes.save_disabled }}
            color="inherit"
            onClick={createInvoice}
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
              onClick={() => createInvoice("approve")}
              style={{ padding: "15px 20px" }}
            >
              Save and approve
            </MenuItem>
          </Popover>
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

          <Grid item xs={2}>
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
                BALANCE DUE
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 32
                }}
              >
                {formatter.format(getBalanceDue())}
              </span>
            </div>
          </Grid>
        </Grid>

        <Divider />

        <div style={{ padding: "15px 0" }}>
          <Typography variant="h5">Items</Typography>
        </div>

        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: "border-box" }}
        >
          <Grid item xs={3} className={classes.head}>
            Campaign
          </Grid>
          <Grid item xs={3} className={classes.head}>
            Service
          </Grid>
          <Grid item xs={2} className={`${classes.head} ${classes.alignRight}`}>
            Quantity
          </Grid>
          <Grid item xs={2} className={`${classes.head} ${classes.alignRight}`}>
            Rate
          </Grid>
          <Grid item xs={2} className={`${classes.head} ${classes.alignRight}`}>
            Amount
          </Grid>
        </Grid>

        {renderItems()}

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
            {formatter.format(getItemSubtotal())}
          </span>
        </div>
        {!collapse ? renderTax() : <Divider />}
        <div
          style={{ padding: "15px 0", display: "flex", alignItems: "center" }}
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
            <Grid
              item
              xs={2}
              className={`${classes.head} ${classes.alignRight}`}
            >
              Quantity
            </Grid>
            <Grid
              item
              xs={2}
              className={`${classes.head} ${classes.alignRight}`}
            >
              Rate
            </Grid>
            <Grid
              item
              xs={2}
              className={`${classes.head} ${classes.alignRight}`}
            >
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
                  value: litigator.qty,
                  style: { textAlign: "right" }
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="cost per hour"
                onChange={e => handleLitigator(e, "rate")}
                fullWidth
                inputProps={{
                  value: litigator.rate,
                  style: { textAlign: "right" }
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
                  readOnly: true,
                  style: { textAlign: "right" }
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
                  align: "right",
                  style: { textAlign: "right" }
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
              {formatter.format(getAddSubtotal())}
            </span>
            <Divider />
            <span
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                marginTop: 15,
                gridGap: 25,
                alignItems: "center",
                justifyItems: "end"
              }}
            >
              TOTAL
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 20
                }}
              >
                {formatter.format(getTotal())}
              </span>
            </span>
          </div>
          {collapse && renderTax()}
        </Collapse>
      </form>
    </>
  );
};

export default NewInvoice;
