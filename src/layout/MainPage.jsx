/* eslint-disable */
import React from "react";
import { Navbar, Navlink, Footer } from "components";
export default function MainPage({ children }) {
  return (
    <div>
      <Navbar />
      <Navlink />
      <div className="tab-panel-container">{children}</div>

      <Footer />
    </div>
  );
}
