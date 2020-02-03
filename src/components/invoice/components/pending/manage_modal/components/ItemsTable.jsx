import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableFooter } from "@material-ui/core";

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
                    {console.log(row.SalesItemLineDetail, "<=")}
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
          {console.log(totalObj, "<=====")}
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
  );
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
