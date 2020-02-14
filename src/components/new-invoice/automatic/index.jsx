/* eslint-disable */
import React, { useContext } from "react";
import {
  AutomaticInvoiceContext,
  AutomaticInvoiceProvider
} from "context/AutomaticInvoiceContext";
import { TableLoader } from "common-components";
import NewInvoiceAppbar from "../components/NewInvoiceAppbar";
import GeneralForm from "./GeneralForm";
import BillingForm from "./BillingForm";
const FormContent = () => {
  return (
    <form>
      <GeneralForm />
      <BillingForm />
    </form>
  );
};

const NewInvoice = ({ handleClose }) => {
  const { state } = useContext(AutomaticInvoiceContext);
  return (
    <React.Fragment>
      <NewInvoiceAppbar handleClose={handleClose} type="Automatic" />
      {!state.companies.length > 0 ? <TableLoader /> : <FormContent />}
    </React.Fragment>
  );
};

const Automatic = ({ handleClose }) => {
  return (
    <AutomaticInvoiceProvider>
      <NewInvoice handleClose={handleClose} />
    </AutomaticInvoiceProvider>
  );
};

export default Automatic;
