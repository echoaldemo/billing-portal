import React from "react";

import {
  Table,
  TableFooter,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

export default function ItemsTable({ formState, setFormState }) {
  const getTotalQty = () => {
    let totalQty = 0;
    formState.Line.map(item => {
      if (item.SalesItemLineDetail) {
        totalQty += item.SalesItemLineDetail.Qty;
      }
    });

    return totalQty;
  };

  const totalObj = formState.Line[formState.Line.length - 1];

  return (
    <React.Fragment>
      <TableContainer style={{ border: "solid 1px #F1f1f1" }}>
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
    </React.Fragment>
  );
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
