import React, { useState, useContext } from "react";
import { RowHeader, Row } from "common-components";
import { Checkbox as TempCb, MenuItem, Collapse } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import ExpandButton from "../manual/ExpandButtton";
import InputField from "../components/CustomInput";
import RowForm from "./RowForm";
const Checkbox = styled(TempCb)({
  padding: 0
});
const rowHeaderData = [
  { label: "Campaign", size: 2 },
  { label: "Tax", size: 1 },
  { label: "Services", size: 2 },
  { label: "Quantity", size: 2, align_right: true },
  { label: "Rate", size: 2, align_right: true },
  { label: "Amount", size: 2, align_right: true },
  { label: " ", size: 1 }
];
const CampaignBilling = ({ campaignDetails }) => {
  const {
    getTotal,
    getTaxableSubtotal,
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
  const getAmount = label => {
    const { qty, rate } = addFee[label];
    let content;
    if (qty && rate)
      content = (
        <div style={{ textAlign: "right", width: "100%" }}>
          <b>{formatter.format(parseFloat(qty) * parseFloat(rate))}</b>
        </div>
      );
    else content = "";
    return content;
  };
  const getTotalAdd = () => {
    const { litigator, merchant } = addFee;
    let content;
    const total = merchant.qty * merchant.rate + litigator.qty * litigator.rate;
    if (total)
      content = (
        <div style={{ textAlign: "right", width: "100%" }}>
          <b>{formatter.format(total)}</b>
        </div>
      );
    else content = "";
    return content;
  };
  const getServices = () => {
    const { litigator, merchant } = addFee;
    let label = [];
    if (merchant.qty * merchant.rate) label.push("Merchant Fees");
    if (litigator.qty * litigator.rate) label.push("Litigator Scrubbing");

    if (!label.length) return <i>None</i>;
    else if (label.length === 1) return label[0];
    else return label.join(", ");
  };
  const additionalFeesCollapse = [
    {
      label: <b>Additional Fees</b>,
      size: 2,
      bold: true
    },
    {
      label: (
        <Checkbox
          name="merchant"
          onChange={e => handleAddFees(e, "tax")}
          checked={addFee.merchant.tax}
        />
      ),
      size: 1
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
    { label: getServices(), size: 2 },
    { label: " ", size: 2 },
    { label: " ", size: 2 },
    { label: getTotalAdd(), size: 2 },
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
      size: 2,
      bold: true
    },
    {
      label: (
        <Checkbox
          name="litigator"
          onChange={e => handleAddFees(e, "tax")}
          checked={addFee.litigator.tax}
        />
      ),
      size: 1
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
        <InputField
          select
          variant="outlined"
          label="Taxable"
          disabled={getTaxableSubtotal() ? false : true}
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

  const totalTaxableRow = [
    { label: " ", size: 3 },
    { label: " ", size: 3 },
    {
      label: "",
      size: 2
    },
    {
      label: <div style={{ textAlign: "right" }}>Taxable subtotal</div>,
      size: 3
    },
    {
      label: (
        <div style={{ textAlign: "right" }}>
          <b>{formatter.format(getTaxableSubtotal())}</b>
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
        <Row rowData={totalTaxableRow} />
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
