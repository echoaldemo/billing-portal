import React, { useState, useContext } from "react";
import { RowHeader, Row, TableLoader, EmptyTable } from "common-components";
import {
  Checkbox as TempCb,
  MenuItem,
  Collapse,
  InputAdornment
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import ExpandButton from "../manual/ExpandButtton";
import InputField from "../components/CustomInput";
import RowForm from "./RowForm";
import { CenterCont } from "./styles";
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
    state,
    getTotal,
    getTaxableSubtotal,
    getTax,
    getTaxStatus,
    getAddFees,
    formState,
    setFormState,
    addFee,
    handleAddFees,
    mockTaxation,
    getBalance,
    selectedCampaign
  } = useContext(AutomaticInvoiceContext);
  const [rowCollapse, setRowCollapse] = useState([0]);
  const [additionalCollapse, setAdditionalCollapse] = useState(false);
  const getAmount = label => {
    const { qty, rate } = addFee[label];
    let content, merchantTotal;
    if (label === "merchant" && rate) {
      merchantTotal =
        Math.round((parseFloat(rate) / 100) * getTotal() * 100) / 100;
      content = (
        <div style={{ textAlign: "right", width: "100%" }}>
          <b>{formatter.format(merchantTotal)}</b>
        </div>
      );
    } else if (qty && rate)
      content = (
        <div style={{ textAlign: "right", width: "100%" }}>
          <b>{formatter.format(parseFloat(qty) * parseFloat(rate))}</b>
        </div>
      );
    else content = "";
    return content;
  };
  const getTotalAdd = () => {
    const total = getAddFees();
    if (total)
      return (
        <div style={{ textAlign: "right", width: "100%" }}>
          <b>{formatter.format(total)}</b>
        </div>
      );
    else return "";
  };
  const getServices = () => {
    const { litigator, merchant } = addFee;
    let label = [];
    if (merchant.rate) label.push("Merchant Fees");
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
      label: "",
      size: 2
    },
    {
      label: (
        <InputField
          name="merchant"
          onChange={e => handleAddFees(e, "rate")}
          value={addFee.merchant.rate}
          inputProps={{
            style: { textAlign: "right" }
          }}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>
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
          disabled={!selectedCampaign.length ? true : false}
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
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: "-2px"
          }}
        >
          <span style={{ fontSize: 12 }}>SUBTOTAL</span>
          <span>{formatter.format(getAddFees())}</span>
        </div>
      ),
      size: 1
    }
  ];
  const TaxMenu = () => {
    return (
      <CenterCont>
        <InputField
          select
          disabled={getTaxStatus() ? false : true}
          style={{ padding: 0, width: 150 }}
          value={formState.taxation}
          onChange={e =>
            setFormState({ ...formState, taxation: e.target.value })
          }
        >
          {mockTaxation.map((item, i) => (
            <MenuItem value={item.percentage} key={i}>
              {item.name} ({item.percentage}%)
            </MenuItem>
          ))}
        </InputField>
      </CenterCont>
    );
  };
  const totalRow = [
    { label: " ", size: 7 },
    {
      label: <CenterCont>TAXABLE SUBTOTAL</CenterCont>,
      size: 2
    },
    {
      label: (
        <CenterCont>
          <b> {formatter.format(getTaxableSubtotal())}</b>
        </CenterCont>
      ),
      size: 1
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <span>TOTAL</span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 20
            }}
          >
            {formatter.format(getTotal() + getAddFees())}
          </span>
        </div>
      ),
      size: 2
    }
  ];
  const serviceSubtotal = [
    { label: " ", size: 9 },
    {
      label: <CenterCont>SERVICE SUBTOTAL</CenterCont>,
      size: 2
    },
    {
      label: (
        <CenterCont>
          <b>{formatter.format(getTotal())}</b>
        </CenterCont>
      ),
      size: 1
    }
  ];
  const taxRow = [
    { label: " ", size: 3 },
    { label: " ", size: 3 },
    { label: <TaxMenu />, size: 3 },

    {
      label: (
        <CenterCont>
          <b>{getTax() ? formatter.format(getTax()) : " "}</b>
        </CenterCont>
      ),
      size: 1
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <span>BALANCE DUE</span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 20
            }}
          >
            {formatter.format(getBalance())}
          </span>
        </div>
      ),
      size: 2
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
            maxHeight: 450,
            overflow: "auto"
          }}
        >
          {state.formLoading ? (
            <TableLoader style={{ height: 450 }} />
          ) : !campaignDetails.length ? (
            <EmptyTable style={{ height: 450 }} />
          ) : (
            campaignDetails.map((el, i) => {
              return (
                <RowForm
                  campDetail={el}
                  rowCollapse={rowCollapse}
                  setRowCollapse={setRowCollapse}
                  key={i}
                  index={i}
                />
              );
            })
          )}
        </div>
      </div>
      <div
        style={{ border: "solid 1px #F1F1F1", borderTop: 0, borderBottom: 0 }}
      >
        <Row rowData={serviceSubtotal} />
      </div>
      <Row
        rowData={
          additionalCollapse ? additionalFeesCollapse : additionalFeesRow
        }
        style={{ border: "solid 1px #F1F1F1" }}
      />
      <Collapse in={additionalCollapse || selectedCampaign.length}>
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
    </>
  );
};
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
export default CampaignBilling;
