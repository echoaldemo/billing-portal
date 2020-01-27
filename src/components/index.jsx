import React from 'react'
import TopNav from 'common_components/SignIn/SignIn'

import Navbar from './appbar/Navbar'
import Navlink from './navlinks/Navlinks'
import Invoice from './invoice/Invoice'
import NewInvoice from './NewInvoice/NewInvoice'
import Overview from './overview/Overview'
import SystemSettings from './system-settings/SystemSettings'
export { Navbar, Navlink, Invoice, NewInvoice, Overview, SystemSettings }

const LandingPage = () => {
  return (
    <div>
      <TopNav />
    </div>
  )
}

export default LandingPage
