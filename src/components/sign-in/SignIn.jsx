import React, { useContext, useEffect, useState } from 'react'
import { GoogleLogin } from 'react-google-login'
import { get, post } from 'utils/api'
import { StateContext } from 'context/StateContext'
import logo from 'assets/pp_logo_transparent_bkgrd.png'
import './style/index.scss'
import { ReportBugButton } from 'common-components'
import SEO from 'utils/seo'

let googleId = localStorage.getItem('googleId')

const SignIn = ({ history }) => {
  const { state, dispatch } = useContext(StateContext)
  const [load, setLoad] = useState(true)
  const [request, setRequest] = useState(false)
  const [inactive, setInactive] = useState(false)
  const [invalid, setInvalid] = useState(false)

  useEffect(() => {
    if (state.auth) {
      history.push('/overview')
    } else {
      getUser(googleId)
    }
  }, []) // eslint-disable-line

  const getUser = async googleId => {
    const { data } = await get(`/api/users/${googleId}`)
    if (!data) {
      localStorage.clear()
      history.push('/')
    } else {
      dispatch({
        type: 'set-user-profile',
        payload: { userProfile: data }
      })
      localStorage.setItem('googleId', data.googleId)
      if (data.status === 'active') {
        dispatch({ type: 'set-auth', payload: { auth: true } })
        history.push('/overview')
      } else if (data.status === 'request') {
        setRequest(true)
      } else if (data.status === 'inactive') {
        setInactive(true)
      } else {
        history.push('/')
      }
    }
    setLoad(false)
  }

  const responseGoogle = async res => {
    if (res.googleId) {
      const {
        profileObj: { email }
      } = res
      const find = await get(`/api/users/${res.googleId}`)
      if (find.data) {
        getUser(res.googleId)
      } else {
        res.profileObj.status = 'request'
        res.profileObj.type = 'user'
        if (email.match(/@boomsourcing/i) || email.match(/@boom.camp/i)) {
          post('/api/users/create', res.profileObj).then(res => {
            dispatch({
              type: 'set-user-profile',
              payload: { userProfile: res.data }
            })
            localStorage.setItem('googleId', res.data.googleId)
            setRequest(true)
          })
        } else {
          dispatch({
            type: 'set-user-profile',
            payload: { userProfile: res.profileObj }
          })
          setInvalid(true)
        }
      }
    }
  }

  return (
    <>
      <SEO title='Sign In' />
      {!load ? (
        <div className='landing-page-wrapper'>
          <div className='left-component-container'>
            <div className='landing-component-wrapper'>
              <div className='logo-container'>
                <img src={logo} width={180} alt='' />
              </div>
              {request ? (
                <div className='message-container'>
                  <h2 className='message-header'>
                    Welcome {state.userProfile.name}
                  </h2>
                  <div>
                    <p className='message-text'>
                      Please wait for the Administrator to accept your request
                    </p>
                  </div>
                </div>
              ) : inactive ? (
                <div className='message-container'>
                  <h2 className='message-header'>
                    Welcome {state.userProfile.name}
                  </h2>
                  <div>
                    <p className='message-text'>
                      Your account have been disabled. Please ask the
                      Administrator to activate your account
                    </p>
                  </div>
                </div>
              ) : invalid ? (
                <div className='message-container'>
                  <h2 className='message-header'>
                    Welcome {state.userProfile.name}
                  </h2>
                  <div>
                    <p className='message-text'>
                      Your email is invalid. Only @boomsoourcing or @boom.camp
                      can use the application
                    </p>
                  </div>
                </div>
              ) : (
                <div className='message-container'>
                  <h2 className='message-header'>Welcome to Billing Portal</h2>
                  <div>
                    <p className='message-text'>
                      Laborum aliquip deserunt duis consequat laboris. Ut
                      aliquip ullamco tempor deserunt dolore culpa cillum.
                    </p>
                  </div>
                </div>
              )}

              <div className='render-component-container'>
                <div className='login-btn-container'>
                  <GoogleLogin
                    className='LoginSignIn'
                    clientId='28861163542-0mub2dqtubvcjgun3n9vlrnkgfhgi7n4.apps.googleusercontent.com'
                    buttonText={
                      <span style={{ textTransform: 'none', fontWeight: 600 }}>
                        Sign in with Google
                      </span>
                    }
                    style={{
                      width: 150,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>
              </div>
            </div>
            <div className='landing-footer'>
              <span>All rights reserved, Perfect Pitch 2019</span>
            </div>
          </div>
          <div className='right-component-container'>
            <div className='quotes-primary'>
              "Mollit commodo velit duis in irure ipsum. Quis nulla enim ut
              laborum. Occaecat amet duis laborum culpa velit."
            </div>
            <div className='quotes-secondary'>-Anonymous</div>
            <ReportBugButton />
          </div>
        </div>
      ) : null}
    </>
  )
}

export default SignIn
