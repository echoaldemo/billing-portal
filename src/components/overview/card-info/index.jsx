import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 420,
    minWidth: 420,
  },
});

export default function CardInfo({ primaryLabel, secondaryLabel }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>

        <CardContent>
          <Typography gutterBottom variant="h5" style={{ color: "#444851" }} component="h2">
            {primaryLabel}
          </Typography>
          <Typography variant="body2" color="textSecondary" variant="h4" >
            {secondaryLabel}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="default">
          See more details
        </Button>
      </CardActions>
    </Card>
  );
}