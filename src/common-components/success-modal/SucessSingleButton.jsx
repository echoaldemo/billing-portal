import React from "react";
import * as Styled from "./style";

const SuccessSingle = ({ text, closeFn, content }) => {
  return (
    <Styled.Center data-cy="success-modal">
      <Styled.Card>
        <Styled.CheckIcon />
        <Styled.TextLower>{text}</Styled.TextLower>
        <Styled.P>{content}</Styled.P>
        <Styled.BtnCont>
          <Styled.CloseBtn onClick={closeFn}>
            <Styled.CloseText>Close</Styled.CloseText>
          </Styled.CloseBtn>
        </Styled.BtnCont>
      </Styled.Card>
    </Styled.Center>
  );
};

export default SuccessSingle;
