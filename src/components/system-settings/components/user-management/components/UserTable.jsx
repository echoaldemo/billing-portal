import React, { useContext } from 'react'
import { Table, TablePagination } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import UserTableHeader from './UserTableHeader'
import UserTableBody from './UserTableBody'
import MenuButton from './MenuButton'
import ManageModal from './ManageModal'
import { InputField } from 'common-components'
import { store } from 'context/UserManagementContext'

const UserTable = () => {
  const {
    state: { users, page, rowsPerPage, search, count },
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
          label="Search by name"
          InputProps={{
            endAdornment: <Search style={{ color: '#CCC' }} />
          }}
          value={search}
          onChange={e => {
            if (e.target.value) {
              dispatch({ type: 'SET_PAGE', payload: { page: 0 } })
              dispatch({
                type: 'SET_COUNT',
                payload: {
                  count: users.filter(user =>
                    user.name.match(new RegExp(e.target.value, 'i'))
                  ).length
                }
              })
            }
            dispatch({
              type: 'HANDLE_SEARCH',
              payload: { search: e.target.value }
            })
          }}
        />
      </div>
      <div className="users-table-container">
        <Table>
          <UserTableHeader />
          <UserTableBody />
        </Table>
      </div>
      <MenuButton />
      <TablePagination
        rowsPerPageOptions={['']}
        labelRowsPerPage=""
        component="div"
        count={search ? count : users.length}
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
