import React, { useReducer, useState, useEffect } from "react";
import {
  mockCompanies,
  mockCampaigns
} from "components/new-invoice/mock/index";

const initialState = {
  companies: mockCompanies,
  selectedCompany: mockCompanies[0].uuid,
  edit: false
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
