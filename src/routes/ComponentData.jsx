import React from "react";
import { Invoice, Overview, SystemSettings } from "components";

const ContactSupport = () => {
  return <h1>Contact Support</h1>;
};

const componentData = [
  { path: "/overview", component: Overview },
  { path: "/invoices", component: Invoice },
  { path: "/settings", component: SystemSettings },
  { path: "/support", component: ContactSupport }
];

export default componentData;
