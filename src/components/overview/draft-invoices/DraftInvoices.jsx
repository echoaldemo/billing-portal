import React, { useContext } from 'react'
import { Drafts } from '@material-ui/icons'
import CardInfo from '../card-info'
import { OverviewContext } from 'context/OverviewContext'

const DraftInvoices = () => {
  const {
    state: { loading, draft, all }
  } = useContext(OverviewContext)
  const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <CardInfo
      primaryLabel='Draft Invoices'
      secondaryLabel={formatNumber(draft) + ' / ' + formatNumber(all)}
      loading={loading}
      status={0}
      icon={() => <Drafts fontSize='large' style={{ marginRight: 20 }} />}
    />
  )
}

export default DraftInvoices
