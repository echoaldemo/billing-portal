/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse, IconButton, Checkbox as TempCb } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { Row, TimeInput } from "common-components";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import InputField from "../components/CustomInput";

const Checkbox = styled(TempCb)({
  padding: 0
});

const convertHourMin = value => {
  const hrs = parseInt(Number(value));
  const min = Math.round((Number(value) - hrs) * 60);
  return hrs + ":" + min;
};
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
const RowForm = ({ campDetail, rowCollapse, setRowCollapse, index }) => {
  const { formState, setFormState } = useContext(AutomaticInvoiceContext);
  const [timeState, setTimeState] = useState({ hour: "", min: "" });
  const {
    billable_hours,
    bill_rate,
    performance,
    performance_rate,
    did,
    did_rate
  } = campDetail.content;
  useEffect(() => {
    if (billable_hours) {
      let hourMin = convertHourMin(billable_hours);
      hourMin = hourMin.split(":");
      const hour = parseFloat(hourMin[0]) || "";
      const min = parseFloat(hourMin[1]) || "";
      setTimeState({ hour, min });
    } else {
      setTimeState({ hour: "", min: "" });
    }
  }, [billable_hours]);
  const removeElement = () => {
    const newEl = rowCollapse.filter(item => item !== index);
    return newEl;
  };
  const compute = (x, y) => {
    if (x * y)
      return (
        <div
          style={{
            width: "100%",
            fontWeight: "bold",
            textAlign: "right",
            marginTop: 10
          }}
        >
          {formatter.format(x * y)}
        </div>
      );
    else return " ";
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
  const handleChange = (e, type) => {
    let temp = formState.campaign;
    temp.map((item, i) => {
      if (i === index) {
        item.content[type] = e.target.value;
      }
    });
    setFormState({ ...formState, campaign: temp });
  };
  const handleTaxChange = (e, type) => {
    let temp = formState.campaign;
    temp.map((item, i) => {
      if (i === index) {
        item.tax[type] = e.target.checked;
      }
    });
    setFormState({ ...formState, campaign: temp });
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

      temp = formState.campaign;
      temp.map((item, i) => {
        if (i === index) {
          item.content["billable_hours"] = final;
        }
      });
      setFormState({ ...formState, campaign: temp });
    }
  };
  const getSubTotal = () => {
    const a = billable_hours * bill_rate;
    const b = performance * performance_rate;
    const c = did * did_rate;
    return a + b + c;
  };
  const getServices = () => {
    let label = [];
    if (billable_hours * bill_rate) label.push("Billable Hours");
    if (performance * performance_rate) label.push("Performance");
    if (did * did_rate) label.push("DID Billing");

    if (!label.length) return <i>Fields not set</i>;
    else if (label.length === 1) return label[0];
    else return label.join(", ");
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
          onChange={e => handleTaxChange(e, "billable_hours")}
          checked={campDetail.tax.billable_hours}
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
          value={bill_rate}
          placeholder="billing rate"
          onChange={e => handleChange(e, "bill_rate")}
        />
      ),
      size: 2
    },
    {
      label: compute(billable_hours, bill_rate),
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

    { label: getServices(), size: 2 },
    {
      label: (
        <div style={{ textAlign: "right", width: "100%" }}>
          <b>{getSubTotal() ? formatter.format(getSubTotal()) : ""}</b>
        </div>
      ),
      size: 6
    },
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
          onChange={e => handleTaxChange(e, "did")}
          checked={campDetail.tax.did}
        />
      ),
      size: 1
    },
    { label: "DID Billing", size: 2 },
    {
      label: (
        <InputField
          placeholder="DIDs used"
          value={did}
          onChange={e => handleChange(e, "did")}
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          value={did_rate}
          placeholder="DID rate"
          onChange={e => handleChange(e, "did_rate")}
        />
      ),
      size: 2
    },
    {
      label: compute(did, did_rate),
      size: 2
    },
    { label: " ", size: 1 }
  ];
  const rowData3 = [
    {
      label: " ",
      size: 2
    },
    {
      label: (
        <Checkbox
          onChange={e => handleTaxChange(e, "performance")}
          checked={campDetail.tax.performance}
        />
      ),
      size: 1
    },
    { label: "Performance", size: 2 },
    {
      label: (
        <InputField
          value={performance}
          placeholder="performance quantity"
          onChange={e => handleChange(e, "performance")}
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          value={performance_rate}
          placeholder="performance rate"
          onChange={e => handleChange(e, "performance_rate")}
        />
      ),
      size: 2
    },
    {
      label: compute(performance, performance_rate),
      size: 2
    },
    { label: " ", size: 1 }
  ];
  const totalRow = [
    {
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
        >
          <span>SUBTOTAL</span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 20
            }}
          >
            {formatter.format(getSubTotal())}
          </span>
        </div>
      ),
      size: 12,
      border: true
    }
  ];
  return (
    <div style={{ borderBottom: "solid 1px #F1F1F1" }}>
      <Row
        rowData={rowCollapse.includes(index) ? rowData1 : rowData1Collapse}
      />
      <Collapse in={rowCollapse.includes(index)}>
        <Row rowData={rowData2} />
        <Row rowData={rowData3} />
        <Row rowData={totalRow} />
      </Collapse>
    </div>
  );
};

export default RowForm;
