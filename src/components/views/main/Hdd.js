import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import { getResultSize } from '../../../service/views/ServiceMain';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import StorageIcon from '@material-ui/icons/Storage';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Hdd(props) {

  const useStyles = makeStyles(theme => ({
    content: {
      display: "flex",
      justifyContent: "space-between",
    },
    card: {
      backgroundColor: theme.palette.dashboard.card.backgroundColor,
    },
    avater: {
      color: theme.palette.dashboard.card.icon.color,
    },
    percent: {
      color: theme.palette.dashboard.card.color,
      fontWeight: 600,
      display: "flex",
      alignSelf: "flex-end",
    },
    name: {
      color: theme.palette.dashboard.card.color,
      fontWeight: 700,
    },
  }));

  const classes = useStyles();

  const total = props.total;
  const free = props.free;

  let percent = parseInt((total - free) / total * 100);

  return (
    <Card elevation={1} className={classes.card}>
      <CardContent>
        <div className={classes.content} >
          <Typography className={classes.name} variant="h4">
            HDD
          </Typography>
          <Avatar aria-label="recipe" className={classes.avater}>
            <StorageIcon/>
          </Avatar>
        </div>
        <div className={classes.content} >
          <Typography className={classes.percent} variant="h6">
            {percent}%
          </Typography>
          <Typography className={classes.percent} variant="button">
            {getResultSize(total)}
          </Typography>
        </div>
        <LinearProgress variant="determinate" value={percent} />
      </CardContent>
    </Card>
  );
}

Hdd.propTypes = {
  total: PropTypes.number.isRequired,
  free: PropTypes.number.isRequired
};