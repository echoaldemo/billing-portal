import React from 'react'
import SignIn from 'components/sign-in/SignIn'
import Navbar from './appbar/Navbar'
import Navlink from './navlinks/Navlinks'
import Invoice from './invoice/Invoice'
import NewInvoice from './new-invoice/manual/ManualInvoice'
import Overview from './overview/Overview'
import SystemSettings from './system-settings/SystemSettings'
import Footer from './footer/Footer'
export {
  Navbar,
  Navlink,
  Invoice,
  NewInvoice,
  Overview,
  SystemSettings,
  Footer
}

const LandingPage = ({ history }) => {
  return (
    <div>
      <SignIn history={history} />
    </div>
  )
}

export default LandingPage
