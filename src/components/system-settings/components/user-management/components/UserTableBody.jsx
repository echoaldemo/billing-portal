import React, { useContext } from 'react'
import { Settings } from '@material-ui/icons'
import { TableBody, TableRow, TableCell } from '@material-ui/core'
import StatusCell from './StatusCell'
import { store } from 'context/UserManagementContext'

const UserTableBody = () => {
  const {
    state: { search, users, rowsPerPage, page },
    dispatch
  } = useContext(store)
  return (
    <TableBody>
      {search
        ? users
            .filter(u => u.name.match(new RegExp(search, 'i')))
            .map((user, i) => {
              return i < rowsPerPage ? (
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
            })
        : users
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((user, i) => (
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
            ))}
    </TableBody>
  )
}

export default UserTableBody
