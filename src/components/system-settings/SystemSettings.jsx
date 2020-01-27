import React from 'react'
import logo from 'assets/qb_button.png'
import { authorizeUri } from 'utils/auth'
import './style/index.scss'

const SystemSettings = () => {
  return (
    <div>
      <h1>Connect to quickbooks</h1>
      <span className="connect-btn" onClick={authorizeUri}>
        <img src={logo} alt="logo" />
      </span>
    </div>
  )
}

export default SystemSettings
