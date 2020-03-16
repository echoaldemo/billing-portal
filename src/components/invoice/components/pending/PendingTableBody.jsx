import React from "react";
import {
  TableBody,
  TableCell,
  Checkbox,
  TableRow,
  Tooltip
} from "@material-ui/core";
import EllipsisText from "react-ellipsis-text";
import MenuButton from "./MenuButton";
import moment from "moment";
import { StateContext } from "context/StateContext";
import StatusButton from "./StatusButton";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useState } from "react";

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
  const [copy, setCopy] = useState(false);

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
            <TableCell>
              <CopyToClipboard
                text={item.id}
                onCopy={() => {
                  setCopy(true);
                }}
                onPointerLeave={() => {
                  setCopy(false);
                }}
              >
                <Tooltip
                  title={copy ? "UUID copied!" : "Copy UUID"}
                  placement="top"
                >
                  <FileCopyOutlinedIcon
                    style={{ fontSize: 15, cursor: "pointer" }}
                  />
                </Tooltip>
              </CopyToClipboard>
              &nbsp;&nbsp;
              <Tooltip title={item.id} placement="top">
                <EllipsisText text={item.id} length={15} />
              </Tooltip>
            </TableCell>
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
