import React from "react"
import { Invoice, Overview } from "components";

const SystemSettings = () => {
  return <h1>System Settings</h1>;
};
const Profile = () => {
  return <h1>Profile</h1>;
};

const AboutUs = () => {
  return <h1>Abous Us</h1>;
};

const ContactSupport = () => {
  return <h1>Contact Support</h1>;
};

const componentData = [
  { path: '/overview', component: Overview },
  { path: '/invoices', component: Invoice },
  { path: '/settings', component: SystemSettings },
  { path: '/profile', component: Profile },
  { path: '/about-us', component: AboutUs },
  { path: '/support', component: ContactSupport }
]

export default componentData