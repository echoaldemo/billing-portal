import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, Grid } from "@material-ui/core";
import RowForm from "./RowForm";

const rowHeaderData = [
  { label: "Campaign", size: 3 },
  { label: "Services", size: 2 },
  { label: "Quantity", size: 2 },
  { label: "Rate", size: 2 },
  { label: "Total Amount", size: 2 },
  { label: " ", size: 1 }
];

const CampaignBilling = ({ campaignDetails }) => {
  const [rowCollapse, setRowCollapse] = useState(null);

  return (
    <div style={{ border: "solid 1px #F1F1F1", borderBottom: 0 }}>
      <RowHeader rowHeaderData={rowHeaderData} />
      {campaignDetails.map((el, i) => {
        return (
          <RowForm
            campDetail={el}
            rowCollapse={rowCollapse}
            setRowCollapse={setRowCollapse}
            key={i}
            index={i}
          />
        );
      })}
    </div>
  );
};

const RowHeader = ({ rowHeaderData }) => {
  return (
    <Grid container style={{ borderBottom: "solid 1px #F1F1f1" }}>
      {rowHeaderData.map((item, i) => {
        return (
          <Grid
            item
            key={i}
            xs={item.size}
            className="row-header-item p-normal"
          >
            <b>{item.label}</b>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default CampaignBilling;
