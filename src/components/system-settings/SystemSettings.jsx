import React from 'react'
import logo from 'assets/qb_button.png'
import { authorizeUri } from 'utils/auth'
// import { PanelTabs, Panel } from 'common-components'
import './style/index.scss'

const SystemSettings = () => {
  // const [tab, setTab] = React.useState(0)

  return (
    <div className="settings-container">
      {/* <PanelTabs labels={['test', 'test2']} tab={tab} setTab={setTab} /> */}

      <h3>Let's get you connected to Quickbooks!</h3>
      <p>
        Click the <b>Connect</b> button to get connected to{' '}
        <b>Quickbooks Online</b>.
        <br />
      </p>
      <span className="connect-btn" onClick={authorizeUri}>
        <img src={logo} alt="logo" />
      </span>
    </div>
  )
}

export default SystemSettings
