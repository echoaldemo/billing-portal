import React from "react";
import { Route, withRouter } from "react-router-dom";
import MainPage from "layout/MainPage";
import { IdentityProvider } from "context/IdentityContext";
function PrivateRoute(props) {
  let { component: Component, path, ...rest } = props;

  const protectedComponent = componentProps => {
    return (
      <IdentityProvider {...componentProps}>
        <MainPage {...componentProps}>
          <Component {...componentProps} />
        </MainPage>
      </IdentityProvider>
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
