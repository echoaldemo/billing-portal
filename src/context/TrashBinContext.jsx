import React, { useReducer, useEffect, useState } from "react";
import { get, patch } from "utils/api";
import { mockCompanies } from "components/new-invoice/mock/index";
const initialState = {
  data: [],
  loading: false,
  companies: mockCompanies,
  selectedCompany: false,
  warningModal: false,
  restoreModal: false
};
const TrashBinContext = React.createContext();

const TrashBinProvider = ({ children }) => {
  const [originalData, setOriginalData] = useState([]);

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-data":
        return {
          ...state,
          data: action.payload.data,
          loading: action.payload.loading
        };
      case "set-selected-company":
        return {
          ...state,
          selectedCompany: action.payload.selectedCompany
        };

      case "set-warning-modal": {
        return {
          ...state,
          warningModal: action.payload.warningModal
        };
      }
      case "set-restore-modal": {
        return {
          ...state,
          restoreModal: action.payload.restoreModal
        };
      }

      default:
        return null;
    }
  }, initialState);
  const getTrashedItems = () => {
    dispatch({
      type: "set-data",
      payload: {
        loading: true,
        data: []
      }
    });

    get("/api/pending/deleted/list").then(result => {
      dispatch({
        type: "set-data",
        payload: {
          loading: false,
          data: result.data
        }
      });
      setOriginalData(result.data);
    });
  };

  const updateTrashItem = id => {
    patch(`/api/pending/edit/${id}`, { status: 0 }).then(result => {
      getTrashedItems();
    });
  };
  useEffect(() => {
    getTrashedItems();
  }, []);

  state.originalData = originalData;
  return (
    <TrashBinContext.Provider
      value={{
        state,
        dispatch,
        updateTrashItem,
        getTrashedItems
      }}
    >
      {children}
    </TrashBinContext.Provider>
  );
};

export { TrashBinProvider, TrashBinContext };
