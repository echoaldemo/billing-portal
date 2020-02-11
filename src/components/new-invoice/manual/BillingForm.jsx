import React, { useContext } from "react";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import { InputField } from "common-components";
import BillingTable from "./BillingTable";

const FormFields = () => {
  return <BillingTable />;
};

const BillingForm = () => {
  const { formState } = useContext(ManualInvoiceContext);
  return (
    <div style={{ padding: 15, paddingTop: 0, color: "#444851" }}>
      {!formState.company ? (
        <h3 style={{ padding: 0 }}>
          Need to select company to create a manual invoice
        </h3>
      ) : (
        <React.Fragment>
          <FormFields />
        </React.Fragment>
      )}
    </div>
  );
};
export default BillingForm;
