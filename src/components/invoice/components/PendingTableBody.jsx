import React from 'react'
import { TableBody, TableCell, Checkbox, TableRow, } from '@material-ui/core'

import { TableStepper } from "./index"
import { getRandomInt } from "utils/func"
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const PendingTableBody = ({ data }) => {


  return (
    <TableBody>
      {
        data.map((item, i) => {

          return (
            <TableRow
              hover
              aria-checked={false}
              key={i}
            >
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>
                {item.invoice}
              </TableCell>
              <TableCell >
                {item.invoice_type}
              </TableCell>
              <TableCell >
                {item.company}
              </TableCell>
              <TableCell >
                {item.campaigns}
              </TableCell>
              <TableCell >
                {item.start_date}
              </TableCell>
              <TableCell >
                {item.due_date}
              </TableCell>
              <TableCell>
                {formatter.format(item.total)}
              </TableCell>
              <TableCell>
                <TableStepper activeStep={getRandomInt(3)} />
              </TableCell>
              <TableCell>
                <u style={{ cursor: "pointer", fontSize: 14 }} >
                  <b>Manage</b>
                </u>

              </TableCell>
            </TableRow>
          )
        })
      }
    </TableBody >
  )
}
export default PendingTableBody