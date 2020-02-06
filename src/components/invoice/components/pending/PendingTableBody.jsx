import React from "react";
import { TableBody, TableCell, Checkbox, TableRow } from "@material-ui/core";
import { getRandomInt } from "utils/func";
import { truncate } from "utils/func";
import MenuButton from "./MenuButton";
import { Drafts, Visibility, ThumbUp } from "@material-ui/icons";
import moment from "moment";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
const statusToString = status => {
  switch (status) {
    case 0:
      return (
        <div className="display-align-center draft-color">
          <Drafts fontSize="small" /> &nbsp; <b>Draft</b>
        </div>
      );
    case 1:
      return (
        <div className="display-align-center review-color">
          <Visibility fontSize="small" /> &nbsp; <b>Reviewed</b>
        </div>
      );
    case 2:
      return (
        <div className="display-align-center approve-color">
          <ThumbUp fontSize="small" /> &nbsp; <b>Approved</b>
        </div>
      );
  }
};

const PendingTableBody = ({ data }) => {
  return (
    <TableBody>
      {console.log(data)}
      {data.map((item, i) => {
        // let campaigns = item.campaigns.split(",");
        return (
          <TableRow hover aria-checked={false} key={i}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>{statusToString(item.status)}</TableCell>
            <TableCell>{item.docNumber}</TableCell>
            <TableCell>{item.invoiceType}</TableCell>
            <TableCell>{item.billingType}</TableCell>
            <TableCell>{item.company.name}</TableCell>
            <TableCell>{moment(item.startDate).format("MMMM D, Y")}</TableCell>
            <TableCell>{moment(item.dueDate).format("MMMM D, Y")}</TableCell>
            <TableCell>{formatter.format(item.total)}</TableCell>

            <TableCell>
              <MenuButton item={item} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
export default PendingTableBody;
