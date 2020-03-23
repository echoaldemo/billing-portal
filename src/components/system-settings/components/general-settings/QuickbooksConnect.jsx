import React, { useEffect, useState } from 'react'
import { authorizeUri } from 'utils/auth'
import { CircularProgress } from '@material-ui/core'
import { LoadingModal } from 'common-components'
import logo from 'assets/qb_button.png'
import { get } from 'utils/api'

export default function QuickbooksConnect() {
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    refreshToken()
  }, [])

  const refreshToken = () => {
    get('/refreshAccessToken')
      .then(() => {
        setLoading(false)
        setRefresh(true)
        setModal(false)
      })
      .catch(() => {
        setLoading(false)
        setRefresh(false)
        setModal(false)
      })
  }

  const handleRefresh = () => {
    setModal(true)
    setLoading(true)
    refreshToken()
  }

  const handleCancel = () => {
    setModal(false)
    setLoading(false)
  }

  return (
    <div>
      <LoadingModal
        open={modal}
        text='Please wait...'
        cancelFn={handleCancel}
      />
      <h3 style={{ marginTop: 0 }}>Let's get you connected to Quickbooks!</h3>
      <p>
        Et occaecat proident amet et nulla veniam sit.Ipsum occaecat nulla nisi
        anim ex tempor laborum amet enim id consectetur.Officia mollit anim
        laboris Lorem incididunt pariatur nisi nulla esse.Minim sunt non laborum
        reprehenderit voluptate non.Officia nulla ipsum enim sunt ut proident
        nisi adipisicing reprehenderit reprehenderit excepteur aute minim
        reprehenderit.Incididunt nisi ex laboris incididunt cupidatat tempor
        veniam.Cupidatat sint sit excepteur consectetur ullamco consequat elit
        fugiat excepteur.Do quis deserunt do sint incididunt veniam
        labore.Consectetur mollit labore id qui adipisicing dolore.
        <br />
        <br />
        Click the <b>Connect</b> button to get connected to{' '}
        <b>Quickbooks Online</b>.
        <br />
      </p>
      {loading ? (
        <div className='loading'>
          <CircularProgress size={20} />
        </div>
      ) : (
        <>
          {refresh ? (
            <button className='refesh-button' onClick={handleRefresh}>
              <span>Refresh Token</span>
            </button>
          ) : (
            <span className='connect-btn' onClick={authorizeUri}>
              <img src={logo} alt='logo' />
            </span>
          )}
        </>
      )}
      <br />
      <br />
    </div>
  )
}
