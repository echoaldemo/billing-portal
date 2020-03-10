import React, { useContext } from "react";
import { BillingContext } from "context/BillingProfileContext";
import { Row, InputField } from "common-components";
import { IconButton, Collapse } from "@material-ui/core";
import { ExpandMore, ExpandLess } from "@material-ui/icons";

const ShowExpand = ({ index }) => {
  const { rowCollapse, setRowCollapse } = useContext(BillingContext);
  const removeElement = () => {
    const newEl = rowCollapse.filter(item => item !== index);
    return newEl;
  };
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

const CampaignRowsDetails = ({ item, index, services }) => {
  const {
    rowCollapse,
    state: { edit },
    handleFieldChange
  } = useContext(BillingContext);

  const initalRowData = [
    {
      label: item.name,
      size: 3
    },
    {
      label: <small>{services}</small>,
      size: 4
    },

    {
      label: (
        <small style={{ color: "#0f97fc" }}>Expand item to see details</small>
      ),
      size: 3,
      style: { textAlign: "center" }
    },
    {
      label: <ShowExpand index={index} />,
      size: 2,
      style: { textAlign: "center" }
    }
  ];

  const rowData1 = [
    {
      label: item.name,
      size: 3
    },
    {
      label: "Billable Hours",
      size: 5
    },

    {
      label: (
        <InputField
          type="number"
          value={item.billable_rate}
          placeholder="Hourly rate"
          disabled={!edit}
          onChange={e => {
            handleFieldChange(e, index, "billable_rate");
          }}
        />
      ),
      size: 2,
      style: { textAlign: "left" }
    },
    {
      label: <ShowExpand index={index} />,
      size: 2,
      style: { textAlign: "center" }
    }
  ];

  const rowData2 = [
    {
      label: " ",
      size: 3
    },
    {
      label: "DID Billing",
      size: 5
    },

    {
      label: (
        <InputField
          value={item.did_rate}
          type="number"
          placeholder="DID rate"
          disabled={!edit}
          onChange={e => {
            handleFieldChange(e, index, "did_rate");
          }}
        />
      ),
      size: 2,
      style: { textAlign: "left" }
    },
    {
      label: " ",
      size: 2,
      style: { textAlign: "center" }
    }
  ];

  const rowData3 = [
    {
      label: " ",
      size: 3
    },
    {
      label: "Performance",
      size: 5
    },

    {
      label: (
        <InputField
          type="number"
          value={item.performance_rate}
          placeholder="Performance rate"
          disabled={!edit}
          onChange={e => {
            handleFieldChange(e, index, "performance_rate");
          }}
        />
      ),
      size: 2,
      style: { textAlign: "left" }
    },
    {
      label: " ",
      size: 2,
      style: { textAlign: "center" }
    }
  ];

  return (
    <div style={{ borderBottom: "solid 1px #F1f1f1" }}>
      <Row
        key={index}
        rowData={!rowCollapse.includes(index) ? initalRowData : rowData1}
      />
      <Collapse in={rowCollapse.includes(index)}>
        <Row rowData={rowData2} />
        <Row rowData={rowData3} />
      </Collapse>
    </div>
  );
};

export default CampaignRowsDetails;
