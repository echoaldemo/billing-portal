import React, { useState } from "react";
import { RowHeader, Row, InputField } from "common-components";
import RowForm from "./RowForm";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { IconButton, Checkbox, MenuItem } from "@material-ui/core";

const rowHeaderData = [
  { label: "Campaign", size: 3 },
  { label: "Services", size: 2 },
  { label: "Quantity", size: 2, align_right: true },
  { label: "Rate", size: 2, align_right: true },
  { label: "Amount", size: 2, align_right: true },
  { label: " ", size: 1 }
];

const CampaignBilling = ({ campaignDetails }) => {
  const [rowCollapse, setRowCollapse] = useState([0]);

  return (
    <>
      <div
        style={{
          border: "solid 1px #F1F1F1",
          BorderBottom: 0
        }}
      >
        <RowHeader rowHeaderData={rowHeaderData} />
        <div
          style={{
            maxHeight: 442,
            overflow: "auto"
          }}
        >
          {campaignDetails.map((el, i) => {
            return (
              <RowForm
                campDetail={el}
                rowCollapse={rowCollapse}
                setRowCollapse={setRowCollapse}
                key={i}
                index={i}
              />
            );
          })}
        </div>

        <Row
          rowData={additionalFeesRow}
          style={{
            borderTop: "solid 1px #F1F1F1",
            borderBottom: "solid 1px #F1F1F1"
          }}
        />
      </div>

      <div style={{ border: "solid 1px #F1F1F1", borderTop: 0 }}>
        <Row rowData={totalRow} />
      </div>

      <div style={{ border: "solid 1px #F1F1F1", borderTop: 0 }}>
        <Row rowData={taxRow} />
      </div>

      <div style={{ border: "solid 1px #F1F1F1", borderTop: 0 }}>
        <Row rowData={balanceRow} />
      </div>
    </>
  );
};

const additionalFeesRow = [
  {
    label: <b>Additional Fees</b>,
    size: 3,
    bold: true
  },
  { label: " ", size: 2 },
  { label: " ", size: 2 },
  { label: " ", size: 2 },
  { label: " ", size: 2 },
  {
    label: (
      <div style={{ textAlign: "right" }}>
        <IconButton style={{ padding: 5 }}>
          <ExpandMore />
        </IconButton>
      </div>
    ),
    size: 1
  }
];

const TaxMenu = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Checkbox checked={false} style={{ padding: 0 }} />
      &nbsp;
      <InputField
        select
        placeholder="Select Taxation"
        style={{ padding: 0, width: 150 }}
        value=" "
        disabled
      >
        <MenuItem value=" " disabled>
          Select Taxation
        </MenuItem>
      </InputField>
    </div>
  );
};

const taxRow = [
  { label: " ", size: 3 },
  { label: " ", size: 3 },
  {
    label: "",
    size: 2
  },
  { label: <TaxMenu />, size: 3 },

  {
    label: (
      <div style={{ textAlign: "right" }}>
        <b>$0.00</b>
      </div>
    ),
    size: 1
  }
];

const totalRow = [
  { label: " ", size: 3 },
  { label: " ", size: 3 },
  {
    label: "",
    size: 2
  },
  {
    label: <div style={{ textAlign: "right" }}>TOTAL</div>,
    size: 3
  },
  {
    label: (
      <div style={{ textAlign: "right" }}>
        <b>$100</b>
      </div>
    ),
    size: 1
  }
];

const balanceRow = [
  { label: " ", size: 3 },
  { label: " ", size: 3 },
  {
    label: "",
    size: 2
  },
  {
    label: (
      <div style={{ textAlign: "right" }}>
        <b>BALANCE DUE</b>
      </div>
    ),
    size: 3
  },
  {
    label: (
      <div style={{ textAlign: "right" }}>
        <b>$100</b>
      </div>
    ),
    size: 1
  }
];

export default CampaignBilling;
