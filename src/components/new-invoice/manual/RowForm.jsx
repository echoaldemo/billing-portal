import React, { useContext } from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse, IconButton } from "@material-ui/core";
import { InputField, Row } from "common-components";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";

const RowForm = ({ campDetail, rowCollapse, setRowCollapse, index }) => {
  const { billingFormState, setBillingFormState } = useContext(
    ManualInvoiceContext
  );
  const removeElement = () => {
    const newEl = rowCollapse.filter(item => item !== index);
    return newEl;
  };

  const compute = (x, y) => {
    if (x * y) return formatter.format(x * y);
    else return "";
  };

  const campaignTotal = () => {
    let campTotal = 0;
    let billableHrs = campDetail.billableHrsQty * campDetail.billableHrsRate;
    let did = campDetail.didQty * campDetail.didRate;
    let performance = campDetail.performanceQty * campDetail.performanceRate;

    campTotal = billableHrs + did + performance;

    return campTotal ? formatter.format(campTotal) : "";
  };

  const ShowExpand = () => {
    return (
      <div style={{ textAlign: "right" }}>
        {!rowCollapse.includes(index) ? (
          <IconButton
            style={{ padding: 5 }}
            onClick={() => {
              setRowCollapse([...rowCollapse, index]);
            }}
          >
            <ExpandMore />
          </IconButton>
        ) : (
          <IconButton
            style={{ padding: 5 }}
            onClick={() => {
              setRowCollapse(removeElement());
            }}
          >
            <ExpandLess />
          </IconButton>
        )}
      </div>
    );
  };

  const handleTextField = (e, type) => {
    const newVal = billingFormState.map((item, i) => {
      if (i === index) {
        item[type] = e.target.value;
      }
      return item;
    });
    setBillingFormState(newVal);
  };

  const renderLessServices = () => {
    let services = [];
    Object.keys(campDetail).map(item => {
      if (campDetail[item]) {
        item === "billableHrsQty" && services.push("Billable Hours");
        item === "didQty" && services.push("DID Billing");
        item === "performanceQty" && services.push("Performance");
      }
    });

    return (
      <div>
        {services.length > 0 ? services.join(", ") : <i>Field not set</i>}
      </div>
    );
  };

  const rowData1 = [
    {
      label: <b>{campDetail.name}</b>,
      size: 3,
      bold: true
    },
    { label: "Billable Hours", size: 2 },
    {
      label: (
        <InputField
          value={campDetail.billableHrsQty}
          onChange={e => {
            handleTextField(e, "billableHrsQty");
          }}
          placeholder="Number of hours"
          type="number"
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          value={campDetail.billableHrsRate}
          onChange={e => {
            handleTextField(e, "billableHrsRate");
          }}
          placeholder="Rate value"
          type="number"
        />
      ),
      size: 2
    },
    {
      label: (
        <b> {compute(campDetail.billableHrsQty, campDetail.billableHrsRate)}</b>
      ),
      size: 2
    },
    { label: <ShowExpand />, size: 1 }
  ];

  const rowData1Collapse = [
    {
      label: <b>{campDetail.name}</b>,
      size: 3,
      bold: true
    },
    { label: <span>{renderLessServices()}</span>, size: 4 },
    { label: " ", size: 2 },
    { label: <b>{campaignTotal()}</b>, size: 2 },
    { label: <ShowExpand />, size: 1 }
  ];

  const rowData2 = [
    {
      label: " ",
      size: 3,
      bold: true
    },
    { label: "DID Billing", size: 2 },
    {
      label: (
        <InputField
          value={campDetail.didQty}
          onChange={e => handleTextField(e, "didQty")}
          placeholder="DID Quantity"
          type="number"
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          value={campDetail.didRate}
          onChange={e => handleTextField(e, "didRate")}
          placeholder="DID rate"
          type="number"
        />
      ),
      size: 2
    },
    {
      label: <b>{compute(campDetail.didQty, campDetail.didRate)}</b>,
      size: 2
    },
    { label: " ", size: 1 }
  ];
  const rowData3 = [
    {
      label: " ",
      size: 3
    },
    { label: "Performance", size: 2 },
    {
      label: (
        <InputField
          value={campDetail.performanceQty}
          onChange={e => handleTextField(e, "performanceQty")}
          placeholder="Performance quantity"
          type="number"
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          value={campDetail.performanceRate}
          onChange={e => handleTextField(e, "performanceRate")}
          placeholder="Performance rate"
          type="number"
        />
      ),
      size: 2
    },
    {
      label: (
        <b>{compute(campDetail.performanceQty, campDetail.performanceRate)}</b>
      ),
      size: 2
    },
    { label: " ", size: 1 }
  ];
  return (
    <div
      style={{
        borderBottom: "solid 1px #F1F1F1"
      }}
    >
      <Row
        rowData={rowCollapse.includes(index) ? rowData1 : rowData1Collapse}
      />

      <Collapse in={rowCollapse.includes(index)}>
        <Row rowData={rowData2} />
        <Row rowData={rowData3} />
      </Collapse>
    </div>
  );
};

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

export default RowForm;
