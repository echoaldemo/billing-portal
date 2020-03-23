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
    item.content["bill_rate"] && newArr.push("Billable Hours");
    item.content["did_rate"] && newArr.push("DID");
    item.content["performance_rate"] && newArr.push("Performance");
    return newArr.length > 0 ? newArr.join(", ") : "Field not set";
  };

  return (
    <React.Fragment>
      {
        formState ?
          <React.Fragment>
            {
              formState.map((item, i) => {
                return (
                  <CampaignRowDetails
                    item={item}
                    services={handleServices(item)}
                    key={i}
                    index={i}
                  />
                )
              })
            }
          </React.Fragment>
          : null
      }
    </React.Fragment>
  );
};

export default CampaignRows;

// {formState.rates.length > 0 && (
//   <React.Fragment>
//     <h1>sadsad</h1>
//     {formState.rate.map((item, i) => {
//       return (
//         <CampaignRowDetails
//           item={item}
//           services={handleServices(item)}
//           key={i}
//           index={i}
//         />
//       );
//     })}
//   </React.Fragment>
// )}