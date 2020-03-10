import React, { useContext } from "react";
import { RowHeader } from "common-components";
import { BillingContext } from "context/BillingProfileContext";
import RowHeaderData from "./rowHeaderData";
import CampaignRowDetails from "./CampaignRowsDetails";
import { TableLoader } from "common-components";
const CampaignRows = () => {
  const {
    state: { loading }
  } = useContext(BillingContext);

  return (
    <div style={{ width: "100%", paddingTop: 15 }}>
      <React.Fragment>
        <RowHeader
          rowHeaderData={RowHeaderData}
          style={{ border: "solid 1px #F1f1f1" }}
        />
        <div className="row-body-container">
          {loading ? <TableLoader style={{ height: 500 }} /> : <RowBody />}
        </div>
      </React.Fragment>
    </div>
  );
};

const RowBody = () => {
  const { formState } = useContext(BillingContext);

  const handleServices = item => {
    let newArr = [];
    item["billable_rate"] && newArr.push("Billable Hours");
    item["did_rate"] && newArr.push("DID");
    item["performance_rate"] && newArr.push("Performance");
    return newArr.length > 0 ? newArr.join(", ") : "Field not set";
  };

  return (
    <React.Fragment>
      {formState.length > 0 && (
        <React.Fragment>
          {formState.map((item, i) => {
            return (
              <CampaignRowDetails
                item={item}
                services={handleServices(item)}
                key={i}
                index={i}
              />
            );
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CampaignRows;
