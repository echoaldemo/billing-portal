import React from 'react'
import { Button } from '@material-ui/core'
import { StateContext } from 'context/StateContext'
import { patch } from 'utils/api'
export default function ManagePendingFooter() {
  const {
    state,
    dispatch,
    getPendingInvoicesData,
    deletePendingStatus
  } = React.useContext(StateContext)

  const updateStateStatus = status => {
    dispatch({
      type: 'set-update-loading',
      payload: { updateLoading: true }
    })

    patch(`/api/pending/edit/${state.selectedData.id}`, { status: status })
      .then(res => {
        dispatch({
          type: 'set-update-loading',
          payload: { updateLoading: false }
        })
        dispatch({
          type: 'set-selected-data',
          payload: { selectedData: res.data }
        })
      })
      .then(() => {
        getPendingInvoicesData()
      })
  }

  const renderStageButton = item => {
    switch (item) {
      case 0:
        return (
          <Button
            variant="contained"
            color="primary"
            style={{
              fontWeight: 'bold',
              backgroundColor: '#f89222',
              textDecoration: 'none'
            }}
            onClick={() => {
              updateStateStatus(1)
            }}
          >
            Complete Review
          </Button>
        )
      case 1:
        return (
          <Button
            variant="contained"
            color="primary"
            style={{
              fontWeight: 'bold',
              backgroundColor: '#2ca01d',
              textDecoration: 'none'
            }}
            onClick={() => {
              updateStateStatus(2)
            }}
          >
            Approve Invoice
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15
      }}
    >
      <div>
        <Button
          variant="contained"
          color="secondary"
          style={{ fontWeight: 'bold', textDecoration: 'none' }}
          onClick={() => {
            deletePendingStatus(state.selectedData.id)
          }}
        >
          Delete
        </Button>
        &emsp;
        <h5 style={{ display: 'inline-block', color: '#444851' }}>
          Enim nostrud ipsum cupidatat ad elit officia velit deserunt laboris.
        </h5>
      </div>
      <div>
        {state.selectedData.status === 0 ? (
          <Button
            variant="contained"
            style={{ fontWeight: 'bold', textDecoration: 'none' }}
            onClick={() => {
              updateStateStatus(2)
            }}
          >
            Skip
          </Button>
        ) : (
          <Button
            variant="contained"
            style={{ fontWeight: 'bold', textDecoration: 'none' }}
            onClick={() => {
              updateStateStatus(state.selectedData.status - 1)
            }}
          >
            Revert
          </Button>
        )}
        &emsp;
        {renderStageButton(state.selectedData.status)}
      </div>
    </div>
  )
}
