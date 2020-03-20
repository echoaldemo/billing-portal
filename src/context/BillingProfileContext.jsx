import React, { useReducer, useState, useEffect, useContext } from "react";
import {
  mockCompanies,
  mockCampaigns
} from "components/new-invoice/mock/index";
import { get } from "utils/api";
import BillingProfileReducer from "reducers/BillingProfileReducer";
import { StateContext } from "./StateContext";
const initialState = {
  companies: mockCompanies,
  selectedCompany: mockCompanies[0].uuid,
  edit: false,
  campaignRates: [],
  selectedBillingType: "1"
};

const BillingContext = React.createContext(); // eslint-disable-line

const BillingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BillingProfileReducer, initialState);

  const {
    state: { applyPrevious }
  } = useContext(StateContext);

  const [rowCollapse, setRowCollapse] = useState([0, 1]);
  const [companyCampaigns, setCompanyCampaigns] = useState([]);
  const [formState, setFormState] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCompanyCampaigns = company_uuid => {
    const result = mockCampaigns.filter(item => item.company === company_uuid);
    return result;
  };
  const addRateObj = (companyDetails, campRates) => {
    console.log(companyDetails, "companyDetails")
    companyDetails.forEach(item => {
      const result = campRates.find(camp => camp.campaign_uuid === item.uuid);
      if (result) {
        item.edited = false;
        item.profile_id = result.profile_id;
        item.billable_rate = result.rates.billable_rate;
        item.did_rate = result.rates.did_rate;
        item.performance_rate = result.rates.performance_rate;
      } else {
        item.edited = false;
        item.profile_id = null;
        item.billable_rate = 0;
        item.did_rate = 0;
        item.performance_rate = 0;
      }
    });
    return companyDetails;
  };
  useEffect(() => {
    setLoading(true);
    setCompanyCampaigns(getCompanyCampaigns(state.selectedCompany));

    let url =
      `/api/rate/${state.selectedCompany}?original_data=${JSON.stringify(!applyPrevious)}&billing_type=${state.selectedBillingType}`

    console.log(url)
    get(url).then(result => {
      console.log(result, "rate result");

      // console.log(state.selectedCompany, "selectedCompany")
      setFormState(result.data[0]);
      setLoading(false);
    });
  }, [state.selectedCompany, applyPrevious, state.selectedBillingType]);

  const handleFieldChange = (e, index, type) => {
    let result = formState.map((item, i) => {
      if (i === index) {
        item.edited = true;
        item[type] = e.target.value;
      }
      return item;
    });
    setFormState(result);
  };
  state.loading = loading;
  return (
    <BillingContext.Provider
      value={{
        state,
        dispatch,
        companyCampaigns,
        rowCollapse,
        setRowCollapse,
        formState,
        setFormState,
        handleFieldChange
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export { BillingProvider, BillingContext };
