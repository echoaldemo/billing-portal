import React from 'react'
import { TableCell, TableHead, TableRow, TableSortLabel, Checkbox, } from '@material-ui/core'

const headCells = [
  { id: 'invoice', numeric: false, disablePadding: true, label: 'Invoice' },
  { id: 'customer', numeric: true, disablePadding: false, label: 'Customer' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'due-data', numeric: true, disablePadding: false, label: 'Due Date' },
  { id: 'balance', numeric: true, disablePadding: false, label: 'Balance' },
  { id: 'total', numeric: true, disablePadding: false, label: 'Total' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'actions', numeric: true, disablePadding: false, label: 'Actions' },


];


const InvoiceTableHeader = (props) => {

  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
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
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>

            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
export default InvoiceTableHeader