/* eslint-disable */
import React, { useContext } from "react";
import { Dialog } from "@material-ui/core";
import {
  AutomaticInvoiceContext,
  AutomaticInvoiceProvider
} from "context/AutomaticInvoiceContext";
import {
  TableLoader,
  LoadingNoDialog as LoadingModal,
  SuccessModal
} from "common-components";
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
  const {
    state,
    dispatch,
    createInvoice,
    createAnother,
    getBalance
  } = useContext(AutomaticInvoiceContext);
  const closeAll = () => {
    dispatch({
      type: "set-modal-type",
      payload: { modalType: "" }
    });
    handleClose();
  };
  const create = () => {
    dispatch({
      type: "set-modal-type",
      payload: { modalType: "" }
    });
    createAnother();
  };
  const balanceDue = getBalance();
  return (
    <React.Fragment>
      <NewInvoiceAppbar
        createFn={createInvoice}
        handleClose={handleClose}
        type="Automatic"
        balanceDue={balanceDue}
      />
      {!state.companies.length > 0 ? <TableLoader /> : <FormContent />}
      <Dialog
        open={state.modalType !== ""}
        disableBackdropClick
        disableEscapeKeyDown
      >
        {state.modalType === "loading" ? (
          <LoadingModal text={`One moment. We're saving the invoice...`} />
        ) : (
          <SuccessModal
            text="Success"
            content="Invoice successfully saved."
            closeFn={closeAll}
            secondaryFn={create}
            btnText="Create another"
          />
        )}
      </Dialog>
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
