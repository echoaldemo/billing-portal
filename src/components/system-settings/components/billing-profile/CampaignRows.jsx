import React, { useContext } from "react";
import { Row, RowHeader } from "common-components";
import { BillingContext } from "context/BillingProfileContext";
import InputField from "../../../new-invoice/components/CustomInput";
import RowHeaderData from "./rowHeaderData";
const CampaignRows = () => {
  return (
    <div style={{ width: "100%", paddingTop: 15 }}>
      <RowHeader
        rowHeaderData={RowHeaderData}
        style={{ border: "solid 1px #F1f1f1" }}
      />
      <div
        style={{
          border: "solid 1px #F1f1f1",
          maxHeight: 500,
          overflow: "auto"
        }}
      >
        <RowBody />
      </div>
    </div>
  );
};

const RowBody = () => {
  const { companyCampaigns, state } = useContext(BillingContext);
  const { edit } = state;
  return (
    <React.Fragment>
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
                  },
                  {
                    label: (
                      <InputField
                        placeholder="Billable Rate"
                        disabled={!edit}
                      />
                    ),
                    size: 2
                  },
                  {
                    label: (
                      <InputField placeholder="DID Rate" disabled={!edit} />
                    ),
                    size: 2
                  },
                  {
                    label: (
                      <InputField
                        placeholder="Performace rate"
                        disabled={!edit}
                      />
                    ),
                    size: 2
                  }
                ]}
              />
            );
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CampaignRows;
