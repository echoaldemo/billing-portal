import React, { useContext } from 'react';
import { Box } from '@material-ui/core';
import { StateContext } from 'context/StateContext';
import tabPanels from './TabPanels';
const Invoices = () => {
	const { state } = useContext(StateContext);

	return (
		<div>
			{console.log('invoice')}
			{tabPanels.map((item, i) => {
				return (
					<TabPanel key={i} value={state.active_tab} index={i}>
						{item}
					</TabPanel>
				);
			})}
		</div>
	);
};

const TabPanel = (props) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
			className="tab-panel-container"
		>
			<Box>{children}</Box>
		</div>
	);
};

export default Invoices;
