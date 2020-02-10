import React from "react";
import { TableBody, TableCell, Checkbox, TableRow } from "@material-ui/core";
import MenuButton from "./MenuButton";
import moment from "moment";
import { StateContext } from "context/StateContext";
import StatusButton from "./StatusButton";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

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
            <TableCell>
              <StatusButton item={item} />
            </TableCell>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.invoiceType}</TableCell>
            <TableCell>
              {item.billingType === "1" ? "Monthly" : "Weekly"}
            </TableCell>
            <TableCell>{item.company ? item.company.name : "--"}</TableCell>
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
