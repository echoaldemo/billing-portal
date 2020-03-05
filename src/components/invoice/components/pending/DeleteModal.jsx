import React from "react";
import { Dialog } from "@material-ui/core";
import {
  WarningModal,
  LoadingNoDialog as LoadingModal
} from "common-components";
import { StateContext } from "context/StateContext";
import { remove, patch } from "utils/api";
import { postLog } from "utils/time";
const appendLeadingZeroes = n => {
  if (n <= 9) {
    return "0" + n;
  }
  return n;
};
const DeleteModal = () => {
  const {
    selectedItems,
    setSelectedItems,
    getPendingInvoicesData,
    confirmModal,
    setConfirmModal,
    state
  } = React.useContext(StateContext);

  const [loading, setLoading] = React.useState(false);
  const [deleteCount, setDeleteCount] = React.useState(0);
  const handleModalClose = () => {
    setConfirmModal({ ...confirmModal, delete: false });
  };

  const deleteSelectedInvoices = async () => {
    setLoading(true);
    for (let i = 0; i < selectedItems.length; i++) {
      await patch(`/api/pending/edit/${selectedItems[i].id}`, {
        status: 3
      }).then(() => {
        setDeleteCount(i + 1);
      });
    }

    let desc;
    if (selectedItems.length > 1)
      desc = `${state.userProfile.name} deleted ${selectedItems.length} invoices.`;
    else
      desc = `${state.userProfile.name} deleted an invoice for ${selectedItems[0].company.name}.`;
    postLog({
      type: "delete-invoice",
      description: desc,
      invoiceId: null
    });
    setTimeout(() => {
      setLoading(false);
      handleModalClose();
      setSelectedItems([]);
      getPendingInvoicesData();
    }, 500);
  };
  let content = "Are you sure want to delete";
  if (selectedItems.length === 1) content += " this invoice";
  else content += " these invoices";
  content += "? This process is irreversible.";
  return (
    <React.Fragment>
      <Dialog
        open={confirmModal.delete}
        disableBackdropClick
        disableEscapeKeyDown
      >
        {!loading ? (
          <WarningModal
            text="Confirmation"
            content={content}
            closeFn={handleModalClose}
            secondaryFn={deleteSelectedInvoices}
            btnText="Continue"
          />
        ) : (
          <LoadingModal
            text={`Deleting ${deleteCount} of ${selectedItems.length}`}
            cancelFn={() => {
              setLoading(false);
            }}
          />
        )}
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteModal;
