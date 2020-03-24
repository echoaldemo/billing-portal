import React from 'react'
import { Divider } from '@material-ui/core'
import SEO from 'utils/seo'
import './styles.scss'
import QuickbooksConnect from './QuickbooksConnect'
import { StateProvider } from 'context/GeneralSettingsContext'

const GeneralSetting = () => {
  return (
    <div className='container general-setting-container'>
      <SEO title='General Settings' />
      <QuickbooksConnect />
      <Divider />
      <br />
      {/* <Grid container className="section-2-container" spacing={5}>
        <Grid item xs={6}>
          <Companies className="section-2-item" />
        </Grid>
        <Grid item xs={6}>
          <Services className="section-2-item" />
        </Grid>
      </Grid> */}
    </div>
  )
}

const GeneralSettings = () => {
  return (
    <StateProvider>
      <GeneralSetting />
    </StateProvider>
  )
}

export default GeneralSettings
