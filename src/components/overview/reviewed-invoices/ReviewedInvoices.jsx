import React, { useEffect, useState } from "react";
import CardInfo from "../card-info";
import { get } from "utils/api";

const ReviewedInvoices = () => {
  const [reviewed, setReviewed] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    get("/api/pending/list").then((res) => {
      setAll(res.data);
      const reviewedInvoices = res.data.filter(
        (invoices) => invoices.status === 1
      );
      console.log(reviewedInvoices);
      setReviewed(reviewedInvoices);
      setLoading(false);
    });
  }, []);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <CardInfo
      primaryLabel="Total Reviewed Invoices"
      secondaryLabel={
        formatNumber(reviewed.length) + " / " + formatNumber(all.length)
      }
      loading={loading}
    />
  );
};

export default ReviewedInvoices;
