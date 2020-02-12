import React from "react";
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox
} from "@material-ui/core";

const InvoiceTableHeader = props => {
  const {
    onSelectAllClick,
    order,
    orderBy,
    onRequestSort,
    headCells,
    check
  } = props;

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };
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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <b>{headCell.label}</b>
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};
export default InvoiceTableHeader;
