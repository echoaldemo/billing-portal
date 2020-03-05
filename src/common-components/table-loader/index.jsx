import React from "react";
import * as Styled from "./style";

const TableLoader = ({ style }) => {
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
        <Styled.LoadingIcon />
      </div>
      <Styled.MsgCont>
        <Styled.Msg>One moment, we are loading your content</Styled.Msg>
      </Styled.MsgCont>
      <Styled.SubMsgCont>
        <span>
          Don't see anything yet? Refresh your
          <br />
          browser and try again.
        </span>
      </Styled.SubMsgCont>
    </div>
  );
};

export default TableLoader;
