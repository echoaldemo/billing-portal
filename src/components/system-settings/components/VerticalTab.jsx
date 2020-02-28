import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Tab, Tabs, Paper } from "@material-ui/core";
import "../style/index.scss";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <div
          style={{
            padding: 15,
            paddingLeft: 25,
            paddingTop: 25
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

export default function VerticalTabs({ TabsOptions, TabPanelOptions }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className="vertical-tab-container" square={true}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className="vertical-tabs"
      >
        {TabsOptions.map((tab, i) => {
          return (
            <Tab
              icon={tab.icon}
              key={i}
              label={<span style={{ marginTop: -5 }}>&nbsp; {tab.label}</span>}
              {...a11yProps(i)}
              className="tab-item"
            />
          );
        })}
      </Tabs>
      {TabPanelOptions.map((item, i) => {
        return (
          <TabPanel value={value} index={i} key={i}>
            {item}
          </TabPanel>
        );
      })}
    </Paper>
  );
}
