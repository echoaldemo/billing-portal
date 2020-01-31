import React from 'react';
import { PanelHeader } from 'common-components';
import { InvoiceTable, EditInvoice, TableTabs, PendingTable, } from './components';
import { Grid, Typography, Box, Paper } from '@material-ui/core';
import { StateContext } from "context/StateContext"
const Invoice = () => {
	const { state } = React.useContext(StateContext)

	return (
		<Grid container>
			<Grid item lg={12}>

				<PanelHeader
					title="Invoice"
					subTitle={
						<div>
							<br />
							<span>Comming soon: </span>
							<ul>
								<li>Automated Invoicing of Perfect Pitch Customers.</li>
								<li>Manual Invoicing for customers using non Perfect Pitch dialers </li>
							</ul>
						</div>
					}
				/>

				<Paper className="mt-normal" square={true}>

					<TableTabs />


					{/* Pending */}
					<TabPanel value={state.active_tab} index={0}>

						<PendingTable />
					</TabPanel>
					{/* Approved */}
					<TabPanel value={state.active_tab} index={1}>
						<InvoiceTable />
					</TabPanel>



				</Paper>



				<EditInvoice />

			</Grid>
		</Grid>
	);
};


function TabPanel(props) {
	const { children, value, index, ...other } = props;
	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box>{children}</Box>}
		</Typography>
	);
}

export default Invoice;
