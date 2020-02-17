import React from "react";
import * as Styled from "./style";

const SuccessModal = ({ text, btnText, closeFn, content, secondaryFn }) => {
  return (
    <Styled.Center data-cy="success-modal">
      <Styled.Card>
        <Styled.CheckIcon />
        <Styled.Text>{text}</Styled.Text>
        <Styled.P>{content} What do you want to do next?</Styled.P>

        <Styled.BtnCont>
          <Styled.CloseBtn onClick={closeFn}>
            <Styled.CloseText>Close</Styled.CloseText>
          </Styled.CloseBtn>
          <Styled.BtnFn onClick={secondaryFn}>
            <Styled.BtnText>{btnText}</Styled.BtnText>
          </Styled.BtnFn>
        </Styled.BtnCont>
      </Styled.Card>
    </Styled.Center>
  );
};

export default SuccessModal;
