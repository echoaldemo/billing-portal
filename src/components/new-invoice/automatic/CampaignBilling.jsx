import React, { useState, useContext } from "react";
import { RowHeader, Row, InputField } from "common-components";
import RowForm from "./RowForm";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { IconButton, Checkbox, MenuItem } from "@material-ui/core";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
const rowHeaderData = [
  { label: "Campaign", size: 3 },
  { label: "Services", size: 2 },
  { label: "Quantity", size: 2, align_right: true },
  { label: "Rate", size: 2, align_right: true },
  { label: "Amount", size: 2, align_right: true },
  { label: " ", size: 1 }
];
const CampaignBilling = ({ campaignDetails }) => {
  const {
    getTotal,
    getTax,
    getBalance,
    formState,
    setFormState,
    mockTaxation
  } = useContext(AutomaticInvoiceContext);
  const [rowCollapse, setRowCollapse] = useState([0]);
  const [tax, setTax] = useState(false);
  const handleTax = event => {
    if (event.target.checked === false) {
      setFormState({ ...formState, taxation: " " });
    }
    setTax(event.target.checked);
  };
  const TaxMenu = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <Checkbox
          checked={tax}
          disableRipple
          disableTouchRipple
          disableFocusRipple
          style={{ backgroundColor: "transparent" }}
          onChange={handleTax}
          value="secondary"
        />
        &nbsp;&nbsp;
        <InputField
          select
          variant="outlined"
          label="Taxable"
          disabled={!tax}
          style={{ padding: 0, width: 170 }}
          value={formState.taxation}
          onChange={e =>
            setFormState({ ...formState, taxation: e.target.value })
          }
        >
          <MenuItem value=" " disabled>
            Select Taxation
          </MenuItem>
          {mockTaxation.map(item => (
            <MenuItem value={item.percentage}>
              {item.name} ({item.percentage}%)
            </MenuItem>
          ))}
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
          <b>{getTax() ? formatter.format(getTax()) : " "}</b>
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
          <b>{formatter.format(getTotal())}</b>
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
          <b>{formatter.format(getBalance())}</b>
        </div>
      ),
      size: 1
    }
  ];
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
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
export default CampaignBilling;
