import React from "react";
import { SupportProvider } from "context/SupportContext";
import Upper from "./components/Upper";
import Message from "./components/Message";
import Modals from "./components/Modals";
import { StyledPaper } from "./styles";

const ContactSupportComponent = () => {
  return (
    <React.Fragment>
      <StyledPaper>
        <Upper />
        <Message />
        <Modals />
      </StyledPaper>
    </React.Fragment>
  );
};

const ContactSupport = props => {
  return (
    <SupportProvider>
      <ContactSupportComponent {...props} />
    </SupportProvider>
  );
};

export default ContactSupport;
