import React, { useReducer, useEffect } from "react";
import { get } from "utils/api";
const initialState = {
  logs: [],
  logsLoading: true
};
const OverviewContext = React.createContext();

const OverviewProvider = ({ children }) => {
  useEffect(() => {
    getLogs();
  }, []);
  const getLogs = () => {
    get("/api/logs/list").then(res => {
      dispatch({
        type: "set-logs",
        payload: { logs: res.data }
      });
      setTimeout(() => {
        dispatch({
          type: "set-logs-loading",
          payload: { logs: false }
        });
      }, 2000);
    });
  };
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-logs":
        return { ...state, logs: action.payload.logs };
      case "set-logs-loading":
        return { ...state, logsLoading: action.payload.logsLoading };
      default:
        return null;
    }
  }, initialState);
  return (
    <OverviewContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </OverviewContext.Provider>
  );
};

export { OverviewProvider, OverviewContext };
