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
  SuccessModal,
  WarningModal
} from "common-components";
import NewInvoiceAppbar from "../components/NewInvoiceAppbar";
import GeneralForm from "./GeneralForm";
import BillingForm from "./BillingForm";
import SEO from "utils/seo";
import styled from "styled-components";
import { Block } from "@material-ui/icons";

const NoResult = styled(Block)`
  font-size: 36px !important;
  color: #ff504d;
`;

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
    getBalance,
    formState,
    selectedCampaign
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
  const openWarning = () => {
    if (getBalance()) {
      dispatch({
        type: "set-modal-type",
        payload: { modalType: "warning" }
      });
    } else {
      handleClose();
    }
  };
  const closePopUp = () => {
    dispatch({
      type: "set-modal-type",
      payload: { modalType: "" }
    });
  };
  return (
    <React.Fragment>
      <SEO title="New Automatic Invoice" />
      <NewInvoiceAppbar
        createFn={createInvoice}
        handleClose={handleClose}
        openWarning={openWarning}
        type="Automatic"
        balance={getBalance()}
        campaigns={selectedCampaign.length}
        selectedCompany={formState.company}
      />
      {!state.companies.length > 0 ? <TableLoader /> : <FormContent />}

      <Dialog
        open={state.modalType !== ""}
        disableBackdropClick
        disableEscapeKeyDown
      >
        <React.Fragment>
          {state.modalType === "loading" ? (
            <LoadingModal text={`One moment. We're saving the invoice...`} />
          ) : state.modalType === "warning" ? (
            <WarningModal
              text="Confirmation"
              content="Are you sure you want to close this dialog? Your progress will not be saved."
              closeFn={closePopUp}
              secondaryFn={closeAll}
              btnText="Close"
            />
          ) : state.modalType === "success" ? (
            <SuccessModal
              text="Success"
              content="Invoice successfully saved."
              closeFn={closeAll}
              secondaryFn={create}
              btnText="Create another"
            />
          ) : state.modalType === "no-result" ? (
            <WarningModal
              icon={<NoResult />}
              text="No results found"
              content="This company was not active for this period. Please change the billing period or manually enter the invoice details."
              secondaryFn={closePopUp}
              btnText="Continue"
              hideCancel={true}
            />
          ) : null}
        </React.Fragment>
      </Dialog>
    </React.Fragment>
  );
};

const Automatic = ({ handleClose, openWarning }) => {
  return (
    <AutomaticInvoiceProvider>
      <NewInvoice handleClose={handleClose} openWarning={openWarning} />
    </AutomaticInvoiceProvider>
  );
};

export default Automatic;
