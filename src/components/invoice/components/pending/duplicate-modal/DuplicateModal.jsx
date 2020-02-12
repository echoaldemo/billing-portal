import React, { useContext } from "react";
import Manual from "components/new-invoice/manual/ManualInvoice";
import Automatic from "components/new-invoice/automatic/AutomaticInvoiceOld";
import { Dialog, Slide } from "@material-ui/core";
import { StateContext } from "context/StateContext";

const DuplicateModal = () => {
  const { state, dispatch } = useContext(StateContext);

  const handleClose = () => {
    dispatch({
      type: "set-duplicate-modal",
      payload: { openDuplicate: false }
    });
  };

  const renderLoading = () => {
    dispatch({
      type: "set-duplicate-modal",
      payload: { openDuplicate: false }
    });
  };
  return (
    <Dialog
      open={state.openDuplicate}
      fullScreen
      disableBackdropClick
      disableEscapeKeyDown
      TransitionComponent={Transition}
    >
      <div style={{ minWidth: "80vw" }}>
        {typeof state.selectedData.invoiceType ===
        "undefined" ? null : state.selectedData.invoiceType.match(/manual/i) ? (
          <Manual
            handleClose={handleClose}
            duplicate={state.selectedData}
            renderLoading={renderLoading}
          />
        ) : state.selectedData.invoiceType.match(/auto/i) ? (
          <Automatic
            handleClose={handleClose}
            duplicate={state.selectedData}
            renderLoading={renderLoading}
          />
        ) : null}
      </div>
    </Dialog>
  );
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default DuplicateModal;
