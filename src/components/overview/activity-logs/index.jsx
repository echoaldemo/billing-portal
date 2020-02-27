import React, { useContext, useEffect } from "react";
import { OverviewContext, OverviewProvider } from "context/OverviewContext";
import { StateContext } from "context/StateContext";
import {
  Paper,
  Typography,
  Divider,
  CircularProgress as Loader
} from "@material-ui/core";
import Add from "@material-ui/icons/PostAdd";
import Delete from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import Email from "@material-ui/icons/Email";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { makeStyles } from "@material-ui/core/styles";
import { NoResult } from "common-components";
import { getFromNow, bubbleColor, getPronoun } from "./utils";

const useStyles = makeStyles(() => ({
  root: {
    padding: "3px 0px 3px 0px"
  },
  grid: {
    display: "grid",
    height: "100%",
    alignItems: "center",
    justifyItems: "center"
  },
  container: {
    width: 375,
    height: "42vh",
    overflowY: "scroll"
  }
}));

const ActivityLogsComponent = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(OverviewContext);
  const { state: mainState } = useContext(StateContext);
  useEffect(() => {
    let temp = state.logs;
    temp.map(e => {
      if (e.type === "create-draft") e["icon"] = <Add />;
      if (e.type === "sent-invoice") e["icon"] = <Email />;
      if (e.type === "delete-invoice") e["icon"] = <Delete />;
      if (e.type === "edit-invoice") e["icon"] = <Edit />;
    });
    dispatch({
      type: "set-logs",
      payload: { logs: temp }
    });
  }, [state.logs]);
  return (
    <Paper>
      <Typography variant="subtitle2" style={{ padding: 19 }}>
        ACTIVITY LOG
      </Typography>
      <Divider />
      <div className={classes.container}>
        {state.logsLoading ? (
          <div className={classes.grid}>
            <Loader size={50} />
          </div>
        ) : state.logs.length === 0 ? (
          <NoResult />
        ) : (
          <Timeline>
            {state.logs.map((item, i) => (
              <React.Fragment key={i}>
                <TimelineEvent
                  title={getPronoun(
                    item.description,
                    mainState.userProfile.name
                  )}
                  createdAt={getFromNow(item.date, item.time)}
                  icon={item.icon}
                  bubbleStyle={bubbleColor(item.description)}
                />
                <div className={classes.root}></div>
              </React.Fragment>
            ))}
          </Timeline>
        )}
      </div>
    </Paper>
  );
};

const ActivityLogs = () => {
  return (
    <OverviewProvider>
      <ActivityLogsComponent />
    </OverviewProvider>
  );
};

export default ActivityLogs;
