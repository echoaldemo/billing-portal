import React from 'react'
import { authorizeUri } from 'utils/auth'

const ConnectBtn = () => {
  return <button onClick={authorizeUri}>Connect</button>
}

export default ConnectBtn
