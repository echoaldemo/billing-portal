import React from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { isAuth } from '../auth'
import MainPage from 'layout/MainPage'
function PrivateRoute(props) {
  let { component: Component, path, ...rest } = props

  const protectedComponent = componentProps => {
    return isAuth() ? (
      <MainPage {...componentProps}>
        <Component {...componentProps} />
      </MainPage>
    ) : (
      <Redirect push to="/" />
    )
  }

  return (
    <Route
      path={path}
      component={() => {
        return protectedComponent(rest)
      }}
    />
  )
}
export default withRouter(PrivateRoute)
