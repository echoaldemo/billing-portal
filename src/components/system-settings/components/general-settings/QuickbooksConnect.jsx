import React, { useEffect, useState } from 'react'
import { authorizeUri } from 'utils/auth'
import { CircularProgress, Dialog } from '@material-ui/core'
import { LoadingModal, WarningModal } from 'common-components'
import logo from 'assets/qb_button.png'
import { get } from 'utils/api'

export default function QuickbooksConnect() {
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(false)
  const [companyName, setCompanyName] = useState('')
  const [dis, setDis] = useState(false)

  useEffect(() => {
    checkQb()
  }, [])

  const checkQb = () => {
    get('/api/qb/company')
      .then(res => {
        setCompanyName(res.data.CompanyInfo.CompanyName)
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

  const handleDisconnect = () => {
    setModal(true)
    setDis(false)
    get('/api/qb/disconnect').then(() => {
      checkQb()
    })
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
      <Dialog open={dis}>
        <WarningModal
          text='Confirmation'
          content={`Are you sure you want to disconnect to ${companyName}`}
          closeFn={() => setDis(false)}
          secondaryFn={handleDisconnect}
          btnText='Disconnect'
        />
      </Dialog>
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
      </p>
      {loading ? (
        <div className='loading'>
          <CircularProgress size={20} />
        </div>
      ) : (
        <>
          {refresh ? (
            <>
              <span>
                You are <b>Connected</b> to <b>{companyName}</b> <br />
                <br />
                Click the <b>Disconnect</b> button to logout <b>Quickbooks</b>.
                <br />
                <br />
              </span>
              <button className='refesh-button' onClick={() => setDis(true)}>
                <span>Disconnect</span>
              </button>
            </>
          ) : (
            <>
              <span>
                Click the <b>Connect</b> button to get connected to{' '}
                <b>Quickbooks Online</b>.
                <br />
                <br />
              </span>
              <span
                className='connect-btn'
                onClick={() => {
                  setLoading(true)
                  authorizeUri()
                }}
              >
                <img src={logo} alt='logo' />
              </span>
            </>
          )}
        </>
      )}
      <br />
      <br />
    </div>
  )
}
