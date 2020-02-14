import React, { useContext } from "react";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import BillingTable from "./BillingTable";
import NoCompanyResult from "../components/NoCompanyResult";

const FormFields = () => {
  return <BillingTable />;
};

const BillingForm = () => {
  const { formState } = useContext(AutomaticInvoiceContext);
  return (
    <div style={{ padding: 15, paddingTop: 0, color: "#444851" }}>
      {!formState.company ? (
        <NoCompanyResult />
      ) : (
        <React.Fragment>
          <FormFields />
        </React.Fragment>
      )}
    </div>
  );
};
export default BillingForm;
