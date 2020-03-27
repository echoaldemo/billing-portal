import React, { useReducer, useState, useEffect, useContext } from "react";
import { get, getAPI } from "utils/api";
import BillingProfileReducer from "reducers/BillingProfileReducer";
import { StateContext } from "./StateContext";
import { IdentityContext } from "context/IdentityContext"

const BillingContext = React.createContext(); // eslint-disable-line


const BillingProvider = ({ children }) => {
  const {
    state: { applyPrevious }
  } = useContext(StateContext);
  const { identityState: { companies, campaigns } } = useContext(IdentityContext)

  const initialState = {
    companies: [],
    campaigns: [],
    selectedCompany: false,
    edit: false,
    campaignRates: [],
    selectedBillingType: "1"
  };

  const [state, dispatch] = useReducer(BillingProfileReducer, initialState);
  const [rowCollapse, setRowCollapse] = useState([0, 1]);
  const [companyCampaigns, setCompanyCampaigns] = useState([]);
  const [formState, setFormState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rateProfile, setRateProfile] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  useEffect(() => {
    if (!state.selectedCompany && companies.length > 0) {
      dispatch({
        type: "set-selected-company",
        payload: { selectedCompany: companies[0].uuid }
      });
    }
    fetchData();
  }, [
    state.selectedCompany,
    companies,
    campaigns,
    applyPrevious,
    state.selectedBillingType
  ]);
  const apiCall = async () => {
    dispatch({
      type: "set-companies",
      payload: { companies: companies }
    });
    dispatch({
      type: "set-selected-company",
      payload: { selectedCompany: companies[0].uuid }
    });
    dispatch({
      type: "set-campaigns",
      payload: { campaigns: campaigns }
    });

  };
  const fetchData = () => {
    setLoading(true);
    setCompanyDetails(getCompanyDetails(state.selectedCompany));
    setCompanyCampaigns(getCompanyCampaigns(state.selectedCompany));
    let url = `/api/rate/${
      state.selectedCompany
      }?original_data=${JSON.stringify(!applyPrevious)}&billing_type=${
      state.selectedBillingType
      }`;
    get(url).then(result => {
      if (result.data[0]) {
        let profile_id = result.data[0].profile_id;
        let rates = result.data[0] ? result.data[0].rates : null;
        setRateProfile(profile_id);
        setFormState(rates);
      } else {
        setRateProfile(null);
        setFormState(addRateObj(getCompanyCampaigns(state.selectedCompany)));
      }
      setLoading(false);
    });
  };
  const addRateObj = companyDetails => {
    companyDetails.forEach(item => {
      item.content = {
        bill_rate: "",
        performance_rate: "",
        did_rate: ""
      };
    });
    return companyDetails;
  };
  const getCompanyCampaigns = company_uuid => {
    const result = campaigns.filter(
      item => item.company === company_uuid
    );
    return result;
  };
  const getCompanyDetails = selectedCompany => {
    const result = companies.find(comp => comp.uuid === selectedCompany);
    return result;
  };
  const handleFieldChange = (e, index, type) => {
    let result = formState.map((item, i) => {
      if (i === index) {
        item.content[type] = e.target.value;
      }
      return item;
    });
    setFormState(result);
  };
  state.loading = loading;
  state.companyDetails = companyDetails;
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
        handleFieldChange,
        rateProfile
      }}
    >
      {children}
    </BillingContext.Provider>
  );
};

export { BillingProvider, BillingContext };
