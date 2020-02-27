import React, { useEffect, useState } from "react";
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
      primaryLabel="Total Approved Invoices"
      secondaryLabel={
        formatNumber(approved.length) + " / " + formatNumber(all.length)
      }
      loading={loading}
    />
  );
};

export default ApprovedInvoices;
