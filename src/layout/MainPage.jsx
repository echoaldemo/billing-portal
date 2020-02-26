/* eslint-disable */
import React from 'react'
import { Navbar, Navlink, Footer } from 'components'
export default function MainPage({ children, history }) {
  return (
    <div>
      <Navbar history={history} />
      <Navlink />
      <div className="tab-panel-container">{children}</div>

      <Footer />
    </div>
  )
}
