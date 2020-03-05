import React, { useContext, useEffect } from "react";
import { Grid, InputLabel } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { InputField } from "common-components";
import DateFnsUtils from "@date-io/date-fns";
import { StateContext } from "context/StateContext";
import { formatDate } from "utils/func";
import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);
const FilterDate = () => {
  const { dateRange, setDateRange } = useContext(StateContext);

  const handleDateChange = (date, type) => {
    if (type === "startDate") {
      const futureMonth = moment(date).add(30, "days");
      const futureMonthEnd = moment(futureMonth).endOf("days");
      setDateRange({
        ...dateRange,
        startDate: formatDate(date),
        endDate: formatDate(new Date(futureMonthEnd._d))
      });
    } else {
      setDateRange({ ...dateRange, [type]: formatDate(date) });
    }
  };

  return (
    <Grid container spacing={5}>
      <Grid item lg={6} xs={6} md={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            TextFieldComponent={InputField}
            name="billingPeriod"
            label="From"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            value={dateRange.startDate}
            onChange={(date) => {
              handleDateChange(date, "startDate");
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item lg={6} xs={6} md={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            TextFieldComponent={InputField}
            label="To"
            name="billingPeriod"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            value={dateRange.endDate}
            onChange={(date) => {
              handleDateChange(date, "endDate");
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
};

export default FilterDate;
