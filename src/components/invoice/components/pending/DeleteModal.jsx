import React from "react";
import { Dialog } from "@material-ui/core";
import {
  WarningModal,
  LoadingNoDialog as LoadingModal
} from "common-components";
import { StateContext } from "context/StateContext";
import { remove, post } from "utils/api";
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
      await remove(`/api/pending/delete/${selectedItems[i].id}`).then(() => {
        setDeleteCount(i + 1);
      });
    }
    const today = new Date();
    const dateToday =
      today.getFullYear() +
      "-" +
      appendLeadingZeroes(today.getMonth() + 1) +
      "-" +
      appendLeadingZeroes(today.getDate());
    let desc;
    if (selectedItems.length > 1)
      desc = `${state.userProfile.name} deleted ${selectedItems.length} invoices.`;
    else
      desc = `${state.userProfile.name} deleted an invoice for ${selectedItems[0].company.name}.`;
    const logData = {
      date: dateToday,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      }),
      type: "delete-invoice",
      description: desc,
      invoiceId: null
    };
    post("/api/logs/create", logData);
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
