import React, { useReducer } from "react";

const initialState = {
  loading: false
};
const StateContext = React.createContext();

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-loading":
        return { ...state, loading: action.payload.loading };
      default:
        return null;
    }
  }, initialState);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

const SampleComponents = () => {
  const { state } = useContext(StateContext);

  return (
    <StateProvider>
      <div>{JSON.stringify(state.loading)}</div>
    </StateProvider>
  );
};

export { StateProvider, StateContext };
