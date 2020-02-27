import React, { useContext } from "react";
import { Row, RowHeader } from "common-components";
import { BillingContext } from "context/BillingProfileContext";
const CampaignRows = () => {
  const { companyCampaigns } = useContext(BillingContext);

  return (
    <div style={{ width: "100%", paddingTop: 15 }}>
      <RowHeader
        rowHeaderData={[
          {
            label: "Campaign name",
            size: 4
          },
          {
            label: "Billable",
            size: 2
          },
          {
            label: "DID Billing",
            size: 2
          },
          {
            label: "Performance",
            size: 2
          },
          {
            label: "Actions",
            size: 2
          }
        ]}
        style={{ border: "solid 1px #F1f1f1" }}
      />
      <div
        style={{
          border: "solid 1px #F1f1f1",
          maxHeight: 500,
          overflow: "auto"
        }}
      >
        {companyCampaigns.length > 0 && (
          <React.Fragment>
            {companyCampaigns.map((item, i) => {
              return (
                <Row
                  key={i}
                  style={{ borderBottom: "solid 1px #F1f1f1" }}
                  rowData={[
                    {
                      label: item.name,
                      size: 5
                    }
                  ]}
                />
              );
            })}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CampaignRows;
