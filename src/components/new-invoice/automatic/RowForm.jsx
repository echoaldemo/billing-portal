import React, { useContext } from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse, IconButton, InputAdornment } from "@material-ui/core";
import { InputField as TryField, Row } from "common-components";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
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

const RowForm = ({ campDetail, rowCollapse, setRowCollapse, index }) => {
  const { formState, setFormState } = useContext(AutomaticInvoiceContext);
  const {
    billable_hours,
    bill_rate,
    performance,
    performance_rate,
    did,
    did_rate
  } = campDetail.content;

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

  const convertHourMin = value => {
    const hrs = parseInt(Number(value));
    const min = Math.round((Number(value) - hrs) * 60);
    return hrs + ":" + min;
  };

  const HourMin = ({ value }) => {
    let hourMin = convertHourMin(value);
    hourMin = hourMin.split(":");
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          justifyItems: "end"
        }}
      >
        <InputField
          InputProps={{
            endAdornment: <InputAdornment position="end">hr</InputAdornment>
          }}
          customWidth="80%"
          value={hourMin[0]}
        />
        <InputField
          InputProps={{
            endAdornment: <InputAdornment position="end">min</InputAdornment>
          }}
          customWidth="80%"
          value={hourMin[1]}
        />
      </div>
    );
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

  const rowData1 = [
    {
      label: <b>{campDetail.name}</b>,
      size: 3,
      bold: true
    },
    { label: "Billable Hours", size: 2 },
    { label: <HourMin value={billable_hours} />, size: 2 },
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
