import React, { useReducer, useState, useEffect } from "react";
import {
  mockCompanies,
  mockCampaigns
} from "components/new-invoice/mock/index";

const initialState = {
  companies: mockCompanies,
  selectedCompany: mockCompanies[0].uuid
};

const BillingContext = React.createContext();

const BillingProvider = ({ children }) => {
  const [companyCampaigns, setCompanyCampaigns] = useState([]);
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-companies":
        return { ...state, companies: action.payload.companies };
      case "set-selected-company":
        return { ...state, selectedCompany: action.payload.selectedCompany };

      default:
        return null;
    }
  }, initialState);

  const getCompanyCampaigns = company_uuid => {
    const result = mockCampaigns.filter(item => item.company === company_uuid);
    return result;
  };

  useEffect(() => {
    setCompanyCampaigns(getCompanyCampaigns(state.selectedCompany));
  }, [state.selectedCompany]);

  return (
    <BillingContext.Provider
      value={{
        state,
        dispatch,
        companyCampaigns
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export { BillingProvider, BillingContext };
