import React from 'react'
import { Close } from '@material-ui/icons'
import * as Styled from './style'

const WarningModal = ({
  text,
  content,
  icon,
  btnText,
  closeFn,
  secondaryFn
}) => {
  return (
    <Styled.Center data-cy='success-modal'>
      <Styled.Card>
        <Styled.CloseCont>
          <Close onClick={closeFn} />
        </Styled.CloseCont>
        {icon ? icon : <Styled.WarningIcon />}
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
  )
}

const WarningIcon = Styled.WarningIcon

export default WarningModal
export { WarningIcon }
