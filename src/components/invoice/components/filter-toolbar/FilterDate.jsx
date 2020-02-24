import React, { useContext } from "react";
import { Grid, InputLabel } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import { StateContext } from "context/StateContext";

const FilterDate = () => {
  const { dateRange, setDateRange, setData, state, originalData } = useContext(
    StateContext
  );

  const filterDateByDate = (date, type) => {
    setDateRange({ ...dateRange, [type]: date });

    var result = originalData.filter(function(item) {
      var itemTime = new Date(item.startDate).getTime();
      return itemTime >= dateRange.startDate && itemTime <= dateRange.endDate;
    });
    setData(result);
    console.log(result);
  };

  return (
    <Grid container spacing={5}>
      <Grid item lg={6} xs={6} md={6}>
        <InputLabel className="date-label">From</InputLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            name="billingPeriod"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            value={dateRange.startDate}
            onChange={date => {
              filterDateByDate(date, "startDate");
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item lg={6} xs={6} md={6}>
        <InputLabel className="date-label">To</InputLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            name="billingPeriod"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            value={dateRange.endDate}
            onChange={date => {
              filterDateByDate(date, "endDate");
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
};

export default FilterDate;
