import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { BillingProvider, BillingContext } from 'context/BillingProfileContext'
import SelectCompanyField from './SelectCompanyField'
import CampaignRows from './CampaignRows'
import { CustomCheckbox } from 'common-components'
import SEO from 'utils/seo'
const BillingProfile = () => {
  const { state, dispatch } = React.useContext(BillingContext)
  const { edit } = state
  return (
    <div className="billing-profile-container">
      <SEO title="Billing Profile" />
      <Grid container className="header-container">
        <Grid item xs={2} lg={4}>
          <SelectCompanyField />
        </Grid>
        <Grid
          item
          xs={2}
          lg={2}
          className="edit-btn-container"
          onClick={() => {
            dispatch({ type: 'set-edit', payload: { edit: !edit } })
          }}
        >
          <Button>{!edit ? 'Edit items' : 'Save'}</Button>
        </Grid>
      </Grid>

      <Grid container>
        <CampaignRows />
        <h5>
          <CustomCheckbox checked={true} />
          &nbsp;
          <span>Apply previous invoice data for campaign's rate values.</span>
        </h5>
      </Grid>
    </div>
  )
}

const BillingProfileWrapper = props => {
  return (
    <BillingProvider {...props}>
      <BillingProfile {...props} />
    </BillingProvider>
  )
}

export default BillingProfileWrapper
