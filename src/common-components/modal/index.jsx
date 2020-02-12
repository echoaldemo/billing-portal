import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const Modal = ({
  open,
  width,
  height,
  onClose,
  title,
  contentStyle,
  children,
  renderEditButton
}) => {
  return (
    <Dialog
      maxWidth="xl"
      open={open}
      PaperProps={{
        square: true,
        style: {
          minWidth: width ? width : 420,
          minHeight: height ? height : "auto",
          maxWidth: width ? width : 420,
          maxHeight: height ? height : "auto"
        }
      }}
      onClose={() => {
        onClose();
      }}
    >
      <DialogTitle
        style={{
          backgroundColor: "#5f7d98",
          color: "#FFF",
          padding: 10
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <IconButton
              onClick={() => {
                onClose();
              }}
            >
              <CloseIcon style={{ color: "#FFF" }} />
            </IconButton>
          </div>
          <div>
            <span
              style={{
                fontSize: 20,
                fontWeight: 550
              }}
            >
              {title}
            </span>
          </div>

          <div>
            {renderEditButton ? (
              <React.Fragment> {renderEditButton()} </React.Fragment>
            ) : (
              <div style={{ width: 35 }}>&nbsp;</div>
            )}
          </div>
        </div>
      </DialogTitle>
      <DialogContent
        dividers
        style={{
          ...contentStyle,
          overflow: "auto"
        }}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
export default Modal;
