import React from 'react'
import { StateContext } from 'context/StateContext'
import { TableBody, TableCell, Checkbox, TableRow } from '@material-ui/core'
import moment from 'moment'
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})

const InvoiceTableBody = ({ data }) => {
  const { setEditModal } = React.useContext(StateContext)

  const dateCal = date => {
    const d1 = new moment(date, 'YYYY-MM-DD')
    return d1.diff(new Date(), 'days')
  }

  return (
    <TableBody>
      {data.map((item, i) => {
        let due = dateCal(item.DueDate)
        return (
          <TableRow hover aria-checked={false} key={i}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>{item.DocNumber}</TableCell>
            <TableCell>{item.CustomerRef.name}</TableCell>
            <TableCell>{item.TxnDate}</TableCell>
            <TableCell>{item.DueDate}</TableCell>
            <TableCell>{formatter.format(item.Balance)}</TableCell>
            <TableCell>{formatter.format(item.TotalAmt)}</TableCell>
            <TableCell>
              {item.Balance === 0 ? (
                <span className="success-color">Paid</span>
              ) : due === 0 ? (
                <span>Due today</span>
              ) : due === 1 ? (
                <span>Due tomorrow</span>
              ) : due < -90 ? (
                <span className="danger-color">
                  Overdue <small>{`90+ days`}</small>
                </span>
              ) : due < 0 ? (
                <span className="danger-color">
                  Overdue <small>{`${due * -1} days`}</small>
                </span>
              ) : (
                <span>
                  Due in <small>{`${due} days`}</small>
                </span>
              )}
            </TableCell>
            <TableCell>
              <u
                style={{ cursor: 'pointer', fontSize: 12 }}
                onClick={() => {
                  setEditModal(true)
                }}
              >
                <b>View Details </b>
              </u>
            </TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}
export default InvoiceTableBody
