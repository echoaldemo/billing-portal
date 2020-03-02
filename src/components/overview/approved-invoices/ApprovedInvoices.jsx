import React, { useEffect, useState } from "react";
import { Check } from "@material-ui/icons";
import CardInfo from "../card-info";
import { get } from "utils/api";

const ApprovedInvoices = () => {
  const [approved, setApproved] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    get("/api/pending/list").then((res) => {
      setAll(res.data);
      const approvedInvoices = res.data.filter(
        (invoices) => invoices.status === 2
      );
      console.log(approvedInvoices);
      setApproved(approvedInvoices);
      setLoading(false);
    });
  }, []);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <CardInfo
      primaryLabel="Approved Invoices"
      secondaryLabel={
        formatNumber(approved.length) + " / " + formatNumber(all.length)
      }
      loading={loading}
      status={2}
      icon={() => <Check fontSize="large" style={{ marginRight: 20 }} />}
    />
  );
};

export default ApprovedInvoices;
