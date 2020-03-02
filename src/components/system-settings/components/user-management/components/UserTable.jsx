import React, { useContext } from 'react'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TablePagination
} from '@material-ui/core'
import { Settings, Search } from '@material-ui/icons'
import UserTableHeader from './UserTableHeader'
import StatusCell from './StatusCell'
import MenuButton from './MenuButton'
import ManageModal from './ManageModal'
import { InputField } from 'common-components'
import { store } from 'context/UserManagementContext'

const UserTable = () => {
  const {
    state: { users, page, rowsPerPage, search },
    dispatch
  } = useContext(store)

  const setPage = (e, newPage) => {
    dispatch({ type: 'SET_PAGE', payload: { page: newPage } })
  }

  return (
    <>
      <div style={{ width: '50%', marginBottom: 16 }}>
        <InputField
          fullWidth
          label="Search by number or company"
          InputProps={{
            endAdornment: <Search style={{ color: '#CCC' }} />
          }}
          value={search}
          onChange={e =>
            dispatch({
              type: 'HANDLE_SEARCH',
              payload: { search: e.target.value }
            })
          }
        />
      </div>
      <div className="users-table-container">
        <Table>
          <UserTableHeader />
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, i) => {
                return user.name.match(new RegExp(search, 'i')) ? (
                  <TableRow key={i}>
                    <TableCell>
                      <img
                        style={{ height: 36, borderRadius: '50%' }}
                        src={user.imageUrl}
                        alt=""
                      />
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
              })}
          </TableBody>
        </Table>
      </div>
      <MenuButton />
      <TablePagination
        rowsPerPageOptions={['']}
        labelRowsPerPage=""
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={setPage}
        onChangeRowsPerPage={e =>
          dispatch({
            type: 'HANDLE_ROWS_PER_PAGE',
            payload: { rowsPerPage: e.target.value }
          })
        }
      />
      <ManageModal />
    </>
  )
}

export default UserTable
