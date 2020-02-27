import React from "react";
import * as Styled from "./style";

const WarningModal = ({ text, content, btnText, closeFn, secondaryFn }) => {
  return (
    <Styled.Center data-cy="success-modal">
      <Styled.Card>
        <Styled.WarningIcon />
        <Styled.Text>{text}</Styled.Text>
        <Styled.P>{content}</Styled.P>

        <Styled.BtnCont>
          <Styled.CloseBtn onClick={closeFn}>
            <Styled.CloseText>CANCEL</Styled.CloseText>
          </Styled.CloseBtn>
          <Styled.BtnFn onClick={secondaryFn}>
            <Styled.BtnText>{btnText}</Styled.BtnText>
          </Styled.BtnFn>
        </Styled.BtnCont>
      </Styled.Card>
    </Styled.Center>
  );
};

const WarningIcon = Styled.WarningIcon;

export default WarningModal;
export { WarningIcon };
