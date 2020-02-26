import React, { useContext } from 'react'
import { Paper, Button, makeStyles, TextField, Grid } from '@material-ui/core'
import logo from 'assets/logo.png'
import { GoogleLogin } from 'react-google-login'
import { get, post } from 'utils/api'
import { StateContext } from 'context/StateContext'

const useStyles = makeStyles(() => ({
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
}))

const SignIn = ({ history }) => {
  const classes = useStyles()
  const { dispatch } = useContext(StateContext)

  const responseGoogle = async res => {
    const find = await get(`/api/users/${res.googleId}`)
    if (find.data) {
      dispatch({
        type: 'set-user-profile',
        payload: { userProfile: find.data }
      })
    } else {
      res.profileObj.status = 'active'
      post('/api/users/create', res.profileObj).then(res =>
        dispatch({
          type: 'set-user-profile',
          payload: { userProfile: res.data }
        })
      )
    }
    console.log(res)
    localStorage.setItem('gooleToken', res.tokenId)
    history.push('/overview')
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.wrapper} classes={{ root: classes.paper }}>
        <div style={{ textAlign: 'center' }}>
          <img src={logo} alt="logo" />
        </div>
        <form style={{ paddingTop: 20 }}>
          <Grid container direction="column" spacing={3} alignItems="center">
            <Grid item>
              <TextField
                variant="outlined"
                label="Username"
                classes={{ root: classes.textfield }}
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                label="Password"
                classes={{ root: classes.textfield }}
              />
            </Grid>
            <Grid item>
              <GoogleLogin
                className="LoginSignIn"
                clientId="28861163542-0mub2dqtubvcjgun3n9vlrnkgfhgi7n4.apps.googleusercontent.com"
                render={renderProps => (
                  <Button
                    onClick={renderProps.onClick}
                    classes={{ root: classes.button }}
                  >
                    SIGN IN
                  </Button>
                )}
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              />

              {/* <Button classes={{ root: classes.button }}>SIGN IN</Button> */}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  )
}

export default SignIn
