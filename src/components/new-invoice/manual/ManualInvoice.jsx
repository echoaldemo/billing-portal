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
const FormContent = ({ duplicate }) => {
  return (
    <form>
      <GeneralForm duplicate={duplicate} />
      <BillingForm duplicate={duplicate} />
    </form>
  );
};

const NewInvoice = ({ handleClose, duplicate }) => {
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
        createFn={(type) => {
          createManualInvoice(type, handleClose);
        }}
        handleClose={handleClose}
      />
      {!state.companies.length > 0 ? (
        <TableLoader />
      ) : (
        <FormContent duplicate={duplicate} />
      )}

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

const Manual = ({ handleClose, duplicate }) => {
  return (
    <ManualInvoiceProvider>
      <NewInvoice handleClose={handleClose} duplicate={duplicate} />
    </ManualInvoiceProvider>
  );
};

export default Manual;
