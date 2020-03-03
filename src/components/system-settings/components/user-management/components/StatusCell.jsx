import React from 'react'
import { TableCell } from '@material-ui/core'

const StatusCell = ({ status }) => {
  return (
    <TableCell>
      <span className={`cell-status-span user-${status}`}>{status}</span>
    </TableCell>
  )
}

export default StatusCell
