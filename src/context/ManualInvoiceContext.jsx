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

const ManualInvoiceContext = React.createContext();
const ManualInvoiceProvider = ({ children }) => {
  const [formState, setFormState] = useState(initialFormState);

  const [selectedCampaign, setSelectedCampaign] = useState([]);
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
        setSelectedCampaign
      }}
    >
      {children}
    </ManualInvoiceContext.Provider>
  );
};

export { ManualInvoiceProvider, ManualInvoiceContext };
