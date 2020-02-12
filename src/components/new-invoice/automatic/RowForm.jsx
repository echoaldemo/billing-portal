import React, { useContext, useState, useEffect } from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import {
  Collapse,
  IconButton,
  InputAdornment,
  Divider
} from "@material-ui/core";
import { InputField as TryField, Row } from "common-components";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import styled from "styled-components";
const BillDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px 1fr 1fr;
  justify-items: end;
`;
const InputField = ({ customWidth, ...rest }) => {
  return (
    <TryField
      inputProps={{
        style: { textAlign: "right" }
      }}
      style={{ width: customWidth || "60%", float: "right" }}
      {...rest}
    />
  );
};
const convertHourMin = value => {
  const hrs = parseInt(Number(value));
  const min = Math.round((Number(value) - hrs) * 60);
  return hrs + ":" + min;
};
const HourMin = ({ value, onChange, state, handleHourMin }) => {
  return (
    <BillDiv>
      <InputField
        value={value}
        customWidth="100%"
        onChange={e => onChange(e, "billable_hours")}
      />
      <Divider orientation="vertical" />
      <InputField
        InputProps={{
          endAdornment: <InputAdornment position="end">hr</InputAdornment>
        }}
        customWidth="80%"
        onChange={e => handleHourMin(e.target.value, "hour")}
        value={state.hour}
      />

      <InputField
        InputProps={{
          endAdornment: <InputAdornment position="end">min</InputAdornment>
        }}
        customWidth="80%"
        onChange={e => handleHourMin(e.target.value, "min")}
        value={state.min}
      />
    </BillDiv>
  );
};
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
    }
  }, [billable_hours]);
  const removeElement = () => {
    const newEl = rowCollapse.filter(item => item !== index);
    return newEl;
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  });
  const compute = (x, y) => {
    if (x * y) return formatter.format(x * y);
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
  const hourMinToDec = (value, label) => {
    if ((parseFloat(value) <= 59 && parseFloat(value) > 0) || value === "") {
      setTimeState({ ...timeState, [label]: value });
      let temp;
      if (label === "hour") temp = `${value}:${timeState.min}`;
      else temp = `${timeState.hour}:${value}`;
      const arr = temp.split(":");
      const dec = parseInt((arr[1] / 6) * 10, 10);
      const final = parseFloat(
        parseInt(arr[0], 10) + "." + (dec < 10 ? "0" : "") + dec
      );
      if (final) {
        let temp = formState.campaign;
        temp.map((item, i) => {
          if (i === index) {
            item.content["billable_hours"] = final;
          }
        });
        setFormState({ ...formState, campaign: temp });
      }
    }
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
        <HourMin
          onChange={handleChange}
          handleHourMin={hourMinToDec}
          value={billable_hours}
          state={timeState}
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          value={bill_rate}
          onChange={e => handleChange(e, "bill_rate")}
        />
      ),
      size: 2
    },
    {
      label: <InputField value={compute(billable_hours, bill_rate)} />,
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
    { label: "Fields not set", size: 2 },
    { label: "Fields not set", size: 2 },
    { label: "n/a", size: 2 },
    { label: "Fields not set", size: 2 },
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
      label: <InputField value={did} onChange={e => handleChange(e, "did")} />,
      size: 2
    },
    {
      label: (
        <InputField
          value={did_rate}
          onChange={e => handleChange(e, "did_rate")}
        />
      ),
      size: 2
    },
    {
      label: <InputField value={compute(did, did_rate)} />,
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
          value={performance}
          onChange={e => handleChange(e, "performance")}
        />
      ),
      size: 2
    },
    {
      label: (
        <InputField
          value={performance_rate}
          onChange={e => handleChange(e, "performance_rate")}
        />
      ),
      size: 2
    },
    {
      label: <InputField value={compute(performance, performance_rate)} />,
      size: 2
    },
    { label: " ", size: 1 }
  ];
  return (
    <div style={{ borderBottom: "solid 1px #F1F1F1" }}>
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
