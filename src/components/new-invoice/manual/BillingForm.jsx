import React, { useContext } from "react";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import BillingTable from "./BillingTable";
import NoCompanyResult from "../components/NoCompanyResult";
const FormFields = ({ duplicate }) => {
  return <BillingTable duplicate={duplicate} />;
};

const BillingForm = ({ duplicate }) => {
  const { formState } = useContext(ManualInvoiceContext);
  return (
    <div style={{ padding: 15, paddingTop: 0, color: "#444851" }}>
      {!formState.company ? (
        <NoCompanyResult />
      ) : (
        <React.Fragment>
          <FormFields duplicate={duplicate} />
        </React.Fragment>
      )}
    </div>
  );
};
export default BillingForm;
