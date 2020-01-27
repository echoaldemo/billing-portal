import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "components/index";
import { Navbar, Navlink, Invoices, NewInvoice } from "components";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={() => <SignIn />} />
        <Route
          path="/invoices"
          component={() => {
            return (
              <React.Fragment>
                <Navbar />
                <Navlink />
                <Invoices />
                <NewInvoice />
              </React.Fragment>
            );
          }}
        />
      </Switch>
    </BrowserRouter>
  );
}
