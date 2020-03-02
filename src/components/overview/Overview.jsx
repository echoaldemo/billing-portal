import React from "react";
import { Grid, Paper, Container } from "@material-ui/core";
import Chart from "react-google-charts";
import { PanelHeader } from "common-components";
import ActivityLogs from "./activity-logs";
import DraftInvoices from "./draft-invoices/DraftInvoices";
import ReviewedInvoices from "./reviewed-invoices/ReviewedInvoices";
import ApprovedInvoices from "./approved-invoices/ApprovedInvoices";
import { StateContext } from "context/StateContext";

const pieOptions = {
  title: "",
  pieHole: 0.6,
  slices: [
    {
      color: "#2BB673"
    },
    {
      color: "#d91e48"
    },
    {
      color: "#007fad"
    },
    {
      color: "#e9a227"
    }
  ],
  legend: {
    position: "bottom",
    alignment: "center",
    textStyle: {
      color: "233238",
      fontSize: 14
    }
  },
  tooltip: {
    showColorCode: true
  },
  chartArea: {
    left: 0,
    top: 0,
    width: "100%",
    height: "80%"
  },
  fontName: "Roboto"
};
const Overview = () => {
  const { setFilterStatus } = React.useContext(StateContext);
  React.useEffect(() => {
    setFilterStatus(false);
  }, []);

  return (
    <Grid container>
      <Grid item lg={12}>
        <PanelHeader
          title="Statistic Overview"
          subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. "
        />

        <Grid container spacing={5} className="display-even p-normal pb-normal">
          <DraftInvoices />
          <ReviewedInvoices />
          <ApprovedInvoices />
        </Grid>

        <Grid container style={{ marginTop: 50 }}>
          <Grid item lg={8} className="center h-500">
            <Chart
              chartType="PieChart"
              data={[
                ["Automatic", "Manual"],
                ["Automatic", 12],
                ["Manual", 5.5]
              ]}
              options={pieOptions}
              graph_id="PieChart"
              width={"100%"}
              height={"400px"}
              legend_toggle
            />
          </Grid>

          <Grid item lg={4} className="center h-500">
            <ActivityLogs />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item lg={8}></Grid>

          <Grid item lg={4}>
            <Container style={{ margin: "140px 0px 0px 10px" }}></Container>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Overview;
