import React from 'react';
import { Paper, Button, makeStyles, TextField, Grid } from '@material-ui/core';
import logo from 'assets/logo.png';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '80vh'
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'space-evenly'
	},
	paper: {
		backgroundColor: 'whitesmoke',
		padding: 20
	},
	button: {
		backgroundColor: '#7c8a97',
		color: '#fff',
		height: 40,
		borderRadius: 3,
		width: 300,
		'&:hover': {
			backgroundColor: '#6d7a86'
		}
	},
	typography: {
		color: '#777777'
	},
	textfield: {
		width: 300
	}
}));

const SignIn = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Paper className={classes.wrapper} classes={{ root: classes.paper }}>
				<div style={{ textAlign: 'center' }}>
					<img src={logo} alt="logo" />
				</div>
				<form style={{ paddingTop: 20 }}>
					<Grid container direction="column" spacing={3} alignItems="center">
						<Grid item>
							<TextField variant="outlined" label="Username" classes={{ root: classes.textfield }} />
						</Grid>
						<Grid item>
							<TextField variant="outlined" label="Password" classes={{ root: classes.textfield }} />
						</Grid>
						<Grid item>
							<Button classes={{ root: classes.button }}>SIGN IN</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</div>
	);
};

export default SignIn;
