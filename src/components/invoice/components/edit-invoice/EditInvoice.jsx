import React from "react"
import { Dialog } from "@material-ui/core"
import { StateContext } from "context/StateContext"

const EditInvoice = () => {
  const { state, setEditModal } = React.useContext(StateContext)

  return (
    <Dialog open={state.openEdit} onClose={() => { setEditModal(false) }}>
      <h1>asdasd</h1>
    </Dialog>
  )
}

export default EditInvoice