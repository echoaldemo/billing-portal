import React from "react";
import { TableBody, TableCell, Checkbox, TableRow } from "@material-ui/core";
import MenuButton from "./MenuButton";
import { Drafts, Visibility, ThumbUp } from "@material-ui/icons";
import moment from "moment";
import { StateContext } from "context/StateContext";
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
  const { selectedItems, setSelectedItems } = React.useContext(StateContext);

  const isSelected = item => {
    const getItem = selectedItems.filter(el => el.id === item.id);
    return getItem.length > 0 ? true : false;
  };

  const removeItem = item => {
    const removedItems = selectedItems.filter(el => el.id !== item.id);
    setSelectedItems(removedItems);
  };
  return (
    <TableBody>
      {data.map((item, i) => {
        return (
          <TableRow
            hover
            aria-checked={false}
            key={i}
            style={{
              backgroundColor: isSelected(item) ? "#C2DEF3" : null
            }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={e => {
                  if (e.target.checked) {
                    setSelectedItems([...selectedItems, { ...item }]);
                  } else {
                    removeItem(item);
                  }
                }}
                checked={isSelected(item)}
              />
            </TableCell>
            <TableCell>{statusToString(item.status)}</TableCell>
            <TableCell>{item.docNumber}</TableCell>
            <TableCell>{item.invoiceType}</TableCell>
            <TableCell>
              {item.billingType === "1" ? "Monthly" : "Weekly"}
            </TableCell>
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
