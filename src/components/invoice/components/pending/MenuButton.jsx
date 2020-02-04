import React from "react";
import { IconButton, Typography, Popover } from "@material-ui/core";
import { Settings } from "@material-ui/icons";
import { StateContext } from "context/StateContext";
export default function SimplePopover({ item }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { dispatch, setModalLoading } = React.useContext(StateContext);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const passAllData = item => {
    dispatch({
      type: "set-manage-modal",
      payload: { openManage: true }
    });
    setModalLoading(true);

    setTimeout(() => {
      dispatch({ type: "set-selected-data", payload: { selectedData: item } });
      setModalLoading(false);
    }, 500);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ paddingLeft: 15 }}>
      <IconButton
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
            onClick={() => {
              passAllData(item);
              handleClose();
            }}
            className="menu-item"
          >
            Manage
          </span>
          <span className="menu-item">Duplicate</span>
          <span className="menu-item delete-hover">Delete</span>
        </Typography>
      </Popover>
    </div>
  );
}
