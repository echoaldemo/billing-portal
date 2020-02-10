import React from "react";
import { Button, Popover, Typography } from "@material-ui/core";
import { Drafts, Visibility, ThumbUp } from "@material-ui/icons";
import { StateContext } from "context/StateContext";
import { patch } from "utils/api";
const statusToString = status => {
  switch (status) {
    case 0:
      return (
        <div className="display-align-center draft-color">
          <Drafts fontSize="small" /> &nbsp; <b>Draft</b>
        </div>
      );
    case 1:
      return (
        <div className="display-align-center review-color">
          <Visibility fontSize="small" /> &nbsp; <b>Reviewed</b>
        </div>
      );
    case 2:
      return (
        <div className="display-align-center approve-color">
          <ThumbUp fontSize="small" /> &nbsp; <b>Approved</b>
        </div>
      );
  }
};
const StatusButton = ({ item }) => {
  const { dispatch, getPendingInvoicesData } = React.useContext(StateContext);

  const updateStateStatus = status => {
    patch(`/api/pending/edit/${item.id}`, { status: status })
      .then(res => {
        dispatch({
          type: "set-selected-data",
          payload: { selectedData: res.data }
        });
      })
      .then(() => {
        getPendingInvoicesData();
      });
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <React.Fragment>
      <Button
        style={{
          textTransform: "none"
        }}
        onClick={handleClick}
      >
        {statusToString(item.status)}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left"
        }}
        PaperProps={{
          square: true
        }}
      >
        <Typography className="menu-button-container">
          {item.status !== 0 ? (
            <span
              className="menu-item"
              onClick={() => {
                updateStateStatus(0);
                handleClose();
              }}
            >
              <b> Mark as Draft</b>
            </span>
          ) : null}

          {item.status !== 1 ? (
            <span
              className="menu-item"
              onClick={() => {
                updateStateStatus(1);
                handleClose();
              }}
            >
              <b>Review</b>
            </span>
          ) : null}

          {item.status !== 2 && (
            <span
              className="menu-item"
              onClick={() => {
                updateStateStatus(2);
                handleClose();
              }}
            >
              <b>Approve</b>
            </span>
          )}
        </Typography>
      </Popover>
    </React.Fragment>
  );
};

export default StatusButton;
