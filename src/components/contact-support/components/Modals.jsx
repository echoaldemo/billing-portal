import React, { useContext } from "react";
import { Dialog } from "@material-ui/core";
import {
  LoadingNoDialog as Loading,
  SuccessSingleButton as Success
} from "common-components";
import { SupportContext } from "context/SupportContext";

const Modals = () => {
  const { state, dispatch } = useContext(SupportContext);
  const { modal } = state;
  const renderModal = () => {
    if (modal === "loading") return <Loading text={"Sending message..."} />;
    else if (modal === "success")
      return (
        <Success
          text={"Your message has been sent."}
          closeFn={() => {
            dispatch({
              type: "reset-state"
            });
          }}
          content="We have received your inquiry and will respond within 48 hours. Thank you!"
        />
      );
  };
  return (
    <>
      <Dialog open={modal}>{renderModal()}</Dialog>
    </>
  );
};
export default Modals;
