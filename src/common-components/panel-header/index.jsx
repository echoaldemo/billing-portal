import React from "react";
export default function index({ title, subTitle }) {
  return (
    <div className="header-container">
      <div className="header-text-container">
        <span className="header-text-primary">{title}</span>
        <span className="header-text-secondary">{subTitle}</span>
      </div>
    </div>
  );
}
