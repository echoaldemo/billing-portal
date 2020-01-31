import React from "react";
import { StateContext } from "context/StateContext";
import { Modal } from "common-components";
import { TableStepper } from "common-components";
import { Divider } from "@material-ui/core";
import InvoiceDetails from "./InvoiceDetails";

export default function ManagePendingInvoice() {
  const { state, dispatch } = React.useContext(StateContext);

  return (
    <Modal
      square={true}
      open={state.openManage}
      onClose={() => {
        dispatch({ type: "set-manage-modal", payload: { openManage: false } });
      }}
      title={<b>Manage Pending Invoice</b>}
      width={800}
    >
      <TableStepper activeStep={1} />
      <Divider />
      <InvoiceDetails />

      <Divider />

      <h4>Elit consequat ex ipsum tempor quis id sit ipsum voluptate.</h4>
    </Modal>
  );
}
