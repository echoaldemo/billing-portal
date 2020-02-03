import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TableFooter } from "@material-ui/core";

function createData(name, amount, quantity) {
  return { name, amount, quantity };
}

const rows = [
  createData("Billable Hours", 159, 6.0),
  createData("Billable Hours", 159, 6.0),
  createData("Billable Hours", 159, 6.0),
  createData("Billable Hours", 159, 6.0)
];

export default function ItemsTable() {
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
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.amount}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.quantity}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell component="th" scope="row">
              <b style={{ fontSize: 15 }}>Total</b>
            </TableCell>
            <TableCell component="th" scope="row">
              <b style={{ fontSize: 15 }}>124</b>
            </TableCell>
            <TableCell component="th" scope="row">
              <b style={{ fontSize: 15 }}>$24,332.00</b>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
