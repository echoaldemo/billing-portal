import React, { useState, useEffect } from "react";
import RowForm from "./RowForm";
import { RowHeader, Row, InputField } from "common-components";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import { Checkbox, MenuItem, Collapse } from "@material-ui/core";
import ExpandButton from "./ExpandButtton";

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
  const [additionalCollapse, setAdditionalCollapse] = useState(false);
  const { setBillingFormState, selectedCampaign } = React.useContext(
    ManualInvoiceContext
  );
  useEffect(() => {
    setBillingFormState(campaignDetails);
  }, [campaignDetails]);

  const additionalFeesCollapse = [
    {
      label: <b>Additional Fees</b>,
      size: 3,
      bold: true
    },
    { label: "Merchant Fees", size: 2 },
    { label: <InputField placeholder="Merchant quantity" />, size: 2 },
    { label: <InputField placeholder="Rate value" />, size: 2 },
    { label: " ", size: 2 },
    {
      label: (
        <ExpandButton
          collapse={additionalCollapse}
          setCollapse={setAdditionalCollapse}
        />
      ),
      size: 1
    }
  ];

  const additionalFeesRow = [
    {
      label: <b>Additional Fees</b>,
      size: 3,
      bold: true
    },
    { label: <i>None</i>, size: 2 },
    { label: " ", size: 2 },
    { label: " ", size: 2 },
    { label: " ", size: 2 },
    {
      label: (
        <ExpandButton
          collapse={additionalCollapse}
          setCollapse={setAdditionalCollapse}
        />
      ),
      size: 1
    }
  ];

  const additionalFeesRow2 = [
    {
      label: " ",
      size: 3,
      bold: true
    },
    { label: "Litigator Scrubbing", size: 2 },
    { label: <InputField placeholder="Scrubbing quantity" />, size: 2 },
    { label: <InputField placeholder="Scrubbing rate value" />, size: 2 },
    { label: <b>$0.00</b>, size: 2 },
    {
      label: " ",
      size: 1
    }
  ];
  return (
    <React.Fragment>
      <div
        style={{
          border: "solid 1px #F1F1F1",
          BorderBottom: 0
        }}
      >
        <RowHeader
          rowHeaderData={rowHeaderData}
          style={{ backgroundColor: "#dce9f1", color: "#4C7F9E" }}
        />
        <div
          style={{
            maxHeight: 318,
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
      </div>
      <br />
      <div style={{ border: "solid 1px #F1F1F1", borderTop: 0 }}>
        <Row
          rowData={
            additionalCollapse ? additionalFeesCollapse : additionalFeesRow
          }
          style={{ border: "solid 1px #F1F1F1" }}
        />
        <Collapse in={additionalCollapse}>
          <Row
            rowData={additionalFeesRow2}
            style={{ border: "solid 1px #F1F1F1", borderTop: 0 }}
          />
        </Collapse>
        <Row rowData={totalRow} />
        <Row rowData={taxRow} />
        <Row rowData={balanceRow} />
      </div>
    </React.Fragment>
  );
};

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
export default CampaignBilling;
