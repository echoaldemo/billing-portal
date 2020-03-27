import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  Checkbox
} from "@material-ui/core";

const InvoiceTableHeader = props => {
  const {
    onSelectAllClick,
    headCells,
    check
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            onChange={onSelectAllClick}
            checked={check}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="left"
          >
              <b>{headCell.label}</b>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default InvoiceTableHeader;
