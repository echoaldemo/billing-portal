import React from "react";
import { authorizeUri } from "utils/auth";
import { Divider } from "@material-ui/core";
import logo from "assets/qb_button.png";
export default function GeneralSettings() {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Let's get you connected to Quickbooks!</h3>
      <p>
        Et occaecat proident amet et nulla veniam sit.Ipsum occaecat nulla nisi
        anim ex tempor laborum amet enim id consectetur.Officia mollit anim
        laboris Lorem incididunt pariatur nisi nulla esse.Minim sunt non laborum
        reprehenderit voluptate non.
        <br />
        <br />
        Click the <b>Connect</b> button to get connected to{" "}
        <b>Quickbooks Online</b>.
        <br />
      </p>
      <span className="connect-btn" onClick={authorizeUri}>
        <img src={logo} alt="logo" />
      </span>
      <br />
      <br />
      <Divider />
    </div>
  );
}
