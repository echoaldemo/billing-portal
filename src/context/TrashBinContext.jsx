import React, { useReducer, useEffect } from "react";
import { get, patch } from "utils/api";
const initialState = {
  data: [],
  loading: false
};
const TrashBinContext = React.createContext();

const TrashBinProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-data":
        return {
          ...state,
          data: action.payload.data,
          loading: action.payload.loading
        };

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

  return (
    <TrashBinContext.Provider
      value={{
        state,
        dispatch,
        updateTrashItem
      }}
    >
      {children}
    </TrashBinContext.Provider>
  );
};

export { TrashBinProvider, TrashBinContext };
