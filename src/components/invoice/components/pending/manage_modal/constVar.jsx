import { makeStyles } from '@material-ui/core/styles'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const defaultBillable = {
  amt: 0,
  qty: 0,
  rate: ''
}
const defaultPerformance = {
  amt: 0,
  qty: '',
  rate: ''
}
const defaultDid = {
  amt: 0,
  qty: '',
  rate: ''
}
const defaultLitigator = {
  amt: 0,
  qty: '',
  rate: ''
}

const handleQty = ({ billable, performance, did }) => {
  return (
    parseFloat(billable.qty ? billable.qty : 0) +
    parseFloat(performance.qty ? performance.qty : 0) +
    parseFloat(did.qty ? did.qty : 0)
  )
}

const handleRate = ({ billable, performance, did }) => {
  return (
    parseFloat(billable.rate ? billable.rate : 0) +
    parseFloat(performance.rate ? performance.rate : 0) +
    parseFloat(did.rate ? did.rate : 0)
  )
}

const handleAmt = ({ billable, performance, did }) => {
  return (
    parseFloat(billable.amt ? billable.amt : 0) +
    parseFloat(performance.amt ? performance.amt : 0) +
    parseFloat(did.amt ? did.amt : 0)
  )
}

const useStyles = makeStyles({
  twenty: { width: '20%' },
  forty: { width: '40%' }
})

export {
  defaultBillable,
  defaultPerformance,
  defaultDid,
  defaultLitigator,
  formatter,
  handleQty,
  handleRate,
  handleAmt,
  useStyles
}
