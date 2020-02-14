import React from 'react'
import { Table, TableHead, TableRow, TableCell } from '@material-ui/core'
import { useStyles } from './../constVar'
const TableHeader = () => {
  const classes = useStyles()

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow style={{ backgroundColor: '#dce9f1' }}>
          <TableCell className={classes.tab1}>
            <b style={{ color: '#4C7F9E' }}>Campaigns</b>
          </TableCell>
          <TableCell className={classes.tab4}>
            <b style={{ color: '#4C7F9E' }}>Services</b>
          </TableCell>
          <TableCell align="right" className={classes.tab2}>
            <b style={{ color: '#4C7F9E' }}>Quantity</b>
          </TableCell>
          <TableCell align="right" className={classes.tab2}>
            <b style={{ color: '#4C7F9E' }}>Rate</b>
          </TableCell>
          <TableCell align="right" className={classes.tab2}>
            <b style={{ color: '#4C7F9E' }}>Amount</b>
          </TableCell>
          <TableCell align="right" className={classes.tab3} />
        </TableRow>
      </TableHead>
    </Table>
  )
}

export default TableHeader
