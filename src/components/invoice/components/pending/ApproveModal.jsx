import React from "react";
import { Button, Divider } from "@material-ui/core";
import { Modal, LoadingModal } from "common-components";
import { StateContext } from "context/StateContext";
import { patch } from "utils/api";
import { postLog } from "utils/time";

const ApproveModal = () => {
  const {
    confirmModal,
    setConfirmModal,
    selectedItems,
    getPendingInvoicesData,
    setSelectedItems,
    state
  } = React.useContext(StateContext);

  const [loading, setLoading] = React.useState(false);
  const [approveCount, setApproveCount] = React.useState(0);

  const handleModalClose = () => {
    setConfirmModal({ ...confirmModal, approve: false });
  };

  const approveSelectedItems = async () => {
    setLoading(true);
    handleModalClose();
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i].status !== 2) {
        await patch(`/api/pending/edit/${selectedItems[i].id}`, {
          status: 2
        }).then(() => {
          setApproveCount(i + 1);
        });
      }
    }
    let desc;
    if (selectedItems.length > 1)
      desc = `${state.userProfile.name} approved ${selectedItems.length} invoices.`;
    else
      desc = `${state.userProfile.name} approved invoice #${selectedItems[0].id}.`;
    postLog({
      type: "approve-invoice",
      description: desc,
      invoiceId: null
    });
    setLoading(false);
    getPendingInvoicesData();
    setSelectedItems([]);
  };

  return (
    <React.Fragment>
      <Modal
        title={<b>Confirmation</b>}
        open={confirmModal.approve}
        onClose={handleModalClose}
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div>
          <h4 style={{ textAlign: "center" }}>
            Are you sure to approve this <b> {selectedItems.length} </b>
            {selectedItems.length > 1 ? "Invoices" : "Invoice"}?
          </h4>
          <Divider />
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              className="custom-btn"
              style={{ backgroundColor: "#2ca01d", color: "#FFF" }}
              variant="contained"
              onClick={approveSelectedItems}
            >
              <b>Approve</b>
            </Button>
            &emsp;
            <Button
              color="default"
              variant="contained"
              className="custom-btn"
              onClick={handleModalClose}
            >
              <b>Cancel</b>
            </Button>
          </div>
        </div>
      </Modal>

      <LoadingModal
        open={loading}
        text={`Approving ${approveCount} of ${selectedItems.length}`}
        cancelFn={() => {
          setLoading(false);
        }}
      />
    </React.Fragment>
  );
};

export default ApproveModal;
