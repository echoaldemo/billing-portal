/* eslint-disable */
import React, { useReducer, useEffect, useState, useContext } from "react";
import { post, get, getAPI } from "utils/api";
import { postLog } from "utils/time";
import { StateContext } from "context/StateContext";
import { IdentityContext } from "./IdentityContext";
const appendLeadingZeroes = n => {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
};

const date = new Date(),
  y = date.getFullYear(),
  m = date.getMonth();
const start = new Date(y, m, 1);
const end = new Date(y, m + 1, 0);

const initialState = {
  companies: [],
  campaigns: [],
  loading: false,
  modalType: ""
};

const initialFormState = {
  company: false,
  campaign: [],
  billingType: "1",
  billingPeriod: { start, end },
  total: " ",
  taxation: 6.1
};

const initialAddFee = {
  litigator: { qty: "", rate: "", tax: true },
  merchant: { qty: "", rate: "", tax: true }
};

const mockTaxation = [
  { code: "5", taxrate: "7", name: "Utah", percentage: 6.1 },
  { code: "7", taxrate: "11", name: "Mexico", percentage: 16 }
];
const AutomaticInvoiceContext = React.createContext();
const AutomaticInvoiceProvider = ({ children }) => {
  const { state: state2, getPendingInvoicesData } = useContext(StateContext);
  const {
    identityState: { companies, campaigns }
  } = useContext(IdentityContext);
  const [formState, setFormState] = useState(initialFormState);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [addFee, setAddFee] = useState(initialAddFee);
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-loading":
        return { ...state, loading: action.payload.loading };
      case "set-companies":
        return { ...state, companies: action.payload.companies };
      case "set-campaigns":
        return { ...state, campaigns: action.payload.campaigns };
      case "set-modal-type":
        return { ...state, modalType: action.payload.modalType };
      default:
        return null;
    }
  }, initialState);
  useEffect(() => {
    getGeneralData();
  }, []);
  useEffect(() => {
    const { start } = formState.billingPeriod;
    let dt = new Date(start);
    if (formState.billingType === "1") dt.setMonth(dt.getMonth() + 1);
    else dt.setDate(dt.getDate() + 7);
    const dueDate =
      dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    setFormState({
      ...formState,
      billingPeriod: { ...formState.billingPeriod, end: dueDate }
    });
  }, [formState.billingType, formState.billingPeriod.start]);
  const setActiveCampaigns = uuid => {
    const filteredCampaigns = state.campaigns.filter(c => c.company === uuid);
    setFormState({ ...formState, campaign: filteredCampaigns });
  };
  const getGeneralData = () => {
    dispatch({ type: "set-loading", payload: { loading: true } });
    dispatch({
      type: "set-companies",
      payload: {
        companies: companies
      }
    });

    const loadedCampaigns = campaigns.map(item => ({
      ...item,
      content: {
        billable_hours: " ",
        bill_rate: " ",
        performance: " ",
        performance_rate: " ",
        did: " ",
        did_rate: " "
      },
      tax: {
        billable_hours: true,
        performance: true,
        did: true
      }
    }));
    console.log(loadedCampaigns, "camp");
    dispatch({
      type: "set-campaigns",
      payload: { campaigns: loadedCampaigns }
    });
    dispatch({ type: "set-loading", payload: { loading: false } });
  };
  const createAnother = () => {
    setFormState(initialFormState);
    setAddFee(initialAddFee);
    setSelectedCampaign([]);
    getGeneralData();
  };
  const filterCampaign = uuid => {
    const filteredCampaign = state.campaigns.filter(
      camp => camp.company === uuid
    );
    return filteredCampaign;
  };
  const formatDate = date => {
    let dt = new Date(date);
    return dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
  };
  const dateFunc = (date, type) => {
    let value = type ? type : formState.billingType;
    let dt = new Date(date);
    if (value === "1") dt.setMonth(dt.getMonth() + 1);
    else dt.setDate(dt.getDate() + 7);
    const dueDate =
      dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();
    return dueDate;
  };
  const handleDomo = (type, value, rates) => {
    let data,
      filteredCompany =
        type === "company"
          ? companies.filter(comp => comp.uuid === value)[0]
          : companies.filter(comp => comp.uuid === formState.company)[0];
    if (type === "company") {
      data = {
        company: filteredCompany.slug,
        start: formatDate(formState.billingPeriod.start),
        end: formatDate(formState.billingPeriod.end)
      };
    } else if (type === "start") {
      data = {
        company: filteredCompany.slug,
        start: formatDate(value),
        end: dateFunc(value)
      };
    } else if (type === "end") {
      data = {
        company: filteredCompany.slug,
        start: formatDate(formState.billingPeriod.start),
        end: formatDate(value)
      };
    } else if (type === "billing") {
      data = {
        company: filteredCompany.slug,
        start: formatDate(formState.billingPeriod.start),
        end: dateFunc(formState.billingPeriod.start, value)
      };
    }
    post(`/api/domo/billable`, data).then(res => {
      console.log("stateCamp", state);
      const temp = res.data.rows.map(item => {
        return state.campaigns.filter(camp => camp.slug === item[1])[0].uuid;
      });
      if (temp.length) {
        setSelectedCampaign(temp);
        let temp2 = state.campaigns;
        let foo;
        res.data.rows.forEach(item => {
          temp2.forEach((camp, i) => {
            if (rates) {
              foo = rates.filter(elem => elem.uuid === camp.uuid)[0];
            }
            if (camp.slug === item[1]) {
              if (foo) {
                const { bill_rate, performance_rate, did_rate } = foo.content;
                temp2[i] = {
                  ...temp2[i],
                  content: {
                    ...temp2[i].content,
                    bill_rate: bill_rate || " ",
                    performance_rate: performance_rate || " ",
                    did_rate: did_rate || " ",
                    billable_hours: item[2] / 3600
                  }
                };
              } else {
                temp2[i] = {
                  ...temp2[i],
                  content: {
                    ...temp2[i].content,
                    billable_hours: item[2] / 3600
                  }
                };
              }
            }
          });
        });
        dispatch({
          type: "set-campaigns",
          payload: { campaigns: temp2 }
        });
        if (type === "company") {
          const camp = filterCampaign(value);
          setFormState({
            ...formState,
            company: value,
            campaign: camp
          });
        }
      } else {
        if (type === "company") {
          const camp = filterCampaign(value);
          setFormState({
            ...formState,
            company: value,
            campaign: camp
          });
          setSelectedCampaign(camp.map(item => item.uuid));
          if (camp.length) {
            dispatch({
              type: "set-modal-type",
              payload: { modalType: "no-result" }
            });
          }
        } else {
          dispatch({
            type: "set-modal-type",
            payload: { modalType: "no-result" }
          });
        }
      }
      setFormLoading(false);
    });
  };
  const handleCompanyChange = e => {
    setFormLoading(true);
    if (formState.company !== e.target.value) {
      setSelectedCampaign([]);
      setFormState({
        ...formState,
        company: e.target.value,
        campaign: []
      });
    } else {
      setFormState({
        ...formState,
        company: e.target.value
      });
    }
    const url = `/api/rate/${
      e.target.value
    }?original_data=${!state2.applyPrevious}&billing_type=${
      formState.billingType
    }`;
    get(url).then(res => {
      handleDomo(
        "company",
        e.target.value,
        res.data[0] ? res.data[0].rates : null
      );
    });
  };

  const handleBillingChange = e => {
    if (formState.company && selectedCampaign.length) {
      const url = `/api/rate/${
        formState.company
      }?original_data=${!state2.applyPrevious}&billing_type=${e.target.value}`;
      setFormState({
        ...formState,
        billingType: e.target.value
      });
      get(url).then(res => {
        handleDomo(
          "billing",
          e.target.value,
          res.data[0] ? res.data[0].rates : null
        );
      });
    } else {
      setFormState({
        ...formState,
        billingType: e.target.value
      });
    }
  };
  const handleAddFees = (e, label) => {
    const value = label === "tax" ? e.target.checked : e.target.value;
    if (
      (e.target.name === "merchant" &&
        parseFloat(value) >= 0 &&
        parseFloat(value) <= 100) ||
      value === "" ||
      e.target.name === "litigator" ||
      label === "tax"
    ) {
      setAddFee({
        ...addFee,
        [e.target.name]: { ...addFee[e.target.name], [label]: value }
      });
    }
  };
  const getTotal = () => {
    let temp = formState.campaign.filter(
      item => selectedCampaign.indexOf(item.uuid) !== -1
    );
    let total = 0;
    temp.map(item => {
      total +=
        item.content.billable_hours * item.content.bill_rate +
        item.content.performance * item.content.performance_rate +
        item.content.did * item.content.did_rate;
    });
    return total;
  };
  const getAddFees = () => {
    const { merchant, litigator } = addFee;
    let subtotal = getTotal(),
      total = 0;
    if (merchant.rate) {
      total +=
        Math.round((parseFloat(merchant.rate) / 100) * subtotal * 100) / 100;
    }
    total += litigator.qty * litigator.rate;
    return total;
  };
  const getTaxableSubtotal = () => {
    const { merchant, litigator } = addFee;
    let temp = formState.campaign.filter(
      item => selectedCampaign.indexOf(item.uuid) !== -1
    );
    let total = 0;
    let mer =
        Math.round((parseFloat(merchant.rate) / 100) * getTotal() * 100) / 100,
      lit = litigator.qty * litigator.rate;
    if (merchant.tax && merchant.rate) total += mer;
    if (litigator.tax) total += lit;
    temp.map(item => {
      let a = item.content.billable_hours * item.content.bill_rate,
        b = item.content.performance * item.content.performance_rate,
        c = item.content.did * item.content.did_rate;
      if (item.tax.billable_hours) total += a;
      if (item.tax.performance) total += b;
      if (item.tax.did) total += c;
    });
    return total;
  };
  const getTaxStatus = () => {
    const { merchant, litigator } = addFee;
    let temp = formState.campaign.filter(
      item => selectedCampaign.indexOf(item.uuid) !== -1
    );
    let total = 0;
    if (merchant.tax) total += 1;
    if (litigator.tax) total += 1;
    temp.map(item => {
      if (item.tax.billable_hours) total += 1;
      if (item.tax.performance) total += 1;
      if (item.tax.did) total += 1;
    });
    return total;
  };
  const getTax = () => {
    const tax =
      formState.taxation !== " "
        ? Math.round(
            (parseFloat(formState.taxation) / 100) * getTaxableSubtotal() * 100
          ) / 100
        : 0;
    return tax;
  };
  const getBalance = () => {
    return getTotal() + getAddFees() + getTax();
  };
  const createInvoice = type => {
    dispatch({
      type: "set-modal-type",
      payload: { modalType: "loading" }
    });
    const { litigator, merchant } = addFee;

    let start = new Date(formState.billingPeriod.start),
      end = new Date(formState.billingPeriod.end),
      today = new Date();

    const dateToday =
      today.getFullYear() +
      "-" +
      appendLeadingZeroes(today.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(today.getDate());

    const startDate =
      start.getFullYear() +
      "-" +
      appendLeadingZeroes(start.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(start.getDate());

    const dueDate =
      end.getFullYear() +
      "-" +
      appendLeadingZeroes(end.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(end.getDate());

    const company = state.companies.filter(
      item => item.uuid === formState.company
    )[0];

    const campaigns = state.campaigns.filter(
      item => selectedCampaign.indexOf(item.uuid) !== -1
    );

    const total = getBalance();
    const tax = getTax();
    const taxableAmt = parseFloat(getTaxableSubtotal());
    const taxPercent = parseFloat(formState.taxation);
    const taxType = mockTaxation.filter(
      item => item.percentage === taxPercent
    )[0];
    const finalLine = {
      DetailType: "SubTotalLineDetail",
      Amount: total,
      SubTotalLineDetail: {}
    };
    let temp2 = [];
    campaigns.map((campaign, i) => {
      let temp = [];
      const {
        billable_hours,
        bill_rate,
        performance,
        performance_rate,
        did,
        did_rate
      } = campaign.content;
      if (billable_hours * bill_rate)
        temp.push({
          qty: billable_hours,
          rate: bill_rate,
          itemName: "Billable Hours",
          itemId: "21",
          tax: campaign.tax.billable_hours ? "TAX" : "NON"
        });
      if (performance * performance_rate)
        temp.push({
          qty: performance,
          rate: performance_rate,
          itemName: "Performance",
          itemId: "22",
          tax: campaign.tax.performance ? "TAX" : "NON"
        });
      if (did * did_rate)
        temp.push({
          qty: did,
          rate: did_rate,
          itemName: "DID Billing",
          itemId: "23",
          tax: campaign.tax.did ? "TAX" : "NON"
        });
      temp.forEach(item => {
        temp2.push({
          Amount: item.qty * item.rate,
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: item.tax
            },
            ItemRef: {
              name: item.itemName,
              value: item.itemId
            },
            Qty: item.qty,
            UnitPrice: item.rate
          },
          DetailType: "SalesItemLineDetail",
          Description: campaign.name
        });
      });
    });
    const lineData = temp2.map((item, i) => ({
      ...item,
      LineNum: i + 1,
      Id: `${i + 1}`
    }));
    let data = {
      CustomerRef: {
        value: company.qb_id
      },
      TxnDate: startDate,
      DueDate: dueDate,
      Line: lineData,
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
        LineNum: lineData.length + 1,
        Amount: litigator.qty * litigator.rate,
        SalesItemLineDetail: {
          TaxCodeRef: {
            value: litigator.tax ? "TAX" : "NON"
          },
          ItemRef: {
            name: "Litigator Scrubbing",
            value: "24"
          },
          Qty: parseFloat(litigator.qty),
          UnitPrice: parseFloat(litigator.rate)
        },
        Id: `${lineData.length + 1}`,
        DetailType: "SalesItemLineDetail"
      };
      data.Line.push(litigatorObj);
    }

    if (merchant.rate !== "") {
      const merchantObj = {
        LineNum: lineData.length + 1,
        Amount:
          Math.round((parseFloat(merchant.rate) / 100) * getTotal() * 100) /
          100,
        SalesItemLineDetail: {
          TaxCodeRef: {
            value: merchant.tax ? "TAX" : "NON"
          },
          ItemRef: {
            name: "Merchant Fees",
            value: "25"
          },
          Qty: 1,
          UnitPrice:
            Math.round((parseFloat(merchant.rate) / 100) * getTotal() * 100) /
            100
        },
        Id: `${lineData.length + 1}`,
        DetailType: "SalesItemLineDetail",
        Description: `Merchant Fees ${merchant.rate} %`
      };
      data.Line.push(merchantObj);
    }
    data.Line.push(finalLine);
    let logData = {};
    if (type === "approve") {
      logData.type = "sent-invoice";
      logData.description = `${state2.userProfile.name} issued an invoice to ${company.name}.`;
      post("/api/invoice", data)
        .then(res => {
          dispatch({
            type: "set-modal-type",
            payload: { modalType: "success" }
          });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      logData.type = "create-draft";
      logData.description = `${state2.userProfile.name} created a draft for ${company.name}.`;
    }
    data = {
      ...data,
      status: type === "approve" ? 2 : 0,
      invoiceType: "Automatic",
      company,
      campaigns,
      startDate,
      dueDate,
      total,
      billingType: formState.billingType,
      docNumber: Math.floor(Math.random() * 9999)
    };
    post("/api/create_pending", data)
      .then(res => {
        logData.invoiceId = res.data.id;
        postLog(logData);
        dispatch({
          type: "set-modal-type",
          payload: { modalType: "success" }
        });
        getPendingInvoicesData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  state.formLoading = formLoading;
  return (
    <AutomaticInvoiceContext.Provider
      value={{
        state,
        dispatch,
        formState,
        setFormState,
        setActiveCampaigns,
        selectedCampaign,
        setSelectedCampaign,
        handleCompanyChange,
        handleBillingChange,
        addFee,
        setAddFee,
        handleAddFees,
        getTotal,
        getTaxableSubtotal,
        getTax,
        getAddFees,
        getTaxStatus,
        mockTaxation,
        getBalance,
        createInvoice,
        createAnother,
        handleDomo,
        setFormLoading
      }}
    >
      {children}
    </AutomaticInvoiceContext.Provider>
  );
};

export { AutomaticInvoiceProvider, AutomaticInvoiceContext };
