import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import TableChartIcon from '@material-ui/icons/TableChart';
import { RecordVoiceOver } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
	link: {
		display: 'flex',
		fontSize: 14
	},
	icon: {
		marginRight: theme.spacing(0.5),
		fontSize: 18
	}
}));

function handleClick(event) {
	event.preventDefault();
	console.info('You clicked a breadcrumb.');
}

export default function IconBreadcrumbs() {
	const classes = useStyles();

	return (
		<Breadcrumbs aria-label="breadcrumb">
			<Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
				<HomeIcon className={classes.icon} />
				Billing Portal
			</Link>
			<Link color="inherit" href="/getting-started/installation/" onClick={handleClick} className={classes.link}>
				<RecordVoiceOver className={classes.icon} />
				Invoices
			</Link>
			<Typography color="textPrimary" className={classes.link}>
				<TableChartIcon className={classes.icon} />
				Table
			</Typography>
		</Breadcrumbs>
	);
}
