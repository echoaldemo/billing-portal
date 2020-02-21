/* eslint-disable */
import React, { useState, useEffect } from "react";
import RowForm from "./RowForm";
import { Row, TimeInput, CustomCheckbox, RowHeader } from "common-components";
import InputField from "../components/CustomInput";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import { Checkbox, MenuItem, Collapse } from "@material-ui/core";
import ExpandButton from "./ExpandButtton";
import { computeInt, formatter } from "utils/func";

const rowHeaderData = [
  { label: "Campaign", size: 2 },
  { label: "Tax", size: 1 },
  { label: "Services", size: 2 },
  { label: "Quantity", size: 2, style: { textAlign: "right" } },
  { label: "Rate", size: 2, style: { textAlign: "right" } },
  { label: "Total Amount", size: 2, style: { textAlign: "right" } },
  { label: " ", size: 1 }
];

const CampaignBilling = ({ campaignDetails }) => {
  const [rowCollapse, setRowCollapse] = useState([0]);
  const [additionalCollapse, setAdditionalCollapse] = useState(false);
  const {
    setBillingFormState,
    getBalance,
    additionalFee,
    setAdditionalFee,
    tax,
    allChecked,
    taxChecked,
    setTaxChecked,
    computeItemService,
    getTaxableServices,
    getTaxableAdditionalFees
  } = React.useContext(ManualInvoiceContext);
  useEffect(() => {
    console.log("campaignDetails", campaignDetails);
    setBillingFormState(campaignDetails);
  }, [campaignDetails]);

  const isTaxed = tax === 0;
  const renderLessAdditional = () => {
    let additionalServices = [];
    Object.keys(additionalFee).map((item) => {
      if (additionalFee[item]) {
        item === "merchantQty" && additionalServices.push("Merchant Fees");
        item === "scrubbingQty" &&
          additionalServices.push("Litigator Scrubbing");
      }
    });
    return (
      <div>
        {additionalServices.length > 0 ? (
          additionalServices.join(", ")
        ) : (
          <i>Field not set</i>
        )}
      </div>
    );
  };
  const CustomChange = (e, type) => {
    setAdditionalFee({
      ...additionalFee,
      [type]: e.target.checked
    });

    !allChecked() ? setTaxChecked(false) : setTaxChecked(true);
  };

  const additionalFeeInitial = [
    {
      label: <b>Additional Fees</b>,
      size: 3,
      bold: true
    },

    { label: renderLessAdditional(), size: 2 },
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
  const additionalFeesRow1 = [
    {
      label: <b>Additional Fees</b>,
      size: 2,
      bold: true
    },
    {
      label: (
        <CustomCheckbox
          disabled={isTaxed}
          checked={isTaxed ? false : additionalFee.merchantTax}
          onChange={(e) => {
            CustomChange(e, "merchantTax");
          }}
        />
      ),
      size: 1
    },

    { label: "Merchant Fees", size: 2 },
    {
      label: (
        <InputField
          placeholder="Merchant quantity"
          value={additionalFee.merchantQty}
          onChange={(e) => {
            setAdditionalFee({ ...additionalFee, merchantQty: e.target.value });
          }}
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          placeholder="Rate value"
          value={additionalFee.merchantRate}
          onChange={(e) => {
            setAdditionalFee({
              ...additionalFee,
              merchantRate: e.target.value
            });
          }}
        />
      ),
      size: 2
    },
    {
      label: (
        <b>
          {formatter.format(
            parseFloat(
              computeInt(additionalFee.merchantQty, additionalFee.merchantRate)
            )
          )}
        </b>
      ),
      size: 2,
      style: { textAlign: "right" }
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
  const additionalFeesRow2 = [
    {
      label: " ",
      size: 2,
      bold: true
    },
    {
      label: (
        <CustomCheckbox
          disabled={isTaxed}
          checked={isTaxed ? false : additionalFee.scrubbingTax}
          onChange={(e) => {
            CustomChange(e, "scrubbingTax");
          }}
        />
      ),
      size: 1
    },
    { label: "Litigator Scrubbing", size: 2 },
    {
      label: (
        <InputField
          placeholder="Scrubbing quantity"
          value={additionalFee.scrubbingQty}
          onChange={(e) => {
            setAdditionalFee({
              ...additionalFee,
              scrubbingQty: e.target.value
            });
          }}
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          placeholder="Scrubbing rate value"
          value={additionalFee.scrubbingRate}
          onChange={(e) => {
            setAdditionalFee({
              ...additionalFee,
              scrubbingRate: e.target.value
            });
          }}
        />
      ),
      size: 2
    },
    {
      label: (
        <b>
          {formatter.format(
            parseFloat(
              computeInt(
                additionalFee.scrubbingQty,
                additionalFee.scrubbingRate
              )
            )
          )}
        </b>
      ),
      size: 2,
      style: { textAlign: "right" }
    },
    {
      label: " ",
      size: 1
    }
  ];

  const computeTotal = () => {
    let total = 0;
    let balanceTotal = parseFloat(getBalance());

    let totalAdditionalFee =
      computeItemService(
        additionalFee.merchantQty,
        additionalFee.merchantRate,
        additionalFee.merchantTax
      ) +
      computeItemService(
        additionalFee.scrubbingQty,
        additionalFee.scrubbingRate,
        additionalFee.scrubbingTax
      );
    total = parseFloat(balanceTotal) + parseFloat(totalAdditionalFee);
    return parseFloat(total);
  };
  const taxableTotal = () => {
    return getTaxableAdditionalFees() + getTaxableServices();
  };

  const totalRow = [
    { label: " ", size: 7 },
    { label: "TAXABLE SUBTOTAL", size: 2 },
    {
      label: (
        <div style={{ textAlign: "right" }}>
          <b> {formatter.format(taxableTotal())}</b>
        </div>
      ),
      size: 1
    },
    {
      label: <div style={{ textAlign: "right" }}>TOTAL</div>,
      size: 1
    },
    {
      label: (
        <div style={{ textAlign: "right" }}>
          <b> {formatter.format(computeTotal())}</b>
        </div>
      ),
      size: 1
    }
  ];

  const computeTax = () => {
    let taxed = 0;
    if (taxChecked) {
      let totalBills = parseFloat(taxableTotal());
      let totalTaxation = parseFloat(tax / 100);

      taxed = totalBills * totalTaxation;
    }
    return parseFloat(taxed);
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
          {formatter.format(computeTax())}
        </div>
      ),
      size: 1
    }
  ];

  const computeBalanceDue = () => {
    let newBalanceDue = 0;

    newBalanceDue = parseFloat(computeTax()) + parseFloat(computeTotal());

    return newBalanceDue;
  };
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
          <b>{formatter.format(computeBalanceDue())}</b>
        </div>
      ),
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
        <div className="billing-camp-rows">
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
            additionalCollapse ? additionalFeesRow1 : additionalFeeInitial
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
  const {
    tax,
    setTax,
    mockTaxation,
    taxChecked,
    setTaxChecked
  } = React.useContext(ManualInvoiceContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Checkbox
        checked={taxChecked}
        style={{ padding: 0 }}
        onChange={(e) => {
          if (!e.target.checked) {
            setTax(0);
          }
          setTaxChecked(e.target.checked);
        }}
      />
      &nbsp;
      <InputField
        select
        placeholder="Select Taxation"
        style={{ padding: 0, width: 150 }}
        value={taxChecked ? tax : 0}
        disabled={!taxChecked}
        onChange={(e) => {
          console.log("object", tax);
          setTax(e.target.value);
        }}
      >
        <MenuItem value={0}>Select Taxation</MenuItem>
        {mockTaxation.map((item, i) => {
          return (
            <MenuItem key={i} value={item.percentage}>
              {item.name} ({item.percentage}%)
            </MenuItem>
          );
        })}
      </InputField>
    </div>
  );
};

export default CampaignBilling;
