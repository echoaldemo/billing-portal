import React from 'react';
import { PanelHeader } from 'common_components';
import InvoiceTable from './InvoiceTable';
import { Grid } from '@material-ui/core';
const Invoice = () => {
	return (
		<Grid container>
			<Grid item lg={12}>
				<PanelHeader
					title="Invoice"
					subTitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia, expedita"
				/>

				<div className="mt-normal">
					<InvoiceTable />
				</div>
			</Grid>
		</Grid>
	);
};

export default Invoice;
