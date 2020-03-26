import React, { useReducer, useEffect, useState } from "react";
import IdentityReducer from "reducers/IdentityReducers"
import { getAPI } from "utils/api";

const initialState = {
  companies: [],
  campaigns: [],
};
const IdentityContext = React.createContext();

const IdentityProvider = ({ children }) => {
  const [identityState, identityDispatch] = useReducer(IdentityReducer, initialState);
  const [loading, setLoading] = useState(false)
  const getIdentityData = async () => {
    const { data: companies } = await getAPI("/identity/company/list");
    const { data: temp } = await getAPI("/identity/campaign/list");
    identityDispatch({
      type: "set-data",
      payload: {
        companies,
        campaigns: temp
      }
    })
  }

  useEffect(() => {
    getIdentityData()
  }, [])

  identityState.loading = loading
  return (
    <IdentityContext.Provider
      value={{
        identityState,
        identityDispatch
      }}
    >
      {children}
    </IdentityContext.Provider>
  );
};

export { IdentityContext, IdentityProvider };
