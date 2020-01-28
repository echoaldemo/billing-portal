import React from "react";
import TopNav from "common_components/SignIn/SignIn";

import Navbar from "./appbar/Navbar";
import Navlink from "./navlinks/Navlinks";
import Invoice from "./invoice/Invoice";
import NewInvoice from "./new-invoice/manual/ManualInvoice";
import Overview from "./overview/Overview";
import SystemSettings from "./system-settings/SystemSettings";
import Footer from "./footer/Footer";
export {
  Navbar,
  Navlink,
  Invoice,
  NewInvoice,
  Overview,
  SystemSettings,
  Footer
};

const LandingPage = () => {
  return (
    <div>
      <TopNav />
    </div>
  );
};

export default LandingPage;
