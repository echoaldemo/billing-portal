import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const UserTableHeader = () => {
  return (
    <TableHead className="user-table-header">
      <TableRow>
        <TableCell />
        <TableCell>
          <b>Name</b>
        </TableCell>
        <TableCell>
          <b>Email</b>
        </TableCell>
        <TableCell>
          <b>Status</b>
        </TableCell>
        <TableCell>
          <b>Type</b>
        </TableCell>
        <TableCell />
      </TableRow>
    </TableHead>
  )
}

export default UserTableHeader
