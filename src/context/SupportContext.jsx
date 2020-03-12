import React, { useReducer, useContext } from "react";
import { StateContext } from "context/StateContext";
import { post } from "utils/api";
import { template } from "../layout/EmailTemp";

const initialState = {
  subject: "",
  description: "",
  attachment: null,
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
  const upload = () => {
    const file = state.attachment;
    const data = new FormData();
    data.append("profileImage", file, file.name);
    return post("/aws/upload/profile-img-upload", data, {
      headers: {
        accept: "application/json",
        "Accept-Language": "en-US,en;q=0.8",
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`
      }
    });
  };
  const handleSubmit = () => {
    dispatch({
      type: "set-modal",
      payload: { modal: "loading" }
    });
    const up = upload();
    up.then(res => {
      const image = res.data.location;
      const { familyName, givenName, email } = profile.userProfile;
      const postObjectGmail = {
        name: `${givenName} ${familyName}`,
        email,
        subject: state.subject,
        description: template(
          `${givenName} ${familyName}`,
          email,
          state.description,
          image
        ),
        attachment: image
      };
      const postObjectSlack = {
        name: `${givenName} ${familyName}`,
        email,
        subject: state.subject,
        description: state.description,
        attachment: image
      };
      /* const req1 = post("/api/zapier/gmail", postObjectGmail);
      const req2 = post("/api/zapier/slack", postObjectSlack); */
      /* Promise.all([req1, req2]).then(() => { */
      setTimeout(() => {
        dispatch({
          type: "set-modal",
          payload: { modal: "success" }
        });
      }, 1000);
      /* }); */
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
