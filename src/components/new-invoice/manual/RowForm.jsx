import React from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse, Grid, IconButton } from "@material-ui/core";
import { InputField, Row } from "common-components";

const RowForm = ({ campDetail, rowCollapse, setRowCollapse, index }) => {
  const removeElement = () => {
    const newEl = rowCollapse.filter(item => item !== index);
    return newEl;
  };
  const ShowExpand = () => {
    return (
      <div style={{ textAlign: "right" }}>
        {console.log(rowCollapse)}
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
    { label: <InputField value={1} />, size: 2 },
    { label: <InputField value={2} />, size: 2 },
    { label: <InputField value={51} />, size: 2 },
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
    { label: <InputField value={1} />, size: 2 },
    { label: <InputField value={2} />, size: 2 },
    { label: <InputField value={51} />, size: 2 },
    { label: " ", size: 1 }
  ];
  const rowData3 = [
    {
      label: " ",
      size: 3
    },
    { label: "Performance", size: 2 },
    { label: <InputField value={1} />, size: 2 },
    { label: <InputField value={2} />, size: 2 },
    { label: <InputField value={51} />, size: 2 },
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
