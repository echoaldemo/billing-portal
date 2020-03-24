import React, { useContext } from 'react'
import { RateReview } from '@material-ui/icons'
import CardInfo from '../card-info'
import { OverviewContext } from 'context/OverviewContext'

const ReviewedInvoices = () => {
  const {
    state: { loading, reviewed, all }
  } = useContext(OverviewContext)

  const formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <CardInfo
      primaryLabel='Reviewed Invoices'
      secondaryLabel={formatNumber(reviewed) + ' / ' + formatNumber(all)}
      loading={loading}
      status={1}
      icon={() => <RateReview fontSize='large' style={{ marginRight: 20 }} />}
    />
  )
}

export default ReviewedInvoices
