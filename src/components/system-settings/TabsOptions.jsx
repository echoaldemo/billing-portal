import React from 'react'

import SettingsIcon from '@material-ui/icons/Settings'
import PeopleIcon from '@material-ui/icons/People'
import PaymentIcon from '@material-ui/icons/Payment'
import DeleteIcon from '@material-ui/icons/Delete'
const TabsOptionsAdmin = [
  {
    icon: <SettingsIcon />,
    label: 'General settings'
  },
  {
    icon: <PeopleIcon />,
    label: 'User management'
  },
  {
    icon: <PaymentIcon />,
    label: 'Billing Profile'
  },
  {
    icon: <DeleteIcon />,
    label: 'Trash Bin'
  }
]

const TabsOptionsUser = [
  {
    icon: <SettingsIcon />,
    label: 'General settings'
  },
  {
    icon: <PaymentIcon />,
    label: 'Billing Profile'
  }
]

export { TabsOptionsAdmin, TabsOptionsUser }
