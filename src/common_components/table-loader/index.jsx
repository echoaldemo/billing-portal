import React from 'react'
import * as Styled from './style'

const TableLoader = () => {
  return (
    <Styled.Container>
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
    </Styled.Container>
  )
}

export default TableLoader
