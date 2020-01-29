import React from 'react';
import { PanelHeader } from 'common_components';
import { InvoiceTable, EditInvoice } from './components';
import { Grid, Divider } from '@material-ui/core';
const Invoice = () => {
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

				<Divider />

				<div className="mt-normal">
					<InvoiceTable />
				</div>

				<EditInvoice />

			</Grid>
		</Grid>
	);
};

export default Invoice;
