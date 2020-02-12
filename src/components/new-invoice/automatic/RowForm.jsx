import React from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse, Grid } from "@material-ui/core";
import { InputField as TryField } from "common-components";

const InputField = props => {
  return <TryField inputProps={{ style: { textAlign: "right" } }} {...props} />;
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
        {rowCollapse !== index ? (
          <ExpandMore
            onClick={() => {
              setRowCollapse(index);
            }}
          />
        ) : (
          <ExpandLess
            onClick={() => {
              setRowCollapse(null);
            }}
          />
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
      <Row rowData={rowData1} />
      <Collapse in={rowCollapse === index}>
        <Row rowData={rowData2} />
        <Row rowData={rowData3} />
      </Collapse>
    </div>
  );
};

const Row = ({ rowData }) => {
  return (
    <Grid container>
      {rowData.map((item, i) => {
        return (
          <Grid item xs={item.size} key={i} className="row-item p-normal">
            {item.label}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RowForm;
