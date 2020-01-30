import React from "react"
import { Dialog, Slide } from "@material-ui/core"
import { StateContext } from "context/StateContext"
import EditForm from "./EditForm"
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative",
    backgroundColor: "#5F7D98"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  form: {
    padding: 30
  },
  head: {
    backgroundColor: "#5F7D98",
    border: "1px solid #fff",
    color: "#fff"
  },
  dialog: {
    minWidth: "80vw"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const EditInvoice = () => {
  const { state, setEditModal } = React.useContext(StateContext)
  const classes = useStyles();

  return (
    <Dialog
      open={state.openEdit}
      maxWidth="sm"
      onClose={() => { setEditModal(false) }}
      classes={{ paperWidthSm: classes.dialog }}
      TransitionComponent={Transition}
    >
      <EditForm />
    </Dialog>
  )
}

export default EditInvoice