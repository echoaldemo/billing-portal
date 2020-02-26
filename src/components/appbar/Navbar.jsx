import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import logo from 'assets/pp_logo_white_font.png'
import { StateContext } from 'context/StateContext'
import { get, post } from 'utils/api'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  }
}))

let token = null

export default function MenuAppBar({ history }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const { state, dispatch } = useContext(StateContext)
  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    token = localStorage.getItem('gooleToken')
    if (!token) {
      history.push('/')
    } else if (!state.userProfile.id) {
      getUser()
    }
    return () => {
      token = null
    }
  }, [])

  const getUser = async () => {
    const { data: googleId } = await post(`/api/users/auth`, { token })
    const { data } = await get(`/api/users/${googleId}`)
    console.log(data, 'test')
    if (data) {
      dispatch({
        type: 'set-user-profile',
        payload: { userProfile: data }
      })
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#444851' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            <img alt=" " src={logo} width={170} />
            <span style={{ paddingLeft: 15, paddingRight: 15 }}>|</span>
            <span>Billing Portal</span>
          </Typography>
          <div>
            {state.userProfile.name ? state.userProfile.name : 'loading'}
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              {state.userProfile.imageUrl ? (
                <img
                  style={{ height: 36, borderRadius: '50%' }}
                  src={state.userProfile.imageUrl}
                  alt=" "
                />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
