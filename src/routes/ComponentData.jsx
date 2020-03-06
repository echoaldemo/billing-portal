import { Invoice, Overview, SystemSettings, ContactSupport } from "components";

const componentData = [
  { path: "/overview", component: Overview },
  { path: "/invoices", component: Invoice },
  { path: "/settings", component: SystemSettings },
  { path: "/support", component: ContactSupport }
];

export default componentData;
