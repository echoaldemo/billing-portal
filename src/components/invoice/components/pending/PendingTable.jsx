/* eslint-disable */
import React from 'react'
import { StateContext } from 'context/StateContext'
import { TableLoader } from 'common-components'
import { get } from 'utils/api'
import { InvoiceTableHeader, PendingTableBody, TableStepper } from '../index'
import {
  Table,
  TableContainer,
  TablePagination,
  Divider
} from '@material-ui/core'

import { mockData } from '../mockData'
import ManagePendingInvoice from './manage_modal/ManagePendingInvoice'
import DuplicateModal from './duplicate-modal/DuplicateModal'

const headCells = [
  { id: 'status', label: 'Status' },
  { id: 'invoice', label: 'Invoice' },
  { id: 'invoice_type', label: 'Type' },
  { id: 'company', label: 'Company' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'start_date', label: 'Start date' },
  { id: 'due-date', label: 'Due date' },
  { id: 'total', label: 'Total' },
  { id: 'actions', label: 'Actions' }
]

const PendingTable = () => {
  const { state, getPendingInvoicesData } = React.useContext(StateContext)

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  React.useEffect(() => {
    getPendingInvoicesData()
  }, [])

  function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  }

  function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0])
      if (order !== 0) return order
      return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
  }
  function getSorting(order, orderBy) {
    return order === 'desc'
      ? (a, b) => desc(a, b, orderBy)
      : (a, b) => -desc(a, b, orderBy)
  }

  function sortData(data) {
    return stableSort(data, getSorting(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    )
  }
  return (
    <div>
      {state.loading ? (
        <TableLoader />
      ) : (
        <React.Fragment>
          <TableContainer style={{ minHeight: 480 }}>
            <Table>
              <InvoiceTableHeader headCells={headCells} />
              <PendingTableBody data={sortData(state.data)} />
            </Table>
          </TableContainer>
          <Divider />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={state.data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </React.Fragment>
      )}
      <ManagePendingInvoice />
      <DuplicateModal />
    </div>
  )
}

export default PendingTable
