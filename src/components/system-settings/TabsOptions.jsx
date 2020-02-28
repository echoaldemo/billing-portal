import React from "react";

import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import PaymentIcon from "@material-ui/icons/Payment";
const TabsOptions = [
  {
    icon: <SettingsIcon />,
    label: "General settings"
  },
  {
    icon: <PeopleIcon />,
    label: "User management"
  },
  {
    icon: <PaymentIcon />,
    label: "Billing Profile"
  },
  {
    icon: <AttachMoneyIcon />,
    label: "Manage Tax"
  }
];

export default TabsOptions;
