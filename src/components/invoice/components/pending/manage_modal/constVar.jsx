import { makeStyles } from '@material-ui/core/styles'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const defaultBillable = {
  amt: 0,
  qty: '',
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

const mockTaxation = [
  { code: '5', taxrate: '7', name: 'Utah', percentage: 6.1 },
  { code: '6', taxrate: '8', name: 'California', percentage: 8 },
  { code: '7', taxrate: '11', name: 'Mexico', percentage: 16 }
]

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

const handleServices = ({ billable, performance, did }) => {
  const text = []
  if (handleAmt({ billable, performance, did })) {
    if (billable.amt) {
      text.push('Billable hours')
    }
    if (performance.amt) {
      text.push('Performance')
    }
    if (did.amt) {
      text.push('Did')
    }
  } else {
    text.push('Field not set')
  }
  return text.join(', ')
}

const handleAdditional = (litigator, merchant) => {
  const text = []
  if (litigator || merchant) {
    if (litigator) {
      text.push('Litigator Scrubbing')
    }
    if (merchant) {
      text.push('Merchant Fees')
    }
  } else {
    text.push('Field not set')
  }
  return text.join(', ')
}

const useStyles = makeStyles({
  tab1: { width: '20%' },
  tab2: { width: '20%', textAlign: 'right' },
  tab3: { width: '5%', textAlign: 'right' },
  tab4: { width: '15%', textAlign: 'left' },
  right: { textAlign: 'right' }
})

export {
  mockTaxation,
  defaultBillable,
  defaultPerformance,
  defaultDid,
  defaultLitigator,
  formatter,
  handleQty,
  handleRate,
  handleAmt,
  handleServices,
  handleAdditional,
  useStyles
}
