import React, { useState, useEffect } from "react";
import RowForm from "./RowForm";
import { RowHeader, Row, InputField } from "common-components";

import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { IconButton, Checkbox, MenuItem } from "@material-ui/core";
const rowHeaderData = [
  { label: "Campaign", size: 3 },
  { label: "Services", size: 2 },
  { label: "Quantity", size: 2 },
  { label: "Rate", size: 2 },
  { label: "Total Amount", size: 2 },
  { label: " ", size: 1 }
];
const CampaignBilling = ({ campaignDetails }) => {
  const [rowCollapse, setRowCollapse] = useState([0]);
  const { setBillingFormState } = React.useContext(ManualInvoiceContext);
  useEffect(() => {
    setBillingFormState(campaignDetails);
  }, [campaignDetails]);
  return (
    <React.Fragment>
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
        <Row rowData={taxRow} />
      </div>
      <div style={{ border: "solid 1px #F1F1F1", borderTop: 0 }}>
        <Row rowData={totalRow} />
      </div>
    </React.Fragment>
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
        alignItems: "center"
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
  {
    label: "Taxable",
    size: 3,
    bold: true
  },
  { label: <TaxMenu />, size: 2 },
  { label: " ", size: 2 },
  { label: " ", size: 2 },
  { label: <b>$0.00</b>, size: 2 },
  { label: " ", size: 1 }
];

const totalRow = [
  {
    label: <b>Total</b>,
    size: 3,
    bold: true
  },
  { label: <b>15 Total Services</b>, size: 2 },
  { label: " ", size: 2 },
  { label: " ", size: 2 },
  { label: <b>$32,234.00</b>, size: 2 },
  { label: " ", size: 1 }
];
export default CampaignBilling;
