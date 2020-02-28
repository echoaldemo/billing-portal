import React from 'react'
import GeneralSettings from './components/GeneralSettings'
import BillingProfile from './components/billing-profile/BillingProfile'
import UserManagement from './components/user-management/UserManagement'

const TabPanelOptions = [
  <GeneralSettings />,
  <UserManagement />,
  <BillingProfile />
]

export default TabPanelOptions
