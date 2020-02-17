import React, { useReducer, useEffect, useState } from "react";
import { mockCampaigns, mockCompanies } from "../components/new-invoice/mock";

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

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
  merchantTotal: "",

  scrubbingQty: "",
  scrubbingRate: "",
  scrubbingTotal: ""
};

const ManualInvoiceContext = React.createContext();
const ManualInvoiceProvider = ({ children }) => {
  const [formState, setFormState] = useState(initialFormState);

  const [selectedCampaign, setSelectedCampaign] = useState([]);
  const [billingFormState, setBillingFormState] = useState([]);
  const [additionalFee, setAdditionalFee] = useState(initialAdditionalFee);

  const mockTaxation = [
    { code: "5", taxrate: "7", name: "Utah", percentage: 6.1 },
    { code: "7", taxrate: "11", name: "Mexico", percentage: 16 }
  ];
  const [tax, setTax] = useState(0);
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
        mockTaxation
      }}
    >
      {children}
    </ManualInvoiceContext.Provider>
  );
};

export { ManualInvoiceProvider, ManualInvoiceContext };
