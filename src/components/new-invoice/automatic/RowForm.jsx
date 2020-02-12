import React from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse, IconButton, Input, makeStyles } from "@material-ui/core";
import { InputField as TryField, Row } from "common-components";

const useStyles = makeStyles(theme => ({
  underline: {
    borderBottom: "2px solid white",
    "&:after": {
      // The source seems to use this but it doesn't work
      borderBottom: "2px solid white"
    }
  }
}));

const InputField = props => {
  const classes = useStyles();
  return (
    <TryField
      fullWidth
      inputProps={{ style: { textAlign: "right" } }}
      input={
        <Input
          classes={{
            underline: classes.underline
          }}
        />
      }
      {...props}
    />
  );
};

const RowForm = ({ campDetail, rowCollapse, setRowCollapse, index }) => {
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

  const rowData1 = [
    {
      label: <b>{campDetail.name}</b>,
      size: 3,
      bold: true
    },
    { label: "Billable Hours", size: 2 },
    { label: <InputField value={billable_hours} />, size: 2 },
    { label: <InputField value={bill_rate} />, size: 2 },
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
    { label: <InputField value={did} />, size: 2 },
    { label: <InputField value={did_rate} />, size: 2 },
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
    { label: <InputField value={performance} />, size: 2 },
    { label: <InputField value={performance_rate} />, size: 2 },
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
