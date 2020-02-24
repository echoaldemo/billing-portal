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
const start =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
today.setMonth(today.getMonth() + 1);
const end =
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
  billingPeriod: { start, end },
  taxation: " "
};

const initialAdditionalFee = {
  merchantQty: "",
  merchantRate: "",
  merchantTax: true,

  scrubbingQty: "",
  scrubbingRate: "",
  scrubbingTax: true
};

const ManualInvoiceContext = React.createContext();
const ManualInvoiceProvider = ({ children }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [createLoading, setCreateLoading] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [billingFormState, setBillingFormState] = useState([]);
  const [additionalFee, setAdditionalFee] = useState(initialAdditionalFee);
  const [showCreateNew, setShowCreateNew] = useState(false);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [taxChecked, setTaxChecked] = useState(true);
  const mockTaxation = [
    { code: "5", taxrate: "7", name: "Utah", percentage: 6.1 },
    { code: "7", taxrate: "11", name: "Mexico", percentage: 16 }
  ];
  const [tax, setTax] = useState(6.1);
  const computeItemService = (qty = 0, rate = 0, isTaxed) => {
    return qty * rate;
  };
  const getBalance = () => {
    let total = 0;
    billingFormState.forEach((item) => {
      total +=
        computeItemService(
          item.billableHrsQty,
          item.billableHrsRate,
          item.billableHrsTaxed
        ) +
        computeItemService(item.didQty, item.didRate, item.didTaxed) +
        computeItemService(
          item.performanceQty,
          item.performanceRate,
          item.performanceTaxed
        );
    });
    return total;
  };
  const getTaxableServices = () => {
    let total = 0;
    billingFormState.forEach((item) => {
      if (item.billableHrsTaxed) {
        total += computeItemService(
          item.billableHrsQty,
          item.billableHrsRate,
          item.billableHrsTaxed
        );
      }
      if (item.didTaxed) {
        total += computeItemService(item.didQty, item.didRate, item.didTaxed);
      }
      if (item.performanceTaxed) {
        total += computeItemService(item.performanceQty, item.performanceTaxed);
      }
    });
    return total;
  };
  const getTaxableAdditionalFees = () => {
    let total = 0;
    if (additionalFee.merchantTax) {
      total += computeItemService(
        additionalFee.merchantQty,
        additionalFee.merchantRate,
        additionalFee.merchantTax
      );
    }
    if (additionalFee.scrubbingTax) {
      total += computeItemService(
        additionalFee.scrubbingQty,
        additionalFee.scrubbingRate,
        additionalFee.scrubbingTax
      );
    }
    return total;
  };
  const computeBalanceDue = () => {
    let newBalanceDue = 0;
    console.log(computeTax(), computeTotal());

    newBalanceDue = parseFloat(computeTax()) + parseFloat(computeTotal());

    return newBalanceDue;
  };
  const taxableTotal = () => {
    return getTaxableAdditionalFees() + getTaxableServices();
  };
  const computeTax = () => {
    let taxed = 0;
    if (taxChecked) {
      let totalBills = parseFloat(taxableTotal());
      let totalTaxation = parseFloat(tax / 100);

      taxed = totalBills * totalTaxation;
    }
    return parseFloat(taxed).toFixed(2);
  };
  const computeTotal = () => {
    let total = 0;
    let balanceTotal = parseFloat(getBalance());

    let totalAdditionalFee =
      computeItemService(
        additionalFee.merchantQty,
        additionalFee.merchantRate,
        additionalFee.merchantTax
      ) +
      computeItemService(
        additionalFee.scrubbingQty,
        additionalFee.scrubbingRate,
        additionalFee.scrubbingTax
      );
    total = parseFloat(balanceTotal) + parseFloat(totalAdditionalFee);
    return parseFloat(total).toFixed(2);
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
  const setActiveCampaigns = (uuid) => {
    const filteredCampaigns = state.campaigns.filter((c) => c.company === uuid);
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
        let { qty, rate, tax } = service;
        if (computeInt(item[qty], item[rate]) !== 0) {
          newLine.push({
            Amount: computeInt(item[qty], item[rate]),
            SalesItemLineDetail: {
              TaxCodeRef: { value: item[tax] ? "TAX" : "NON" },
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
      let { qty, rate, tax } = detail;

      if (computeInt(additionalFee[qty], additionalFee[rate]) !== 0) {
        newLine.push({
          Amount: computeInt(additionalFee[qty], additionalFee[rate]),
          SalesItemLineDetail: {
            TaxCodeRef: { value: additionalFee[tax] ? "TAX" : "NON" },
            ItemRef: { name: detail.name, value: detail.value },
            Qty: additionalFee[qty],
            UnitPrice: parseFloat(additionalFee[rate])
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
      Amount: computeBalanceDue(),
      SubTotalLineDetail: {}
    });

    return newLine;
  };

  const sendToQuickbooks = (data) => {
    setCreateLoading(true);
    post("/api/invoice", data)
      .then((res) => {
        setCreateLoading(false);
        setShowCreateNew(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStartDate = () => {
    return new Date(formState.billingType === "1" ? addMonth : addWeek);
  };
  const saveAsDraft = (data) => {
    let newData = {
      ...data,
      invoiceType: "Manual",
      company: company(formState.company),
      campaigns: campaignDetails,
      startDate: formatDate(getStartDate()),
      dueDate: formatDate(new Date(formState.billingPeriod)),
      total: computeBalanceDue(),
      billingType: formState.billingType,
      docNumber: Math.floor(Math.random() * 9999)
    };
    setCreateLoading(true);
    post("/api/create_pending", newData)
      .then((res) => {
        setCreateLoading(false);
        setShowCreateNew(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const createManualInvoice = (type, handleClose) => {
    const taxDetail = mockTaxation.find((item) => item.percentage === tax);
    let taxDetails = {
      TxnTaxCodeRef: {
        value: taxDetail.code
      },
      TotalTax: computeTax(),
      TaxLine: [
        {
          DetailType: "TaxLineDetail",
          Amount: computeTax(),
          TaxLineDetail: {
            NetAmountTaxable: taxableTotal(),
            TaxPercent: tax,
            TaxRateRef: {
              value: taxDetail.taxrate
            },
            PercentBased: true
          }
        }
      ]
    };

    let data = {
      CustomerRef: {
        value: company(formState.company).qb_id
      },
      TxnDate: formatDate(new Date(date)),
      DueDate: formatDate(new Date(formState.billingPeriod)),
      Line: generateLine(),
      TxnTaxDetail: taxChecked ? taxDetails : null,
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

  const allChecked = () => {
    const result = billingFormState.map((item) => {
      return (
        item["billableHrsTaxed"] ||
        item["didTaxed"] ||
        item["performanceTaxed"] ||
        additionalFee.merchantTax ||
        additionalFee.scrubbingTax
      );
    });

    return result.some((val) => val === true);
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
        resetAllFormState,
        campaignDetails,
        setCampaignDetails,
        allChecked,
        taxChecked,
        setTaxChecked,
        computeItemService,
        getTaxableServices,
        getTaxableAdditionalFees,
        computeBalanceDue,
        taxableTotal
      }}
    >
      {children}
    </ManualInvoiceContext.Provider>
  );
};

export { ManualInvoiceProvider, ManualInvoiceContext };
