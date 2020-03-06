import React from "react";
import { Route, withRouter } from "react-router-dom";
import MainPage from "layout/MainPage";
function PrivateRoute(props) {
  let { component: Component, path, ...rest } = props;

  const protectedComponent = componentProps => {
    return (
      <MainPage {...componentProps}>
        <Component {...componentProps} />
      </MainPage>
    );
  };

  return (
    <Route
      path={path}
      component={() => {
        return protectedComponent(rest);
      }}
    />
  );
}
export default withRouter(PrivateRoute);
