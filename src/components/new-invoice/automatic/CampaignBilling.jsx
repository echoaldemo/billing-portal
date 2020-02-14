import React, { useState, useContext } from "react";
import { RowHeader, Row } from "common-components";
import { Checkbox, MenuItem, Collapse } from "@material-ui/core";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import ExpandButton from "../manual/ExpandButtton";
import InputField from "../components/CustomInput";
import RowForm from "./RowForm";

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
    addFee,
    handleAddFees,
    mockTaxation
  } = useContext(AutomaticInvoiceContext);
  const [rowCollapse, setRowCollapse] = useState([0]);
  const [additionalCollapse, setAdditionalCollapse] = useState(false);
  const [tax, setTax] = useState(false);
  const handleTax = event => {
    if (event.target.checked === false) {
      setFormState({ ...formState, taxation: " " });
    }
    setTax(event.target.checked);
  };
  const getAmount = label => {
    const { qty, rate } = addFee[label];
    let content;
    if (qty && rate)
      content = (
        <div style={{ textAlign: "right", width: "100%" }}>
          <b>{formatter.format(parseFloat(qty) + parseFloat(rate))}</b>
        </div>
      );
    else content = "";
    return content;
  };
  const additionalFeesCollapse = [
    {
      label: <b>Additional Fees</b>,
      size: 3,
      bold: true
    },
    { label: "Merchant Fees", size: 2 },
    {
      label: (
        <InputField
          value={addFee.merchant.qty}
          name="merchant"
          onChange={e => handleAddFees(e, "qty")}
          placeholder="Merchant quantity"
          inputProps={{
            style: { textAlign: "right" }
          }}
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          name="merchant"
          onChange={e => handleAddFees(e, "rate")}
          value={addFee.merchant.rate}
          placeholder="Rate value"
          inputProps={{
            style: { textAlign: "right" }
          }}
        />
      ),
      size: 2
    },
    {
      label: getAmount("merchant"),
      size: 2
    },
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
    {
      label: (
        <InputField
          name="litigator"
          onChange={e => handleAddFees(e, "qty")}
          value={addFee.litigator.qty}
          placeholder="Scrubbing quantity"
          inputProps={{
            style: { textAlign: "right" }
          }}
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          name="litigator"
          onChange={e => handleAddFees(e, "rate")}
          value={addFee.litigator.rate}
          placeholder="Scrubbing rate value"
          inputProps={{
            style: { textAlign: "right" }
          }}
        />
      ),
      size: 2
    },
    {
      label: getAmount("litigator"),
      size: 2
    },

    {
      label: " ",
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
        <RowHeader
          rowHeaderData={rowHeaderData}
          style={{ backgroundColor: "#dce9f1", color: "#4C7F9E" }}
        />
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
      </div>
      <br />
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
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
export default CampaignBilling;
