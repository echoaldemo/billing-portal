import React from "react";
import {
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText
} from "@material-ui/core";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  numbersCardIcon: {
    fontSize: 100,
    position: "absolute",
    right: 10,
    top: 10,
    color: "#2B8DD8"
  }
}));

const mock = [
  {
    first_name: "Jericho",
    last_name: "Aldemo",
    summary: "Sent an invoice to Rapid Response.",
    time: "1 hour ago"
  },
  {
    first_name: "Jomar",
    last_name: "Bandol",
    summary: "Sent an invoice to Shift44.",
    time: "5 hours ago"
  },
  {
    first_name: "Jude",
    last_name: "Agagad",
    summary: "Issued an invoice for Rapid Response.",
    time: "2 days ago"
  },
  {
    first_name: "Sidney",
    last_name: "Bercasio",
    summary: "Modified information of Shift44",
    time: "3 days ago"
  },
  {
    first_name: "Jules",
    last_name: "Ballaran",
    summary: "Deleted an invoice for Rapid Response.",
    time: "1 week ago"
  },
  {
    first_name: "Jericho",
    last_name: "Aldemo",
    summary: "Sent an invoice to Rapid Response.",
    time: "1 hour ago"
  },
  {
    first_name: "Jomar",
    last_name: "Bandol",
    summary: "Sent an invoice to Shift44.",
    time: "5 hours ago"
  },
  {
    first_name: "Jude",
    last_name: "Agagad",
    summary: "Issued an invoice for Rapid Response.",
    time: "2 days ago"
  },
  {
    first_name: "Sidney",
    last_name: "Bercasio",
    summary: "Modified information of Shift44",
    time: "3 days ago"
  },
  {
    first_name: "Jules",
    last_name: "Ballaran",
    summary: "Deleted an invoice for Rapid Response.",
    time: "1 week ago"
  },
  {
    first_name: "Jericho",
    last_name: "Aldemo",
    summary: "Sent an invoice to Rapid Response.",
    time: "1 hour ago"
  },
  {
    first_name: "Jomar",
    last_name: "Bandol",
    summary: "Sent an invoice to Shift44.",
    time: "5 hours ago"
  },
  {
    first_name: "Jude",
    last_name: "Agagad",
    summary: "Issued an invoice for Rapid Response.",
    time: "2 days ago"
  },
  {
    first_name: "Sidney",
    last_name: "Bercasio",
    summary: "Modified information of Shift44",
    time: "3 days ago"
  },
  {
    first_name: "Jules",
    last_name: "Ballaran",
    summary: "Deleted an invoice for Rapid Response.",
    time: "1 week ago"
  }
];

const ActivityLogs = () => {
  const classes = useStyles();
  return (
    <Paper>
      <Typography variant="subtitle2" style={{ padding: 19 }}>
        ACTIVITY LOG
      </Typography>
      <Divider />
      <div style={{ width: "100%", height: "54.5vh", overflowY: "scroll" }}>
        <List className={classes.root}>
          {true ? (
            mock.map((item, i) => (
              <>
                <ListItem
                  style={{ display: "flex", alignItems: "center" }}
                  alignItems="flex-start"
                  button
                  onClick={() => console.log("try")}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt=""
                      src={
                        item.avatar ||
                        "https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwj52JKWmKPnAhXQ62EKHSbBClEQjRx6BAgBEAQ&url=https%3A%2F%2Fdlpng.com%2Fpng%2F1783824&psig=AOvVaw0mbhtZsRmVmYl10cWIGUrW&ust=1580194163367957"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="caption">{item.summary}</Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="caption"
                          className={classes.inline}
                          color="textSecondary"
                        >
                          {item.first_name + " " + item.last_name} | {item.time}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  <ExpandMore />
                </ListItem>
                {i !== mock.length - 1 && <Divider component="li" />}
              </>
            ))
          ) : (
            <LinearProgress />
          )}
        </List>
      </div>
    </Paper>
  );
};
export default ActivityLogs;
