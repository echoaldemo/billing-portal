import React from "react";
import { Dialog, Divider, AppBar } from "@material-ui/core";
import { StateContext } from "context/StateContext";
import "./style/index.scss";
import { Modal } from "common-components";
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
      <h1>asdsad</h1>
    </Modal>
  );
}
