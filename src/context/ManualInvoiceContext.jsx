/* eslint-disable */
import React, { useReducer, useEffect, useState } from "react";
import {
  mockCampaigns,
  mockCompanies,
  company
} from "../components/new-invoice/mock";
import {
  computeInt,
  services,
  formatDate,
  additionalFeeDetails
} from "utils/func";
import { post } from "utils/api";
const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

const addMonth =
  today.getFullYear() + "-" + (today.getMonth() + 2) + "-" + today.getDate();
const addWeek =
  today.getFullYear() +
  "-" +
  (today.getMonth() + 1) +
  "-" +
  (today.getDate() + 7);

const initialState = {
  companies: [],
  campaigns: [],
  loading: false
};

const initialFormState = {
  company: false,
  campaign: [],
  billingType: "1",
  billingPeriod: date,
  taxation: " "
};

const initialAdditionalFee = {
  merchantQty: "",
  merchantRate: "",
  scrubbingQty: "",
  scrubbingRate: ""
};

const ManualInvoiceContext = React.createContext();
const ManualInvoiceProvider = ({ children }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [billingFormState, setBillingFormState] = useState([]);
  const [additionalFee, setAdditionalFee] = useState(initialAdditionalFee);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const mockTaxation = [
    { code: "5", taxrate: "7", name: "Utah", percentage: 6.1 },
    { code: "7", taxrate: "11", name: "Mexico", percentage: 16 }
  ];
  const [tax, setTax] = useState(0);

  const getBalance = () => {
    let total = 0;
    billingFormState.map(item => {
      total +=
        item.billableHrsQty * item.billableHrsRate +
        item.didQty * item.didRate +
        item.performanceQty * item.performanceRate;
    });

    return total;
  };
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-loading":
        return { ...state, loading: action.payload.loading };
      case "set-companies":
        return { ...state, companies: action.payload.companies };
      case "set-campaigns":
        return { ...state, campaigns: action.payload.campaigns };
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
    setTimeout(() => {
      dispatch({
        type: "set-companies",
        payload: { companies: mockCompanies }
      });
      dispatch({
        type: "set-campaigns",
        payload: { campaigns: mockCampaigns }
      });
      dispatch({ type: "set-loading", payload: { loading: false } });
    }, 500);
  };

  const generateLine = () => {
    let newLine = [];

    billingFormState.map((item, index) => {
      services.map((service, serviceIndex) => {
        let { qty, rate } = service;
        if (computeInt(item[qty], item[rate]) !== 0) {
          newLine.push({
            Amount: computeInt(item[qty], item[rate]),
            SalesItemLineDetail: {
              TaxCodeRef: { value: tax ? "TAX" : "NON" },
              ItemRef: { name: service.name, value: service.value },
              Qty: item[qty],
              UnitPrice: item[rate]
            },
            DetailType: "SalesItemLineDetail",
            Description: item.name,
            LineNum: index + 1,
            Id: `${index + serviceIndex + 1}`
          });
        }
      });
    });
    additionalFeeDetails.map((detail, detailIndex) => {
      let { qty, rate } = detail;

      if (computeInt(additionalFee[qty], additionalFee[rate]) !== 0) {
        newLine.push({
          Amount: computeInt(additionalFee[qty], additionalFee[rate]),
          SalesItemLineDetail: {
            TaxCodeRef: { value: tax ? "TAX" : "NON" },
            ItemRef: { name: detail.name, value: detail.value },
            Qty: additionalFee[qty],
            UnitPrice: additionalFee[rate]
          },
          DetailType: "SalesItemLineDetail",
          Description: detail.name,
          LineNum: newLine.length + detailIndex,
          Id: `${newLine.length + detailIndex}`
        });
      }
    });

    newLine.push({
      DetailType: "SubTotalLineDetail",
      Amount: 1454.29,
      SubTotalLineDetail: {}
    });

    return newLine;
  };

  const sendToQuickbooks = data => {
    setCreateLoading(true);
    post("/api/invoice", data)
      .then(res => {
        setCreateLoading(false);
        setShowCreateNew(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getStartDate = () => {
    return new Date(formState.billingType === "1" ? addMonth : addWeek);
  };
  const saveAsDraft = (data, handleClose) => {
    let newData = {
      ...data,
      invoiceType: "Manual",
      company: company(formState.company),
      campaigns: selectedCampaign,
      startDate: formatDate(getStartDate()),
      dueDate: formatDate(new Date(formState.billingPeriod)),
      total: getBalance(),
      billingType: formState.billingType,
      docNumber: Math.floor(Math.random() * 9999)
    };
    setCreateLoading(true);
    post("/api/create_pending", newData)
      .then(res => {
        setCreateLoading(false);
        setShowCreateNew(true);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const createManualInvoice = (type, handleClose) => {
    let data = {
      CustomerRef: {
        value: company(formState.company).qb_id
      },
      TxnDate: formatDate(new Date(date)),
      DueDate: formatDate(new Date(formState.billingPeriod)),
      Line: generateLine(),
      CustomerMemo: {
        value: `Wire/ACH Instructions:\nRouting 124301025\nAccount: 4134870\nBIC: AMFOUS51\nPeople's Intermountain Bank\n712 E Main St\nLehi, UT, 84043\nIf paying by wire, please include your\ncompany name in the memo.\n\nIf you have any questions or concerns about current or past invoices,\ncontact Tanner Purser directly at 801-805-4602`
      }
    };
    switch (type) {
      case "approve":
        sendToQuickbooks(data, handleClose);
        break;
      case "draft":
        saveAsDraft(data, handleClose);
        break;
      default:
        saveAsDraft(data, handleClose);
        break;
    }
  };

  const resetAllFormState = () => {
    setFormState(initialFormState);
    setBillingFormState([]);
    setSelectedCampaign([]);
  };

  return (
    <ManualInvoiceContext.Provider
      value={{
        state,
        dispatch,
        formState,
        setFormState,
        setActiveCampaigns,
        selectedCampaign,
        setSelectedCampaign,
        billingFormState,
        setBillingFormState,
        additionalFee,
        setAdditionalFee,
        tax,
        setTax,
        mockTaxation,
        createManualInvoice,
        getBalance,
        createLoading,
        showCreateNew,
        setShowCreateNew,
        resetAllFormState
      }}
    >
      {children}
    </ManualInvoiceContext.Provider>
  );
};

export { ManualInvoiceProvider, ManualInvoiceContext };
