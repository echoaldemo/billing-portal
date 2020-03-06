import React, { useContext, useState, useEffect } from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse, IconButton } from "@material-ui/core";
import { Row, TimeInput, CustomCheckbox as Checkbox } from "common-components";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import InputField from "../components/CustomInput";
import { compute, formatter } from "utils/func";

const RowForm = ({ campDetail, rowCollapse, setRowCollapse, index }) => {
  const [timeState, setTimeState] = useState({ hour: "", min: "" });
  useEffect(() => {
    if (campDetail.billableHrsQty) {
      convertHourMin(campDetail.billableHrsQty);
    }
  }, []); // eslint-disable-line
  const convertHourMin = value => {
    const hrs = parseInt(Number(value));
    const min = Math.round((Number(value) - hrs) * 60);
    setTimeState({
      ...timeState,
      hour: hrs,
      min
    });
  };
  const {
    billingFormState,
    setBillingFormState,
    tax,
    taxableTotal
  } = useContext(ManualInvoiceContext);
  let isTaxed = Boolean(tax === 0);
  useEffect(() => {
    // !allChecked() ? setTaxChecked(false) : setTaxChecked(true);
  }, [tax]);

  const removeElement = () => {
    const newEl = rowCollapse.filter(item => item !== index);
    return newEl;
  };

  const hourMinToDec = (value, label) => {
    if ((parseFloat(value) <= 59 && parseFloat(value) > 0) || value === "") {
      setTimeState({ ...timeState, [label]: value });
      let temp;
      if (value === "") {
        value = 0;
      }
      if (label === "hour") temp = `${value}:${timeState.min}`;
      else temp = `${timeState.hour}:${value}`;
      const arr = temp.split(":");

      const dec = parseInt((arr[1] / 6) * 10, 10);
      const final =
        parseFloat(parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec) ||
        0;
      const newVal = billingFormState.map((item, i) => {
        if (i === index) {
          item["billableHrsQty"] = final;
        }
        return item;
      });
      setBillingFormState(newVal);
    }
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
        item[type] = e.target.value ? e.target.value : e.target.checked;
      }
      return item;
    });
    setBillingFormState(newVal);
  };

  const handleCheckbox = (e, type) => {
    handleTextField(e, type);
    if (!taxableTotal) {
    }
  };
  const renderLessServices = () => {
    let services = [];
    Object.keys(campDetail).map(item => {
      if (campDetail[item]) {
        item === "billableHrsQty" && services.push("Billable Hours");
        item === "didQty" && services.push("DID Billing");
        item === "performanceQty" && services.push("Performance");
      }
      return null;
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
      size: 2,
      bold: true
    },
    {
      label: (
        <Checkbox
          checked={isTaxed ? false : campDetail.billableHrsTaxed}
          onChange={e => {
            handleCheckbox(e, "billableHrsTaxed");
          }}
          disabled={isTaxed}
        />
      ),
      size: 1
    },
    { label: "Billable Hours", size: 2 },
    {
      label: <TimeInput handleChange={hourMinToDec} state={timeState} />,
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
        <b>{compute(campDetail.billableHrsQty, campDetail.billableHrsRate)}</b>
      ),
      size: 2,
      style: { textAlign: "right" }
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
    { label: <b>{campaignTotal()}</b>, size: 2, style: { textAlign: "right" } },
    { label: <ShowExpand />, size: 1 }
  ];

  const rowData2 = [
    {
      label: " ",
      size: 2,
      bold: true
    },
    {
      label: (
        <Checkbox
          checked={isTaxed ? false : campDetail.didTaxed}
          onChange={e => {
            handleCheckbox(e, "didTaxed");
          }}
          disabled={isTaxed}
        />
      ),
      size: 1
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
      size: 2,
      style: { textAlign: "right" }
    },
    { label: " ", size: 1 }
  ];

  const getSubTotal = () => {
    const a = campDetail.billableHrsQty * campDetail.billableHrsRate;
    const b = campDetail.didQty * campDetail.didRate;
    const c = campDetail.performanceQty * campDetail.performanceRate;
    return formatter.format(parseFloat(a + b + c));
  };
  const rowData3 = [
    {
      label: " ",
      size: 2
    },
    {
      label: (
        <Checkbox
          checked={isTaxed ? false : campDetail.performanceTaxed}
          onChange={e => handleCheckbox(e, "performanceTaxed")}
          disabled={isTaxed}
        />
      ),
      size: 1
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
        <b style={{ textAlign: "right" }}>
          {compute(campDetail.performanceQty, campDetail.performanceRate)}
        </b>
      ),
      size: 2,
      style: { textAlign: "right" }
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
          <span> {getSubTotal()}</span>
        </div>
      ),
      size: 1
    }
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

export default RowForm;
