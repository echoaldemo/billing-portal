import React from "react";
import TopNav from "common_components/SignIn/SignIn";

import Navbar from "./appbar/Navbar";
import Navlink from "./navlinks/Navlinks";
import Invoices from "./invoices/Invoices";
import NewInvoice from "./NewInvoice/NewInvoice";
export { Navbar, Navlink, Invoices, NewInvoice };

const LandingPage = () => {
  return (
    <div>
      <TopNav />
    </div>
  );
};

export default LandingPage;
