import React from "react";

import SettingsIcon from "@material-ui/icons/Settings";
import PeopleIcon from "@material-ui/icons/People";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

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
    icon: <AttachMoneyIcon />,
    label: "Billing Profile"
  }
];

export default TabsOptions;
