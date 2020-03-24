import React, { useReducer, useState, useEffect, useContext } from "react";
import {
  mockCompanies,
  mockCampaigns
} from "components/new-invoice/mock/index";
import { get, getAPI } from "utils/api";
import BillingProfileReducer from "reducers/BillingProfileReducer";
import { StateContext } from "./StateContext";
const initialState = {
  companies: [],
  campaigns: [],
  selectedCompany: null,
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
  const [rateProfile, setRateProfile] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const addRateObj = companyDetails => {
    companyDetails.forEach(item => {
      item.content = {
        bill_rate: "",
        perfomance_rate: "",
        did_rate: ""
      };
    });
    return companyDetails;
  };
  const getCompanyCampaigns = company_uuid => {
    const result = state.campaigns.filter(
      item => item.company === company_uuid
    );
    return result;
  };
  const getCompanyDetails = selectedCompany => {
    const result = state.companies.find(comp => comp.uuid === selectedCompany);
    return result;
  };
  useEffect(async () => {
    const { data: companies } = await getAPI("/identity/company/list");
    dispatch({
      type: "set-companies",
      payload: { companies }
    });
    dispatch({
      type: "set-selected-company",
      payload: { selectedCompany: companies[0].uuid }
    });
    const { data: campaigns } = await getAPI("/identity/campaign/list");
    dispatch({
      type: "set-campaigns",
      payload: { campaigns }
    });
  }, []);
  const fetchData = () => {
    console.log(state);
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
  useEffect(() => {
    if (state.selectedCompany) {
      fetchData();
    }
  }, [state.selectedCompany, applyPrevious, state.selectedBillingType]);

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
