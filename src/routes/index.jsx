import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from 'components/index'
import PrivateRoute from './PrivateRoute'
import componentData from './ComponentData'

const PrivateRoutes = () => {
  return componentData.map((item, i) => {
    return <PrivateRoute key={i} {...item} />
  })
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <SignIn />} />
        <Route exact path="/callback" />
        <PrivateRoutes />
      </Switch>
    </BrowserRouter>
  )
}
