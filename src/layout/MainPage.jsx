/* eslint-disable */
import React, { useContext } from 'react'
import { Navbar, Navlink, Footer } from 'components'
import { TableLoader } from 'common-components'
import { StateContext } from 'context/StateContext'

export default function MainPage({ children, history }) {
  const {
    state: { auth }
  } = useContext(StateContext)
  return (
    <div>
      <Navbar history={history} />
      <Navlink />
      {
        auth ? (
          <div className="tab-panel-container">{children}</div>
        ) : (
            <div style={{ minHeight: '70vh' }}>
              <TableLoader />
            </div>
          )
      }
      <Footer />
    </div>
  )
}
