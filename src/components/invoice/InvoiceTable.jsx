import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import { Add } from '@material-ui/icons'
import { Button } from '@material-ui/core'
import NewInvoice from '../NewInvoice/NewInvoice'

import { get } from 'utils/api'
import { TableLoader } from 'common_components'

function createData(
  invoice,
  company,
  campaign,
  billing_type,
  billing_period,
  due_date,
  status
) {
  return {
    invoice,
    company,
    campaign,
    billing_type,
    billing_period,
    due_date,
    status
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
const generateData = () => {
  let newArr = []

  for (let i = 1; i <= 100; i++) {
    const randomNum = getRandomInt(2)
    let invoice = `Invoice ${i}`
    let company = `Company ${i}`
    let campaign = `campaign ${i}`
    let billing_type = randomNum === 0 ? 'Performance' : 'Hourly'
    let billing_period = randomNum === 0 ? 'Weekly' : 'Monthly'
    let due_date = 'July 4, 2019'
    let status = randomNum === 0 ? 'Paid' : 'Unpaid'

    const data = createData(
      invoice,
      company,
      campaign,
      billing_type,
      billing_period,
      due_date,
      status
    )

    newArr.push(data)
  }
  return newArr
}

const rows = generateData()

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

const headCells = [
  {
    id: 'invoice',
    disablePadding: true,
    label: 'INVOICE'
  },
  { id: 'company', numeric: true, disablePadding: false, label: 'CUSTOMER' },
  { id: 'campaign', numeric: true, disablePadding: false, label: 'DATE' },
  {
    id: 'billing-type',
    numeric: true,
    disablePadding: false,
    label: 'DUE DATE'
  },
  {
    id: 'billing-period',
    numeric: true,
    disablePadding: false,
    label: 'BALANCE'
  },

  { id: 'due-date', numeric: true, disablePadding: false, label: 'TOTAL' },
  { id: 'status', numeric: true, disablePadding: false, label: 'STATUS' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'ACTION' }
]

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85)
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark
      },
  title: {
    flex: '1 1 100%'
  }
}))

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles()
  const { numSelected } = props
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0
        })}
      >
        {numSelected > 0 ? (
          <Typography
            className={classes.title}
            color="inherit"
            variant="subtitle1"
          >
            {numSelected} selected
          </Typography>
        ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle">
              List of all Invoices
          </Typography>
          )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
            <Tooltip title="Add new incoice">
              <Button className="add-btn" onClick={handleOpen}>
                <Add /> New Invoice
            </Button>
            </Tooltip>
          )}
      </Toolbar>
      <NewInvoice
        open={open}
        handleClose={handleClose}
        handleOpen={handleOpen}
      />
    </>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

export default function EnhancedTable() {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false) // eslint-disable-line
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  const [row2, setRow2] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    get('/api/invoice').then(res => {
      setRow2(res.data.QueryResponse.Invoice)
      console.log(res.data.QueryResponse.Invoice)
      setLoading(false)
    })
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)
  const displayStatus = due_date => {
    const randomDays = getRandomInt(20)
    return due_date === 'Paid' ? (
      <span className="success-color">Paid {randomDays} days ago</span>
    ) : (
        <span className="danger-color">Overdue {randomDays} day</span>
      )
  }
  return (
    <div className={classes.root}>
      <EnhancedTableToolbar numSelected={selected.length} />
      {
        loading ?
          (
            <TableLoader />

          )
          : (
            <TableContainer>
              <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
                aria-label="enhanced table"
              >
                <EnhancedTableHead
                  classes={classes}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={row2.length}
                />

                <TableBody>
                  {stableSort(row2, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name)
                      const labelId = `enhanced-table-checkbox-${index}`

                      return (
                        <TableRow
                          hover
                          onClick={event => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={index}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.DocNumber}
                          </TableCell>
                          <TableCell align="right">
                            {row.CustomerRef.name}
                          </TableCell>
                          <TableCell align="right">{row.TxnDate}</TableCell>
                          <TableCell align="right">{row.DueDate}</TableCell>
                          <TableCell align="right">{row.Balance}</TableCell>

                          <TableCell align="right">{row.TotalAmt}</TableCell>
                          <TableCell align="right">
                            {displayStatus(`row.status`)}
                          </TableCell>
                          <TableCell align="right">
                            <u>
                              <b>Edit </b>
                            </u>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )
      }
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}
