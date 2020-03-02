import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { Typography, CircularProgress, Grid } from "@material-ui/core";
import { KeyboardArrowRight, Create } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { StateContext } from "context/StateContext";

const useStyles = makeStyles({
  card: {
    maxWidth: 420,
    minWidth: 420,
    boxShadow:
      "0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)",
    margin: "2px 0",
    position: "relative"
  },
  loaderDiv: {
    position: "absolute",
    minWidth: 420,
    height: "100%",
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
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

export default function CardInfo({
  primaryLabel,
  secondaryLabel,
  loading,
  status = false,
  icon = () => <Create fontSize="large" style={{ marginRight: 20 }} />
}) {
  const classes = useStyles();
  const { filterOpt, setFilterOpt } = React.useContext(StateContext);

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Grid container>
              <Grid item>
                <Typography
                  gutterBottom
                  component="h5"
                  style={{ color: "#444851", textAlign: "left" }}
                >
                  {primaryLabel.toUpperCase()}
                </Typography>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  style={{
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center"
                  }}
                >
                  {icon()}
                  {secondaryLabel}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions style={{ justifyContent: "flex-end" }}>
          <Link
            to={{
              pathname: "/invoices"
            }}
            onClick={() => setFilterOpt({ ...filterOpt, status })}
          >
            <Button size="small" color="default">
              See more details <KeyboardArrowRight />
            </Button>
          </Link>
        </CardActions>
        {loading && (
          <div className={classes.loaderDiv}>
            <CircularProgress className={classes.loader} size={20} />
          </div>
        )}
      </Card>
    </>
  );
}
