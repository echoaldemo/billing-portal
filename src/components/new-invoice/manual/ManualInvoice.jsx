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
import { Divider } from "@material-ui/core";
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

const Manual = () => {
  return (
    <ManualInvoiceProvider>
      <NewInvoice />
    </ManualInvoiceProvider>
  );
};

export default Manual;
