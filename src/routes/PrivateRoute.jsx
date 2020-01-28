import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { isAuth } from "../auth"
import MainPage from "layout/MainPage"
function PrivateRoute(props) {
  let { location, history, component: Component, ...rest } = props;

  function protectedComponent(componentProps) {

    return isAuth() ? (
      <MainPage {...componentProps}>
        <Component {...componentProps} />
      </MainPage>
    ) : (
        <Redirect push to="/" />
      );
  }

  return (
    <Route
      {...rest}
      component={(componentProps) => {
        return protectedComponent(componentProps);
      }}
    />
  );
}
export default withRouter(PrivateRoute);
