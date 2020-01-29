import React from 'react'
import { StateContext } from "context/StateContext"
import { TableBody, TableCell, Checkbox, TableRow } from '@material-ui/core'
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const InvoiceTableBody = ({ data }) => {
  const { setEditModal } = React.useContext(StateContext)

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
                {item.DocNumber}
              </TableCell>
              <TableCell>
                {item.CustomerRef.name}
              </TableCell>
              <TableCell>
                {item.TxnDate}
              </TableCell>
              <TableCell>
                {item.DueDate}
              </TableCell>
              <TableCell>
                {formatter.format(item.Balance)}
              </TableCell>
              <TableCell>
                {formatter.format(item.TotalAmt)}
              </TableCell>
              <TableCell>
                <span className="danger-color">Pending <small>({i === 0 ? "hours ago" : `${i} days ago`} )</small></span>
              </TableCell>
              <TableCell>
                <u style={{ cursor: "pointer", fontSize: 12 }} onClick={() => {
                  setEditModal(true)

                }}>
                  <b>View Details </b>
                </u>

              </TableCell>
            </TableRow>
          )
        })
      }


    </TableBody>
  )
}
export default InvoiceTableBody