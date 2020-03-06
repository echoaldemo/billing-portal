import React, { useContext } from "react";
import { TrashBinContext } from "context/TrashBinContext";
import EllipsisText from "react-ellipsis-text";
import { Row, RowHeader } from "common-components";
import { formatter } from "utils/func";
import RestoreIcon from "@material-ui/icons/Restore";
import { IconButton, Tooltip } from "@material-ui/core";
import { StateContext } from "context/StateContext";
import { postLog } from "utils/time";

export default function TrashBinItems() {
  const {
    state: { data },
    updateTrashItem
  } = useContext(TrashBinContext);
  const { state: profile } = useContext(StateContext);
  return (
    <div>
      <RowHeader rowHeaderData={headerData} />
      {data.map((item, i) => {
        console.log(item);
        return (
          <Row
            style={{ borderBottom: "solid 1px #F1F1f1" }}
            key={i}
            rowData={[
              {
                size: 1,
                label: item.id
              },
              {
                size: 2,
                label: item.invoiceType,
                style: { textAlign: "right" }
              },
              {
                size: 2,
                label: item.billingType === 1 ? "Monthly" : "Weekly",
                style: { textAlign: "right" }
              },
              {
                size: 2,
                label: (
                  <Tooltip title={item.company.name}>
                    <EllipsisText text={item.company.name} length={10} />
                  </Tooltip>
                ),
                style: { textAlign: "right" }
              },
              {
                size: 2,
                label: item.startDate,
                style: { textAlign: "right" }
              },
              {
                size: 2,
                label: formatter.format(item.total),
                style: { textAlign: "right" }
              },
              {
                size: 1,
                label: (
                  <Tooltip title="Restore invoice">
                    <IconButton
                      style={{ padding: 5 }}
                      onClick={() => {
                        updateTrashItem(item.id);
                        postLog({
                          type: "restore-invoice",
                          description: `${profile.userProfile.name} restored invoice #${item.id}.`,
                          invoiceId: item.id
                        });
                      }}
                    >
                      <RestoreIcon />
                    </IconButton>
                  </Tooltip>
                ),
                style: { textAlign: "center" }
              }
            ]}
          />
        );
      })}
    </div>
  );
}

const headerData = [
  { size: 1, label: "Invoice" },
  { size: 2, label: "Invoice Type", style: { textAlign: "right" } },
  { size: 2, label: "Billing Type", style: { textAlign: "right" } },
  { size: 2, label: "Company", style: { textAlign: "right" } },
  { size: 2, label: "Date Created", style: { textAlign: "right" } },
  { size: 2, label: "Total", style: { textAlign: "right" } },
  { size: 1, label: " ", style: { textAlign: "center" } }
];
