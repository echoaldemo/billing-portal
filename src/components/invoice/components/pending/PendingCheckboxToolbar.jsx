import React from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import DeleteModal from "./DeleteModal";
import ApproveModal from "./ApproveModal";
import DuplicateItems from "./DuplicateItems";
import { StateContext } from "context/StateContext";
import { post } from "utils/api";
import { postLog, formatArray } from "utils/time";
export default function PendingCheckboxToolbar() {
  const {
    confirmModal,
    setConfirmModal,
    selectedItems,
    getPendingInvoicesData,
    setSelectedItems,
    state
  } = React.useContext(StateContext);
  const [duplicateLoading, setDuplicateLoading] = React.useState(false);
  const [duplicateCount, setDuplicateCount] = React.useState(0);

  const duplicateSelectedItems = async () => {
    setDuplicateLoading(true);
    let nameArr = [];
    for (let i = 0; i < selectedItems.length; i++) {
      let { id, ...rest } = selectedItems[i];
      await post(`/api/create_pending`, { ...rest, status: 0 }).then(() => {
        setDuplicateCount(i + 1);
      });
      nameArr.push(`#${selectedItems[i].id}`);
    }
    postLog({
      type: "duplicate-invoice",
      description: `${state.userProfile.name} duplicated invoice ${formatArray(
        nameArr
      )}.`,
      invoiceId: null
    });
    setDuplicateLoading(false);
    getPendingInvoicesData();
    setSelectedItems([]);
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Button
        style={{
          textTransform: "none",
          border: "solid 1px #F1F1F1",
          paddingLeft: 10,
          paddingRight: 10
        }}
        color="default"
        onClick={() => {
          setConfirmModal({ ...confirmModal, approve: true });
        }}
      >
        <b>Mark as Approved</b>
      </Button>
      &emsp;
      <Button
        style={{
          textTransform: "none",
          border: "solid 1px #F1F1F1",
          paddingLeft: 10,
          paddingRight: 10
        }}
        color="default"
        onClick={() => {
          duplicateSelectedItems();
        }}
      >
        <b>Duplicate Items</b>
      </Button>
      &emsp;
      <Tooltip title="Delete Marked Invoices" placement="top">
        <IconButton
          onClick={() => {
            setConfirmModal({ ...confirmModal, delete: true });
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <DeleteModal />
      <ApproveModal />
      <DuplicateItems
        duplicateLoading={duplicateLoading}
        setDuplicateLoading={setDuplicateLoading}
        duplicateCount={duplicateCount}
      />
    </div>
  );
}
