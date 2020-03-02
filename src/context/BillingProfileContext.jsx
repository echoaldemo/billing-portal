import React, { useReducer, useState, useEffect } from "react";
import {
  mockCompanies,
  mockCampaigns
} from "components/new-invoice/mock/index";
import { get } from "utils/api";

const initialState = {
  companies: mockCompanies,
  selectedCompany: mockCompanies[0].uuid,
  edit: false,
  campaignRates: []
};

const BillingContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "set-companies":
      return { ...state, companies: action.payload.companies };
    case "set-selected-company":
      return { ...state, selectedCompany: action.payload.selectedCompany };
    case "set-edit":
      return { ...state, edit: action.payload.edit };
    case "set-campaign-rates":
      return { ...state, campaignRates: action.payload.campaignRates };
    default:
      return null;
  }
};

const BillingProvider = ({ children }) => {
  const [rowCollapse, setRowCollapse] = useState([0, 1]);
  const [companyCampaigns, setCompanyCampaigns] = useState([]);
  const [state, dispatch] = useReducer(reducer, initialState);

  const getCompanyCampaigns = company_uuid => {
    const result = mockCampaigns.filter(item => item.company === company_uuid);
    return result;
  };

  useEffect(() => {
    setCompanyCampaigns(getCompanyCampaigns(state.selectedCompany));
    get(`/api/rate/${state.selectedCompany}`).then(result => {
      console.log("rresult daata", result.data);
      dispatch({
        type: "set-campaign-rates",
        payload: {
          campaignRates: result.data ? result.data : []
        }
      });
    });
  }, [state.selectedCompany]);

  return (
    <BillingContext.Provider
      value={{
        state,
        dispatch,
        companyCampaigns,
        rowCollapse,
        setRowCollapse
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export { BillingProvider, BillingContext };
