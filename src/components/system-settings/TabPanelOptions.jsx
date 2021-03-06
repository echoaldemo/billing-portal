import React from 'react'
import GeneralSettings from './components/general-settings/GeneralSettings'
import BillingProfile from './components/billing-profile/BillingProfile'
import UserManagement from './components/user-management/UserManagement'
import TrashBin from './components/trash-bin/TrashBin'
const TabPanelOptionsAdmin = [
  <GeneralSettings />,
  <UserManagement />,
  <BillingProfile />,
  <TrashBin />
]
const TabPanelOptionsUser = [<GeneralSettings />, <BillingProfile />]

export { TabPanelOptionsAdmin, TabPanelOptionsUser }
