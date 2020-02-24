import React from "react";
import {
  RecordVoiceOver,
  Settings,
  AccountCircle,
  Timeline,
  ContactSupport
} from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export default function Navlinks() {
  const tabArr = [
    {
      link: "/overview",
      icon: <Timeline className="tab-icon" />,
      name: "Overview",
      disabled: false
    },
    {
      link: "/invoices",
      icon: <RecordVoiceOver className="tab-icon" />,
      name: "Manage Invoices",
      disabled: false
    },
    {
      link: "/settings",
      icon: <Settings className="tab-icon" />,
      name: "System Settings",
      disabled: false
    },
    {
      link: "/profile",
      icon: <AccountCircle className="tab-icon" />,
      name: "Profile",
      disabled: true
    },
    {
      link: "/about-us",
      icon: <Settings className="tab-icon" />,
      name: "About Us",
      disabled: true
    },
    {
      link: "/support",
      icon: <ContactSupport className="tab-icon" />,
      name: "Contact Support",
      disabled: true
    }
  ];
  const handleClick = (e, disabled) => {
    if (disabled) e.preventDefault();
  };

  return (
    <div className="tabs-container">
      {tabArr.map((item, i) => {
        return (
          <NavLink
            key={i}
            to={item.disabled ? " " : item.link}
            className="tab-item"
            activeClassName="active-link"
            onClick={(e) => handleClick(e, item.disabled)}
          >
            <div className="tab-text">
              <div className="tab-text-container">
                {item.icon}
                <span
                  style={{ textTransform: "none" }}
                  className="tab-text-name"
                >
                  {item.name}
                </span>
              </div>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
}
