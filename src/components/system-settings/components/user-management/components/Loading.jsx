import React from 'react'
import { CircularProgress } from '@material-ui/core'
const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress
        thickness={4.5}
        size={50}
        style={{ color: '#6698c7', marginTop: '25vh' }}
      />
    </div>
  )
}

export default Loading
