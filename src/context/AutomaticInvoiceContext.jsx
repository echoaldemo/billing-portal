import React, { useReducer, useEffect, useState, useContext } from "react";
import { mockCampaigns, mockCompanies } from "../components/new-invoice/mock";
import { getMock, post } from "utils/api";
import { StateContext } from "context/StateContext";

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

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
  billingPeriod: date,
  total: " ",
  taxation: " "
};

const initialAddFee = {
  litigator: { qty: "", rate: "" },
  merchant: { qty: "", rate: "" }
};

const mockTaxation = [
  { code: "5", taxrate: "7", name: "Utah", percentage: 6.1 },
  { code: "7", taxrate: "11", name: "Mexico", percentage: 16 }
];

const AutomaticInvoiceContext = React.createContext();
const AutomaticInvoiceProvider = ({ children }) => {
  const { getPendingInvoicesData } = useContext(StateContext);
  const [formState, setFormState] = useState(initialFormState);
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
  const setActiveCampaigns = uuid => {
    const filteredCampaigns = state.campaigns.filter(c => c.company === uuid);
    setFormState({ ...formState, campaign: filteredCampaigns });
  };
  const getGeneralData = () => {
    dispatch({ type: "set-loading", payload: { loading: true } });
    const campaigns = mockCampaigns.map(item => ({
      ...item,
      content: {
        billable_hours: " ",
        bill_rate: " ",
        performance: " ",
        performance_rate: " ",
        did: " ",
        did_rate: " "
      }
    }));
    setTimeout(() => {
      dispatch({
        type: "set-companies",
        payload: { companies: mockCompanies }
      });
      dispatch({
        type: "set-campaigns",
        payload: { campaigns: campaigns }
      });
      dispatch({ type: "set-loading", payload: { loading: false } });
    }, 500);
  };
  const createAnother = () => {
    setFormState(initialFormState);
    setAddFee(initialAddFee);
    setSelectedCampaign([]);
    getGeneralData();
  };
  const handleBillingChange = () => {
    getMock("/company1", {}).then(res => {
      let temp = formState.campaign;
      temp.forEach(item => {
        let data = res.data[Math.floor(Math.random() * 10)];
        item["content"] = data;
      });
      setFormState({
        ...formState,
        campaign: temp
      });
    });
  };
  const handleAddFees = (e, label) => {
    setAddFee({
      ...addFee,
      [e.target.name]: { ...addFee[e.target.name], [label]: e.target.value }
    });
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
  const getTax = () => {
    const tax =
      formState.taxation !== " "
        ? Math.round(
            (parseFloat(formState.taxation) / 100) * getTotal() * 100
          ) / 100
        : 0;
    return tax;
  };
  const getBalance = () => {
    return getTotal() + getTax();
  };
  const appendLeadingZeroes = n => {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  };
  const createInvoice = type => {
    dispatch({
      type: "set-modal-type",
      payload: { modalType: "loading" }
    });
    const { litigator, merchant } = addFee;
    let dt = new Date(formState.billingPeriod);

    let startDate =
      dt.getFullYear() +
      "-" +
      appendLeadingZeroes(dt.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(dt.getDate());

    if (formState.billingType === "1") dt.setMonth(dt.getMonth() + 1);
    else dt.setDate(dt.getDate() + 7);

    const dueDate =
      dt.getFullYear() +
      "-" +
      appendLeadingZeroes(dt.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(dt.getDate());

    const company = state.companies.filter(
      item => item.uuid === formState.company
    )[0];

    const campaigns = state.campaigns.filter(
      item => selectedCampaign.indexOf(item.uuid) !== -1
    );

    const total = getBalance();
    const tax = getTax();
    const taxableAmt = parseFloat(getTotal());
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
          itemId: "21"
        });
      if (performance * performance_rate)
        temp.push({
          qty: performance,
          rate: performance_rate,
          itemName: "Performance",
          itemId: "22"
        });
      if (did * did_rate)
        temp.push({
          qty: did,
          rate: did_rate,
          itemName: "DID Billing",
          itemId: "23"
        });
      temp.forEach(item => {
        temp2.push({
          Amount: item.qty * item.rate,
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: tax ? "TAX" : "NON"
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
            value: tax ? "TAX" : "NON"
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

    if (merchant.qty !== "" && merchant.rate !== "") {
      const merchantObj = {
        LineNum: lineData.length + 1,
        Amount: merchant.qty * merchant.rate,
        SalesItemLineDetail: {
          TaxCodeRef: {
            value: tax ? "TAX" : "NON"
          },
          ItemRef: {
            name: "Merchant Fees",
            value: "25"
          },
          Qty: merchant.qty,
          UnitPrice: merchant.rate
        },
        Id: `${lineData.length + 1}`,
        DetailType: "SalesItemLineDetail"
      };
      data.Line.push(merchantObj);
    }

    data.Line.push(finalLine);
    console.log(data);
    if (type === "approve") {
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
      data = {
        ...data,
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
          dispatch({
            type: "set-modal-type",
            payload: { modalType: "success" }
          });
          getPendingInvoicesData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
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
        handleBillingChange,
        addFee,
        setAddFee,
        handleAddFees,
        getTotal,
        getTax,
        mockTaxation,
        getBalance,
        createInvoice,
        createAnother
      }}
    >
      {children}
    </AutomaticInvoiceContext.Provider>
  );
};

export { AutomaticInvoiceProvider, AutomaticInvoiceContext };
