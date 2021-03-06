import React from 'react'
import { Grid } from '@material-ui/core'
import { PanelHeader } from 'common-components'
import ActivityLogs from './activity-logs'
import DraftInvoices from './draft-invoices/DraftInvoices'
import ReviewedInvoices from './reviewed-invoices/ReviewedInvoices'
import ApprovedInvoices from './approved-invoices/ApprovedInvoices'
import PieChart from './pie-chart/PieChart'
import SEO from 'utils/seo'
import { OverviewProvider } from 'context/OverviewContext'

const OverviewComponent = () => {
  return (
    <Grid container>
      <SEO title='Overview' />
      <Grid item lg={12}>
        <PanelHeader
          title='Statistic Overview'
          subTitle='Lorem ipsum dolor sit amet consectetur adipisicing elit. '
        />

        <Grid container spacing={5} className='display-even p-normal pb-normal'>
          <DraftInvoices />
          <ReviewedInvoices />
          <ApprovedInvoices />
        </Grid>

        <Grid container style={{ marginTop: 50 }}>
          <Grid item lg={8} className='center h-500'>
            <PieChart />
          </Grid>

          <Grid item lg={4} className='center h-500'>
            <ActivityLogs />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item lg={8}></Grid>

          <Grid item lg={4}>
            <div style={{ margin: '140px 0px 0px 10px' }}>test</div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Overview = () => {
  return (
    <OverviewProvider>
      <OverviewComponent />
    </OverviewProvider>
  )
}

export default Overview
