import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress } from "@material-ui/core";
import { get } from "utils/api";

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

const useStyles = makeStyles({
  con: {
    position: "relative"
  },
  loaderDiv: {
    position: "absolute",
    minWidth: "100%",
    height: "100%",
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.95)",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%"
  }
});

const PieChart = () => {
  const classes = useStyles();
  const [automatic, setAutomatic] = useState(1);
  const [manual, setManual] = useState(1);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    get("/api/pending/list").then((res) => {
      setAutomatic(
        res.data.filter((c) => c.invoiceType === "Automatic").length
      );
      setManual(res.data.filter((c) => c.invoiceType === "Manual").length);

      setLoading(false);
    });
  }, []);
  return (
    <>
      <div className={classes.con}>
        <Chart
          chartType="PieChart"
          data={[
            ["Automatic", "Manual"],
            ["Automatic", automatic],
            ["Manual", manual]
          ]}
          options={pieOptions}
          graph_id="PieChart"
          width={"100%"}
          height={"400px"}
          legend_toggle
        />
        {loading && (
          <div className={classes.loaderDiv}>
            <CircularProgress className={classes.loader} size={20} />
          </div>
        )}
      </div>
    </>
  );
};
export default PieChart;
