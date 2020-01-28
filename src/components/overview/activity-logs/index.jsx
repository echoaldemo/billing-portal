import React from "react";
import { Paper, Typography, Divider } from "@material-ui/core";
import Add from "@material-ui/icons/PostAdd";
import Delete from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import Email from "@material-ui/icons/Email";
import { Timeline, TimelineEvent } from "react-event-timeline";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    padding: "3px 0px 3px 0px"
  }
}));

const mock = [
  {
    summary: "Jude Agagad sent an invoice to Rapid Response.",
    icon: <Email />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "You issued an invoice to Shift44.",
    icon: <Add />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Jomar Bandol modified an invoice for Rapid Response.",
    icon: <Edit />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "John Paul Garcia modified information of Shift44",
    icon: <Edit />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Jules Ballaran deleted an invoice for Rapid Response.",
    icon: <Delete />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "You sent an invoice to Rapid Response.",
    icon: <Email />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Sidney Bercasio deleted an invoice for Shift44.",
    icon: <Delete />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "John Paul Garcia modified information of Shift44",
    icon: <Edit />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Samuel Lopez issued an invoice for Rapid Response.",
    icon: <Add />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Samuel Lopez issued an invoice for Rapid Response.",
    icon: <Add />,
    time: "2020-28-01 10:06 PM"
  },
  {
    summary: "Sidney Bercasio deleted an invoice for Shift44.",
    icon: <Delete />,
    time: "2020-28-01 10:06 PM"
  }
];

const bubbleColor = summary => {
  if (summary.indexOf("deleted") !== -1) {
    return { border: "2px solid rgb(255, 43, 43)" };
  } else if (summary.indexOf("modified") !== -1) {
    return { border: "2px solid rgb(206, 193, 44)" };
  } else {
    return { border: "2px solid rgb(33, 154, 42)" };
  }
};

const ActivityLogs = () => {
  const classes = useStyles();
  return (
    <Paper>
      <Typography variant="subtitle2" style={{ padding: 19 }}>
        ACTIVITY LOG
      </Typography>
      <Divider />
      <div style={{ width: "100%", height: "42vh", overflowY: "scroll" }}>
        <Timeline>
          {mock.map(item => (
            <>
              <TimelineEvent
                title={item.summary}
                createdAt={item.time}
                icon={item.icon}
                bubbleStyle={bubbleColor(item.summary)}
              />
              <div className={classes.root}></div>
            </>
          ))}
        </Timeline>
      </div>
    </Paper>
  );
};
export default ActivityLogs;
