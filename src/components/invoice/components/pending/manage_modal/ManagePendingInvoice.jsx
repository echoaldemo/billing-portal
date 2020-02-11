import React from "react";
import { StateContext } from "context/StateContext";
import { Modal, TableLoader, LoadingModal } from "common-components";
import { TableStepper } from "common-components";
import { Divider, Button } from "@material-ui/core";
import InvoiceDetails from "./InvoiceDetails";
import ManagePendingFooter from "./components/ManagePendingFooter";
import { patch } from "utils/api";

export default function ManagePendingInvoice() {
  const {
    state,
    dispatch,
    formState,
    modalLoading,
    setModalLoading,
    setFormState,
    getPendingInvoicesData
  } = React.useContext(StateContext);

  const handleSave = () => {
    dispatch({
      type: "set-edit-manage-data",
      payload: { editManageData: !state.editManageData }
    });
    dispatch({
      type: "set-update-loading",
      payload: { updateLoading: true }
    });
    const { id, ...rest } = formState;
    const { billable, performance, did } = state.itemTable;
    const last = rest.Line[rest.Line.length - 1];
    rest.Line = [];
    if (billable.amt !== 0) {
      rest.Line.push({
        DetailType: "SalesItemLineDetail",
        Amount: (billable.qty || 1) * (billable.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: "21",
            name: "Billable hours"
          },
          TaxCodeRef: {
            value: state.tax ? "TAX" : "NON"
          },
          Qty: billable.qty || 1,
          UnitPrice: billable.rate || 0
        }
      });
    }
    if (performance.amt !== 0) {
      rest.Line.push({
        DetailType: "SalesItemLineDetail",
        Amount: (performance.qty || 1) * (performance.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: "22",
            name: "Performance"
          },
          TaxCodeRef: {
            value: state.tax ? "TAX" : "NON"
          },
          Qty: performance.qty || 1,
          UnitPrice: performance.rate || 0
        }
      });
    }
    last.Amount = billable.amt + performance.amt + did.amt;
    rest.total = billable.amt + performance.amt + did.amt;
    rest.Line.push(last);
    // console.log('REST', rest)
    patch(`/api/pending/edit/${id}`, rest)
      .then(res => {
        dispatch({
          type: "set-update-loading",
          payload: { updateLoading: false }
        });
        dispatch({
          type: "set-selected-data",
          payload: { selectedData: res.data }
        });
      })
      .then(() => {
        getPendingInvoicesData();
      });
  };

  const EditButton = () => {
    return (
      <>
        {state.editManageData ? (
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
              setFormState(state.selectedData);
              setModalLoading(true);
              setTimeout(() => {
                setModalLoading(false);
              }, 500);
            }}
          >
            Cancel
          </Button>
        ) : null}
        {state.editManageData ? (
          <Button
            style={{
              textTransform: "none",
              fontWeight: "bold",
              color: "#FFF"
            }}
            onClick={handleSave}
          >
            Save
          </Button>
        ) : (
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
            Edit
          </Button>
        )}
      </>
    );
  };

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
          <TableStepper activeStep={state.selectedData.status + 1} />
          <Divider />
          <InvoiceDetails />
          <LoadingModal
            open={state.updateLoading}
            text={`One moment. We're updating stage status…`}
            cancelFn={() => {
              dispatch({
                type: "set-update-loading",
                payload: { updateLoading: false }
              });
            }}
          />
          <ManagePendingFooter />
        </React.Fragment>
      )}
    </Modal>
  );
}
