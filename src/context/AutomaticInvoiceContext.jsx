import React, { useReducer, useEffect, useState } from "react";
import { mockCampaigns, mockCompanies } from "../components/new-invoice/mock";
import { getMock } from "utils/api";

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

const AutomaticInvoiceContext = React.createContext();
const AutomaticInvoiceProvider = ({ children }) => {
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
  const handleBillingChange = event => {
    getMock("/company1", {}).then(res => {
      let temp = formState.campaign;
      temp.forEach(item => {
        let data = res.data[Math.floor(Math.random() * 10)];
        item["content"] = data;
      });
      dispatch({
        type: "set-campaigns",
        payload: { campaigns: temp }
      });
    });
  };
  console.log(formState);
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
        handleBillingChange
      }}
    >
      {children}
    </AutomaticInvoiceContext.Provider>
  );
};

export { AutomaticInvoiceProvider, AutomaticInvoiceContext };
