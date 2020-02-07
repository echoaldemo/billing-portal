import React, { useContext, useState, useEffect } from 'react'
import {
  Table,
  TableFooter,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { InputField } from 'common-components'
import { StateContext } from 'context/StateContext'
export default function ItemsTable({ formState }) {
  const { state } = useContext(StateContext)
  const [billable, setBillable] = useState({
    DetailType: 'SalesItemLineDetail',
    Amount: '',
    SalesItemLineDetail: {
      ItemRef: {
        value: '21',
        name: 'Billable hours'
      },
      Qty: '',
      UnitPrice: ''
    }
  })
  const [performance, setPerformance] = useState({
    DetailType: 'SalesItemLineDetail',
    Amount: '',
    SalesItemLineDetail: {
      ItemRef: {
        value: '22',
        name: 'Performance'
      },
      Qty: '',
      UnitPrice: ''
    }
  })
  const [did, setDid] = useState({
    DetailType: 'SalesItemLineDetail',
    Amount: '',
    SalesItemLineDetail: {
      ItemRef: {
        value: '23',
        name: 'DID'
      },
      Qty: '',
      UnitPrice: ''
    }
  })
  const getTotalQty = () => {
    let totalQty = 0
    formState.Line.forEach(item => {
      if (item.SalesItemLineDetail) {
        totalQty += item.SalesItemLineDetail.Qty
      }
    })

    return totalQty
  }

  useEffect(() => {
    if (Object.keys(formState).length > 0) {
      try {
        setBillable(
          formState.Line.find(
            line => line.SalesItemLineDetail.ItemRef.value === '21'
          )
        )
      } catch {}
      try {
        setPerformance(
          formState.Line.find(
            line => line.SalesItemLineDetail.ItemRef.value === '22'
          )
        )
      } catch {}
      try {
        setDid(
          formState.Line.find(
            line => line.SalesItemLineDetail.ItemRef.value === '23'
          )
        )
      } catch {}
    }
  }, [formState])

  const totalObj = formState.Line
    ? formState.Line[formState.Line.length - 1]
    : {}

  return (
    <React.Fragment>
      {Object.keys(formState).length > 0 ? (
        <TableContainer style={{ border: 'solid 1px #F1f1f1' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Item Description</b>
                </TableCell>
                <TableCell>
                  <b>Quantity</b>
                </TableCell>
                <TableCell>
                  <b>Rate</b>
                </TableCell>
                <TableCell>
                  <b>Amount</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {console.log(formState)}
              <TableRow>
                <TableCell component="th" scope="row" style={{ width: '50%' }}>
                  Billable hours
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={
                      billable.SalesItemLineDetail
                        ? billable.SalesItemLineDetail.Qty
                        : ''
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={
                      billable.SalesItemLineDetail
                        ? billable.SalesItemLineDetail.UnitPrice
                        : ''
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={formatter.format(billable.Amount)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row" style={{ width: '50%' }}>
                  Performance
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={
                      performance.SalesItemLineDetail
                        ? performance.SalesItemLineDetail.Qty
                        : ''
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={
                      performance.SalesItemLineDetail
                        ? performance.SalesItemLineDetail.UnitPrice
                        : ''
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={formatter.format(performance.Amount)}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row" style={{ width: '50%' }}>
                  DID
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={
                      did.SalesItemLineDetail ? did.SalesItemLineDetail.Qty : ''
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={
                      did.SalesItemLineDetail
                        ? did.SalesItemLineDetail.UnitPrice
                        : ''
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    disabled={!state.editManageData}
                    value={formatter.format(did.Amount)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b style={{ fontSize: 15 }}>Total</b>
                </TableCell>

                <TableCell component="th" scope="row">
                  <b style={{ fontSize: 15 }}>{getTotalQty()}</b>
                </TableCell>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell component="th" scope="row">
                  <b style={{ fontSize: 15 }}>
                    {formatter.format(totalObj.Amount)}
                  </b>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : null}
    </React.Fragment>
  )
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
