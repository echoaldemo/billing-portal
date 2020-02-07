import React from "react";
import { Button, IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import DeleteModal from "./DeleteModal";
import ApproveModal from "./ApproveModal";
import DuplicateItems from "./DuplicateItems";
import { StateContext } from "context/StateContext";
import { post } from "utils/api";
export default function PendingCheckboxToolbar() {
  const {
    confirmModal,
    setConfirmModal,
    selectedItems,
    getPendingInvoicesData,
    state,
    setSelectedItems
  } = React.useContext(StateContext);
  const [duplicateLoading, setDuplicateLoading] = React.useState(false);
  const [duplicateCount, setDuplicateCount] = React.useState(0);

  const duplicateSelectedItems = async () => {
    setDuplicateLoading(true);
    for (let i = 0; i < selectedItems.length; i++) {
      let { id, ...rest } = selectedItems[i];
      await post(`/api/create_pending`, rest).then(() => {
        setDuplicateCount(i + 1);
      });
    }

    setDuplicateLoading(false);
    getPendingInvoicesData();
    setSelectedItems([]);
  };
  return (
    <div className="display-space-between p-normal">
      <div>
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
      </div>
      <Tooltip title="Delete Marked Invoices" placement="top">
        <IconButton
          style={{ padding: 5 }}
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
