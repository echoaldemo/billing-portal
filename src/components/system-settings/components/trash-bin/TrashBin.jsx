import React, { useContext } from "react";
import { TrashBinProvider, TrashBinContext } from "context/TrashBinContext";
import TrashBinItems from "./TrashBinItems";
import { TableLoader } from "common-components";
import { Button, Grid, Dialog } from "@material-ui/core";
import SelectCompanyField from "./SelectCompanyField";
import { WarningModal } from "common-components";
import { remove, patch } from "utils/api";
import { NoResult } from "common-components";
import { postLog } from "utils/time";
import { StateContext } from "context/StateContext";
const TrashBin = () => {
  const {
    state: { loading, warningModal, data },
    dispatch,
    getTrashedItems,
    updateTrashItem
  } = useContext(TrashBinContext);
  const { state: profile } = React.useContext(StateContext);

  const handleCloseModal = () => {
    dispatch({
      type: "set-warning-modal",
      payload: { warningModal: false }
    });
  };

  const deleteAllTrash = () => {
    handleCloseModal();
    data.forEach(element => {
      remove(`/api/pending/delete/${element.id}`).then(() => {
        getTrashedItems();
      });
    });
    postLog({
      type: "delete-permanently",
      description: `${profile.userProfile.name} permanently deleted ${
        data.length
      } invoice${data.length > 1 ? "s." : "."}`,
      invoiceId: null
    });
  };

  const restoreAllTrash = () => {
    data.forEach(element => {
      updateTrashItem(element.id);
    });
    postLog({
      type: "restore-invoice",
      description: `${profile.userProfile.name} restored ${
        data.length
      } invoice${data.length > 1 ? "s." : "."}`,
      invoiceId: null
    });
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <Grid
          container
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: 15,
            paddingLeft: 0,
            paddingRight: 0
          }}
        >
          <Grid item xs={4}>
            <SelectCompanyField />
          </Grid>
          <Grid item xs={4} style={{ textAlign: "right" }}>
            <Button
              variant="contained"
              onClick={() => {
                restoreAllTrash();
              }}
              style={{
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#0f97fc",
                color: "#FFF"
              }}
            >
              Restore All
            </Button>
            &emsp;
            <Button
              variant="contained"
              onClick={() => {
                dispatch({
                  type: "set-warning-modal",
                  payload: { warningModal: true }
                });
              }}
              style={{
                textTransform: "none",
                fontWeight: "bold",
                backgroundColor: "#e0505c",
                color: "#FFF"
              }}
            >
              Empty Trash
            </Button>
          </Grid>
        </Grid>

        {loading ? (
          <TableLoader />
        ) : (
          <div style={{ border: "solid 1px #F1F1F1", minHeight: 600 }}>
            {data.length > 0 ? <TrashBinItems /> : <NoResult />}
          </div>
        )}
      </React.Fragment>

      <Dialog open={warningModal}>
        <WarningModal
          text="Confirmation"
          content={
            <span style={{ textAlign: "center", lineHeight: 1.5 }}>
              Are you sure you really want to delete all this invoices{" "}
              <b>permanently</b>?
            </span>
          }
          closeFn={() => {
            handleCloseModal();
          }}
          secondaryFn={() => {
            deleteAllTrash();
          }}
          btnText="Delete All"
        />
      </Dialog>
    </React.Fragment>
  );
};

const TrashBinWrapper = props => {
  return (
    <TrashBinProvider {...props}>
      <TrashBin {...props} />
    </TrashBinProvider>
  );
};

export default TrashBinWrapper;
