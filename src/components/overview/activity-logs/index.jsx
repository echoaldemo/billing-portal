import React, { useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
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
import Check from "@material-ui/icons/Check";
import Draft from "@material-ui/icons/Drafts";
import Review from "@material-ui/icons/RateReview";
import Duplicate from "@material-ui/icons/FileCopy";
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

const ActivityLogsComponent = props => {
  const classes = useStyles();
  const { state, dispatch } = useContext(OverviewContext);
  const { state: mainState } = useContext(StateContext);
  useEffect(() => {
    let temp = state.logs;
    temp.map(e => {
      /* if (e.type === "create-draft") e["icon"] = <Add />;
      if (e.type === "sent-invoice") e["icon"] = <Email />;
      if (e.type === "delete-invoice") e["icon"] = <Delete />;
      if (e.type === "edit-invoice") e["icon"] = <Edit />;
      if (e.type === "approve-invoice") e["icon"] = <Check />;
      if (e.type === "mark-draft") e["icon"] = <Draft />;
      if (e.type === "mark-review") e["icon"] = <Review />;
      if (e.type === "mark-review") e["icon"] */
      switch (e.type) {
        case "create-draft":
          e["icon"] = <Add />;
          break;
        case "sent-invoice":
          e["icon"] = <Email />;
          break;
        case "delete-invoice":
          e["icon"] = <Delete />;
          break;
        case "edit-invoice":
          e["icon"] = <Edit />;
          break;
        case "approve-invoice":
          e["icon"] = <Check />;
          break;
        case "mark-draft":
          e["icon"] = <Draft />;
          break;
        case "mark-review":
          e["icon"] = <Review />;
          break;
        case "duplicate-invoice":
          e["icon"] = <Duplicate />;
          break;
        default:
          break;
      }
    });
    dispatch({
      type: "set-logs",
      payload: { logs: temp }
    });
  }, [state.logs]);
  const clickEvent = id => {
    props.history.push({
      pathname: "/invoices",
      state: { invoiceId: id }
    });
  };
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
                  onIconClick={() => clickEvent(item.invoiceId)}
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

const ActivityLogs = props => {
  return (
    <OverviewProvider>
      <ActivityLogsComponent {...props} />
    </OverviewProvider>
  );
};

export default withRouter(ActivityLogs);
