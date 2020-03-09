import React from "react";
import { IconButton, Typography, Popover } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { StateContext } from "context/StateContext";

export default function SimplePopover({ item }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {
    dispatch,
    setModalLoading,
    deletePendingStatus,
    state,
    selectedItems
  } = React.useContext(StateContext);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    dispatch({ type: "set-selected-data", payload: { selectedData: item } });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const openManageModal = item => {
    dispatch({
      type: "set-manage-modal",
      payload: { openManage: true }
    });
    setModalLoading(true);
    setTimeout(() => {
      setModalLoading(false);
    }, 500);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getDisabled = () => {
    if (selectedItems.length > 1) {
      if (selectedItems.filter(e => e.id === item.id).length === 1) return true;
    }
    return false;
  };

  return (
    <div style={{ paddingLeft: 15 }}>
      <IconButton
        disabled={getDisabled()}
        aria-describedby={id}
        onClick={handleClick}
        style={{ padding: 0, color: "#444851" }}
      >
        <Settings />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        style={{ marginLeft: 5 }}
        PaperProps={{
          style: {
            borderRadius: 0
          }
        }}
      >
        <Typography className="menu-button-container">
          <span
            className="menu-item"
            onClick={() => {
              openManageModal();
              handleClose();
            }}
          >
            Manage
          </span>
          <span
            className={
              state.selectedData.invoiceType === "Automatic"
                ? "menu-item span-disabled"
                : "menu-item"
            }
            onClick={() =>
              dispatch({
                type: "set-duplicate-modal",
                payload: { openDuplicate: true }
              })
            }
          >
            Duplicate
          </span>
          <span
            className="menu-item delete-hover"
            onClick={() => {
              deletePendingStatus(state.selectedData.id);
              handleClose();
            }}
          >
            Delete
          </span>
        </Typography>
      </Popover>
    </div>
  );
}
