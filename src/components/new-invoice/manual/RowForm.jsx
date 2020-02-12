import React from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { Collapse, IconButton } from "@material-ui/core";
import { InputField, Row } from "common-components";
const RowForm = ({ campDetail, rowCollapse, setRowCollapse, index }) => {
  const removeElement = () => {
    const newEl = rowCollapse.filter(item => item !== index);
    return newEl;
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

  const rowData = number => {
    let rowDataArr = [];

    campDetail.billingData.map((item, i) => {
      rowDataArr.push([
        {
          label: <b>{i === 0 ? campDetail.name : " "}</b>,
          size: 3,
          bold: true
        },
        { label: item.name, size: 2 },
        { label: <InputField value={item.qty} />, size: 2 },
        { label: <InputField value={item.rate} />, size: 2 },
        { label: <InputField value={item.totalAmount} />, size: 2 },
        { label: <span>{i === 0 ? <ShowExpand /> : " "}</span>, size: 1 }
      ]);

      return;
    });

    return rowDataArr[number];
  };

  const rowDataCollapse = [
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

  return (
    <div style={{ borderBottom: "solid 1px #F1F1F1" }}>
      <Row
        rowData={rowCollapse.includes(index) ? rowData(0) : rowDataCollapse}
      />

      <Collapse in={rowCollapse.includes(index)}>
        <Row rowData={rowData(1)} />
        <Row rowData={rowData(2)} />
      </Collapse>
    </div>
  );
};

export default RowForm;
