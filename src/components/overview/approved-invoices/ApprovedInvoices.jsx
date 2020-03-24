import React, { useContext } from 'react'
import { Check } from '@material-ui/icons'
import CardInfo from '../card-info'
import { OverviewContext } from 'context/OverviewContext'

const ApprovedInvoices = () => {
  const {
    state: { loading, approved, all }
  } = useContext(OverviewContext)

  const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <CardInfo
      primaryLabel='Approved Invoices'
      secondaryLabel={formatNumber(approved) + ' / ' + formatNumber(all)}
      loading={loading}
      status={2}
      icon={() => <Check fontSize='large' style={{ marginRight: 20 }} />}
    />
  )
}

export default ApprovedInvoices
