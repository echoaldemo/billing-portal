/* eslint-disable */
import React, { useContext } from "react";
import {
  ManualInvoiceContext,
  ManualInvoiceProvider
} from "context/ManualInvoiceContext";
import { StateContext } from "context/StateContext";
import { TableLoader, LoadingModal, SuccessModal } from "common-components";
import NewInvoiceAppbar from "../components/NewInvoiceAppbar";
import GeneralForm from "./GeneralForm";
import BillingForm from "./BillingForm";
import { Dialog } from "@material-ui/core";
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
    createManualInvoice,
    createLoading,
    showCreateNew,
    setShowCreateNew,
    resetAllFormState
  } = useContext(ManualInvoiceContext);
  const { getPendingInvoicesData } = useContext(StateContext);

  return (
    <React.Fragment>
      <NewInvoiceAppbar
        createFn={type => {
          createManualInvoice(type, handleClose);
        }}
        handleClose={handleClose}
      />
      {!state.companies.length > 0 ? <TableLoader /> : <FormContent />}

      <LoadingModal
        open={createLoading}
        text={`Creating new manual invoice`}
        cancelFn={() => {
          setLoading(false);
        }}
      />

      <Dialog open={showCreateNew}>
        <SuccessModal
          text="Success"
          content="Invoice successfully saved."
          closeFn={() => {
            setShowCreateNew(false);
            handleClose();
            getPendingInvoicesData();
          }}
          secondaryFn={() => {
            setShowCreateNew(false);
            resetAllFormState();
          }}
          btnText="Create another"
        />
      </Dialog>
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
