import React from "react";
import {
  Button,
  IconButton,
  Tooltip,
  Divider,
  Dialog
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Modal, LoadingModal } from "common-components";
import { StateContext } from "context/StateContext";
import { remove } from "utils/api";

export default function PendingCheckboxToolbar() {
  const initialState = {
    approved: false,
    delete: false
  };
  const [confirmModal, setConfirmModal] = React.useState(initialState);

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

      <DeleteModal
        confirmModal={confirmModal}
        setConfirmModal={setConfirmModal}
      />
    </div>
  );
}

const DeleteModal = ({ confirmModal, setConfirmModal }) => {
  const {
    selectedItems,
    getPendingInvoicesData,
    setSelectedItems
  } = React.useContext(StateContext);

  const [loading, setLoading] = React.useState(false);
  const [deleteCount, setDeleteCount] = React.useState(0);
  const handleModalClose = () => {
    setConfirmModal({ ...confirmModal, delete: false });
  };

  const deleteSelectedInvoices = async () => {
    handleModalClose();
    setLoading(true);
    for (const selectedItem of selectedItems) {
      await remove(`/api/pending/delete/${selectedItem.id}`).then(() => {
        setDeleteCount(deleteCount + 1);
      });
    }

    setTimeout(() => {
      setLoading(false);
      getPendingInvoicesData();
      setSelectedItems([]);
    }, 500);
  };

  return (
    <React.Fragment>
      <Modal
        title={<b>Confirmation</b>}
        open={confirmModal.delete}
        onClose={handleModalClose}
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center"
        }}
        renderEditButton={false}
      >
        <div>
          <h4>
            Are you sure want to delete this <b> {selectedItems.length} </b>
            {selectedItems.length > 1 ? "Invoices" : "Invoice"}?
          </h4>
          <Divider />
          <br />
          <Button
            color="secondary"
            variant="contained"
            onClick={deleteSelectedInvoices}
          >
            YES
          </Button>
          &emsp;
          <Button
            color="default"
            variant="contained"
            onClick={handleModalClose}
          >
            NO
          </Button>
        </div>
      </Modal>

      <LoadingModal
        open={loading}
        text={`Deleting ${deleteCount} of ${selectedItems.length}`}
        cancelFn={() => {
          setLoading(false);
        }}
      />
    </React.Fragment>
  );
};
