import React from "react";
import "./style/index.scss";
import VerticalTab from "./components/VerticalTab";
import TabsOptions from "./TabsOptions";
import TabPanelOptions from "./TabPanelOptions";
const SystemSettings = () => {
  return (
    <div>
      <VerticalTab
        TabsOptions={TabsOptions}
        TabPanelOptions={TabPanelOptions}
      />
    </div>
  );
};

export default SystemSettings;
