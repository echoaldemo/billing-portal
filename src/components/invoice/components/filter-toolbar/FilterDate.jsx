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
  const { dateRange, setDateRange, setData, state, originalData } = useContext(
    StateContext
  );

  useEffect(() => {
    filterDataByDate();
  }, [dateRange]);

  const filterDataByDate = () => {
    let startDate = moment(dateRange.startDate).subtract(1, "days");
    let endDate = moment(dateRange.endDate).add(1, "days");
    const range = moment().range(startDate, endDate);
    const result = originalData.filter(item => {
      return (
        range.contains(new Date(item.startDate)) ||
        range.contains(new Date(item.endDate))
      );
    });
    setData(result);
  };
  const handleDateChange = (date, type) => {
    setDateRange({ ...dateRange, [type]: formatDate(date) });
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
            onChange={date => {
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
            onChange={date => {
              handleDateChange(date, "endDate");
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>
    </Grid>
  );
};

export default FilterDate;
