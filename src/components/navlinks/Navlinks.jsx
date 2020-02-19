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
      name: "Overview"
    },
    {
      link: "/invoices",
      icon: <RecordVoiceOver className="tab-icon" />,
      name: "Manage Invoices"
    },
    {
      link: "/settings",
      icon: <Settings className="tab-icon" />,
      name: "System Settings"
    },
    {
      link: "/profile",
      icon: <AccountCircle className="tab-icon" />,
      name: "Profile"
    },
    {
      link: "/about-us",
      icon: <Settings className="tab-icon" />,
      name: "About Us"
    },
    {
      link: "/support",
      icon: <ContactSupport className="tab-icon" />,
      name: "Contact Support"
    }
  ];

  return (
    <div className="tabs-container">
      {tabArr.map((item, i) => {
        return (
          <NavLink
            key={i}
            to={item.link}
            className="tab-item"
            activeClassName="active-link"
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
