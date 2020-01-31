import styled from 'styled-components'
import { CircularProgress } from '@material-ui/core/'

const LoadingIcon = styled(CircularProgress)`
  color: #1194f6 !important;
`
const Container = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #7c8a97;
  width:"100%";
`
const MsgCont = styled.div`
  padding-top: 30px;
`
const Msg = styled.span`
  color: #7c8a97;
  font-size: 18px;
  font-weight: 600;
`
const SubMsgCont = styled.div`
  color: #777777;
  text-align: center;
  font-size: 16px;
  padding-top: 30px;
`

export { LoadingIcon, Container, MsgCont, Msg, SubMsgCont }
