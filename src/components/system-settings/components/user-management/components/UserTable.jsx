import React, { useContext } from 'react'
import { Table, TablePagination } from '@material-ui/core'
import UserTableHeader from './UserTableHeader'
import UserTableBody from './UserTableBody'
import MenuButton from './MenuButton'
import ManageModal from './ManageModal'
import HeaderToolBar from './HeaderToolBar'
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
      <HeaderToolBar />
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
