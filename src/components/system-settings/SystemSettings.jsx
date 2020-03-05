import React, { useContext } from 'react'
import './style/index.scss'
import VerticalTab from './components/VerticalTab'
import { TabsOptionsAdmin, TabsOptionsUser } from './TabsOptions'
import { TabPanelOptionsAdmin, TabPanelOptionsUser } from './TabPanelOptions'
import { StateContext } from 'context/StateContext'
import { TableLoader } from 'common-components'

const SystemSettings = () => {
  const {
    state: { userProfile }
  } = useContext(StateContext)
  return (
    <div>
      {userProfile.id ? (
        <VerticalTab
          TabsOptions={
            userProfile.type === 'admin' ? TabsOptionsAdmin : TabsOptionsUser
          }
          TabPanelOptions={
            userProfile.type === 'admin'
              ? TabPanelOptionsAdmin
              : TabPanelOptionsUser
          }
        />
      ) : (
        <div style={{ minHeight: '70vh' }}>
          <TableLoader />
        </div>
      )}
    </div>
  )
}

export default SystemSettings
