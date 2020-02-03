import React from "react";
import { TableBody, TableCell, Checkbox, TableRow } from "@material-ui/core";

import { getRandomInt } from "utils/func";
import { StateContext } from "context/StateContext";
import { truncate } from "utils/func";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

const PendingTableBody = ({ data }) => {
  const { dispatch, setModalLoading } = React.useContext(StateContext);

  const randomStatus = () => {
    let arr = [
      { color: "#455F38", label: "Sent" },
      { color: "orange", label: "Reviewed" },
      { color: "#399E07", label: "Approved" }
    ];

    const value = arr[getRandomInt(2)];
    return <b style={{ color: value.color }}>{value.label}</b>;
  };

  const passAllData = item => {
    dispatch({
      type: "set-manage-modal",
      payload: { openManage: true }
    });
    setModalLoading(true);

    setTimeout(() => {
      dispatch({ type: "set-selected-data", payload: { selectedData: item } });
      setModalLoading(false);
    }, 500);
  };

  return (
    <TableBody>
      {console.log(data)}
      {data.map((item, i) => {
        let campaigns = item.campaigns.split(",");
        console.log(campaigns);
        return (
          <TableRow hover aria-checked={false} key={i}>
            <TableCell padding="checkbox">
              <Checkbox />
            </TableCell>
            <TableCell>{item.docNumber}</TableCell>
            <TableCell>{item.invoiceType}</TableCell>
            <TableCell>{item.company}</TableCell>
            <TableCell className="hover-details">
              <a href="#" style={{ color: "#444851" }}>
                {truncate(
                  item.campaigns,
                  8,
                  `, +${item.campaigns.split(",").length} more`
                )}
              </a>
            </TableCell>
            <TableCell>{item.startDate}</TableCell>
            <TableCell>{item.dueDate}</TableCell>
            <TableCell>{formatter.format(item.total)}</TableCell>
            <TableCell>{randomStatus()}</TableCell>
            <TableCell
              onClick={() => {
                passAllData(item);
              }}
            >
              <u style={{ cursor: "pointer", fontSize: 14 }}>
                <b>Manage</b>
              </u>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};
export default PendingTableBody;
