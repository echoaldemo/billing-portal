import React, { useContext } from "react";
import {
  Table,
  TableFooter,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import { StateContext } from "context/StateContext";
export default function ItemsTable({ formState }) {
  const getTotalQty = () => {
    let totalQty = 0;
    formState.Line.forEach(item => {
      if (item.SalesItemLineDetail) {
        totalQty += item.SalesItemLineDetail.Qty;
      }
    });

    return totalQty;
  };

  const totalObj = formState.Line
    ? formState.Line[formState.Line.length - 1]
    : {};

  return (
    <React.Fragment>
      {Object.keys(formState).length > 0 ? (
        <TableContainer style={{ border: "solid 1px #F1f1f1" }}>
          <Table aria-label="simple table">
            <TableHead>
              {console.log(formState, "form")}
              <TableRow>
                <TableCell>
                  <b>Item Description</b>
                </TableCell>
                <TableCell>
                  <b>Quantity</b>
                </TableCell>
                <TableCell>
                  <b>Amount</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formState.Line.map(row => {
                if (row.SalesItemLineDetail)
                  return (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.SalesItemLineDetail.ItemRef.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.SalesItemLineDetail.Qty}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {formatter.format(row.SalesItemLineDetail.UnitPrice)}
                      </TableCell>
                    </TableRow>
                  );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b style={{ fontSize: 15 }}>Total</b>
                </TableCell>

                <TableCell component="th" scope="row">
                  <b style={{ fontSize: 15 }}>{getTotalQty()}</b>
                </TableCell>
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
  );
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
