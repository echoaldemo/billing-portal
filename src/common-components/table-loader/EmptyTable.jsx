import React from "react";
import * as Styled from "./style";
import Empty from "assets/empty.png";

const EmptyTable = ({ style }) => {
  return (
    <div
      style={{
        height: 600,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "#7c8a97",
        width: "100%",
        ...style
      }}
    >
      <div>
        <img width={140} src={Empty} alt="" />
      </div>
      <Styled.MsgCont>
        <Styled.Msg>
          Oops! This company doesn't seem to have any active campaigns.
        </Styled.Msg>
      </Styled.MsgCont>
      <Styled.SubMsgCont>
        <span>
          Please select another campaign
          <br />
          and try again.
        </span>
      </Styled.SubMsgCont>
    </div>
  );
};

export default EmptyTable;
