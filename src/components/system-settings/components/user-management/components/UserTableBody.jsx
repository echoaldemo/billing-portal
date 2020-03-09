import React, { useContext } from 'react'
import { Settings } from '@material-ui/icons'
import { TableBody, TableRow, TableCell } from '@material-ui/core'
import StatusCell from './StatusCell'
import { store } from 'context/UserManagementContext'

const UserTableBody = () => {
  const {
    state: { search, users, rowsPerPage, page, filter },
    dispatch
  } = useContext(store)
  return (
    <TableBody>
      {search
        ? users
            .filter(u => u.name.match(new RegExp(search, 'i')))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, i) =>
              (filter.status === 'all' || filter.status === user.status) &&
              (filter.type === 'all' || filter.type === user.type) ? (
                <TableRow key={i}>
                  <TableCell>
                    <img src={user.imageUrl} alt="" />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <StatusCell status={user.status} />
                  <TableCell>{user.type}</TableCell>
                  <TableCell align="center">
                    <Settings
                      onClick={e =>
                        dispatch({
                          type: 'MENU_OPEN',
                          payload: {
                            anchorEl: e.currentTarget,
                            selectedUser: user
                          }
                        })
                      }
                      className="settings-icon"
                    />
                  </TableCell>
                </TableRow>
              ) : null
            )
        : users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, i) =>
              (filter.status === 'all' || filter.status === user.status) &&
              (filter.type === 'all' || filter.type === user.type) ? (
                <TableRow key={i}>
                  <TableCell>
                    <img src={user.imageUrl} alt="" />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <StatusCell status={user.status} />
                  <TableCell>{user.type}</TableCell>
                  <TableCell align="center">
                    <Settings
                      onClick={e =>
                        dispatch({
                          type: 'MENU_OPEN',
                          payload: {
                            anchorEl: e.currentTarget,
                            selectedUser: user
                          }
                        })
                      }
                      className="settings-icon"
                    />
                  </TableCell>
                </TableRow>
              ) : null
            )}
    </TableBody>
  )
}

export default UserTableBody
