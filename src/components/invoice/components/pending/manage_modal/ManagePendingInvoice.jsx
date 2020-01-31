import React from 'react'
import { Dialog } from "@material-ui/core"
import { StateContext } from "context/StateContext"
import "./style/index.scss"
export default function ManagePendingInvoice() {
  const { state, dispatch } = React.useContext(StateContext)

  return (
    <Dialog square={true} open={state.openManage} onClose={() => { dispatch({ type: 'set-manage-modal', payload: { openManage: false } }) }} >
      <h1>Manage Modal</h1>

    </Dialog>
  )
}
