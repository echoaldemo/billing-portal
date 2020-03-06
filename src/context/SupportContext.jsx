import React, { useReducer, useContext } from "react";
import { StateContext } from "context/StateContext";
import { post } from "utils/api";

const initialState = {
  subject: "",
  description: "",
  attachment: "",
  modal: null
};
const SupportContext = React.createContext();

const SupportProvider = ({ children }) => {
  const { state: profile } = useContext(StateContext);
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set-subject":
        return { ...state, subject: action.payload.subject };
      case "set-description":
        return { ...state, description: action.payload.description };
      case "set-attachment":
        return { ...state, attachment: action.payload.attachment };
      case "set-modal":
        return { ...state, modal: action.payload.modal };
      case "reset-state":
        return initialState;
      default:
        return null;
    }
  }, initialState);
  console.log(state);
  const handleSubmit = () => {
    dispatch({
      type: "set-modal",
      payload: { modal: "loading" }
    });
    const { familyName, givenName, email } = profile.userProfile;
    const postObject = {
      name: `${givenName} ${familyName}`,
      email,
      subject: state.subject,
      description: state.description,
      attachment: state.attachment
    };
    const req1 = post("/api/zapier/gmail", postObject);
    const req2 = post("/api/zapier/slack", postObject);
    Promise.all([req1, req2]).then(() => {
      setTimeout(() => {
        dispatch({
          type: "set-modal",
          payload: { modal: "success" }
        });
      }, 1000);
    });
  };
  return (
    <SupportContext.Provider
      value={{
        state,
        dispatch,
        handleSubmit
      }}
    >
      {children}
    </SupportContext.Provider>
  );
};

export { SupportProvider, SupportContext };
