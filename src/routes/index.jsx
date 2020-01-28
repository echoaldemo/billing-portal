import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "components/index";
import PrivateRoute from "./PrivateRoute";
import componentData from "./ComponentData"


const PrivateRoutes = () => {
  return componentData.map(item => {
    return (
      <PrivateRoute
        {...item}
      />
    )
  })
}


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <SignIn />} />
        <PrivateRoutes />
      </Switch>
    </BrowserRouter>
  );
}


