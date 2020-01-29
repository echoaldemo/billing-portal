import React from 'react'
import { TableBody, TableCell, Checkbox, TableRow, Stepper, Step, StepLabel } from '@material-ui/core'

import AcUnitIcon from '@material-ui/icons/AcUnit';


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
              <TableCell >
                {item.total}
              </TableCell>
              <TableCell style={{ paddingRight: 0, paddingLeft: 0, display: "flex", }}>
                <Stepper activeStep={1} alternativeLabel style={{ width: 5, margin: 0, padding: 0 }}>
                  {[0, 1, 2].map(label => (
                    <Step key={label}>
                      <StepLabel StepIconComponent={AcUnitIcon}>
                        1
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
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