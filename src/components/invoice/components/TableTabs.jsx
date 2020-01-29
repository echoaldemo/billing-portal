import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { StateContext } from "context/StateContext"



function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const { state, setTab } = React.useContext(StateContext)
  const classes = useStyles();


  const handleChange = (event, newValue) => {
    setTab(newValue)
  };

  return (
    <div className={classes.root}>

      <Tabs value={state.active_tab} className="tabs-container" onChange={handleChange} >
        <Tab label="Pending Invoices" {...a11yProps(0)} className="tab-text" />
        <Tab label="Approved Invoices" {...a11yProps(1)} className="tab-text" />
      </Tabs>

    </div>
  );
}
