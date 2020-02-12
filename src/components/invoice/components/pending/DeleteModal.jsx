import React from "react";
import { Button, Divider } from "@material-ui/core";
import { Modal, LoadingModal } from "common-components";
import { StateContext } from "context/StateContext";
import { remove } from "utils/api";

const DeleteModal = () => {
  const {
    selectedItems,
    setSelectedItems,
    getPendingInvoicesData,
    confirmModal,
    setConfirmModal
  } = React.useContext(StateContext);

  const [loading, setLoading] = React.useState(false);
  const [deleteCount, setDeleteCount] = React.useState(0);
  const handleModalClose = () => {
    setConfirmModal({ ...confirmModal, delete: false });
  };

  const deleteSelectedInvoices = async () => {
    handleModalClose();
    setLoading(true);
    for (let i = 0; i < selectedItems.length; i++) {
      await remove(`/api/pending/delete/${selectedItems[i].id}`).then(() => {
        setDeleteCount(i + 1);
      });
    }

    setLoading(false);
    setSelectedItems([]);
    getPendingInvoicesData();
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

export default DeleteModal;
