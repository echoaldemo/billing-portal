import React, { useContext } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import { StateContext } from 'context/StateContext';
import { RecordVoiceOver, Settings, AccountCircle, Timeline, Info, ContactSupport } from '@material-ui/icons';

export default function Navlinks() {
	const { state, dispatch } = useContext(StateContext);

	const tabArr = [
		<div className="tab-item">
			<Timeline className="tab-icon" />
			&nbsp;
			<span>Overview</span>
		</div>,
		<div className="tab-item">
			<RecordVoiceOver className="tab-icon" />
			&nbsp;
			<span>Invoice</span>
		</div>,
		<div className="tab-item">
			<Settings className="tab-icon" />
			<span>System Settings</span>
		</div>,
		<div className="tab-item">
			<AccountCircle className="tab-icon" />
			<span>Profile</span>
		</div>,
		<div className="tab-item">
			<Info className="tab-icon" />
			<span>About Us</span>
		</div>,
		<div className="tab-item">
			<ContactSupport className="tab-icon" />
			<span>Contact Support</span>
		</div>
	];

	function handleChange(event, newValue) {
		dispatch({ type: 'set-tab', payload: { active_tab: newValue } });
	}
	function a11yProps(index) {
		return {
			id: `full-width-tab-${index}`,
			'aria-controls': `full-width-tabpanel-${index}`
		};
	}
	return (
		<div>
			{console.log(state)}
			<Tabs value={state.active_tab} fullwidth="true" onChange={handleChange} className="tabs-container">
				{tabArr.map((item, i) => {
					return <Tab label={item} key={i} {...a11yProps(i)} className="tab-text" />;
				})}
			</Tabs>
		</div>
	);
}
