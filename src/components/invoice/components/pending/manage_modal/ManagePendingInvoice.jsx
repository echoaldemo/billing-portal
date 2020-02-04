import React from "react";
import { StateContext } from "context/StateContext";
import { Modal, TableLoader } from "common-components";
import { TableStepper } from "common-components";
import { Divider, Button } from "@material-ui/core";
import InvoiceDetails from "./InvoiceDetails";
import ManagePendingFooter from "./components/ManagePendingFooter";
const EditButton = () => {
  const { state, dispatch } = React.useContext(StateContext);
  return (
    <Button
      style={{
        textTransform: "none",
        fontWeight: "bold",
        color: "#FFF"
      }}
      onClick={() => {
        dispatch({
          type: "set-edit-manage-data",
          payload: { editManageData: !state.editManageData }
        });
      }}
    >
      {state.editManageData ? "Save" : "Edit"}
    </Button>
  );
};

export default function ManagePendingInvoice() {
  const { state, dispatch, modalLoading } = React.useContext(StateContext);

  return (
    <Modal
      square={true}
      open={state.openManage}
      // open={true}
      onClose={() => {
        dispatch({ type: "set-manage-modal", payload: { openManage: false } });
      }}
      title={<b>Manage Pending Invoice</b>}
      width={930}
      renderEditButton={EditButton}
    >
      {modalLoading ? (
        <TableLoader />
      ) : (
        <React.Fragment>
          <TableStepper activeStep={1} />
          <Divider />
          <InvoiceDetails />

          <ManagePendingFooter />
        </React.Fragment>
      )}
    </Modal>
  );
}
