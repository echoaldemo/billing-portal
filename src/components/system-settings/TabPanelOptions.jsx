import React from "react";
import GeneralSettings from "./components/GeneralSettings";
import BillingProfile from "./components/BillingProfile";
import UserManagement from "./components/UserManagement";
const TabPanelOptions = [
  <GeneralSettings />,
  <UserManagement />,
  <BillingProfile />
];

export default TabPanelOptions;
