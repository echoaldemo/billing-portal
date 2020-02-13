import React from 'react'
import { Table, TableHead, TableRow, TableCell } from '@material-ui/core'
import { useStyles } from './../constVar'
const TableHeader = () => {
  const classes = useStyles()

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className={classes.tab1}>
            <b>Item Description</b>
          </TableCell>
          <TableCell align="right" className={classes.tab2}>
            <b>Quantity</b>
          </TableCell>
          <TableCell align="right" className={classes.tab2}>
            <b>Rate</b>
          </TableCell>
          <TableCell align="right" className={classes.tab2}>
            <b>Amount</b>
          </TableCell>
          <TableCell align="right" className={classes.tab3} />
        </TableRow>
      </TableHead>
    </Table>
  )
}

export default TableHeader
