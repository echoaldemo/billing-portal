/* eslint-disable */
import React, { useContext } from "react";
import {
  ManualInvoiceContext,
  ManualInvoiceProvider
} from "context/ManualInvoiceContext";
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
  const { state } = useContext(ManualInvoiceContext);
  return (
    <React.Fragment>
      <NewInvoiceAppbar handleClose={handleClose} />
      {!state.companies.length > 0 ? <TableLoader /> : <FormContent />}
    </React.Fragment>
  );
};

const Manual = ({ handleClose }) => {
  return (
    <ManualInvoiceProvider>
      <NewInvoice handleClose={handleClose} />
    </ManualInvoiceProvider>
  );
};

export default Manual;
