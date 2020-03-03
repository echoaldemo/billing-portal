import React, { useEffect, useState } from "react";
import { Drafts } from "@material-ui/icons";
import CardInfo from "../card-info";
import { get } from "utils/api";

const DraftInvoices = () => {
  const [pending, setPending] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    get("/api/pending/list").then((res) => {
      setAll(res.data);
      const pendingInvoices = res.data.filter(
        (invoices) => invoices.status === 0
      );
      console.log(pendingInvoices);
      setPending(pendingInvoices);
      setLoading(false);
    });
  }, []);
  const formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <CardInfo
      primaryLabel="Draft Invoices"
      secondaryLabel={
        formatNumber(pending.length) + " / " + formatNumber(all.length)
      }
      loading={loading}
      status={0}
      icon={() => <Drafts fontSize="large" style={{ marginRight: 20 }} />}
    />
  );
};

export default DraftInvoices;
