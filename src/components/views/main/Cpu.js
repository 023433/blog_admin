import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Cpu(props) {

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
  
  let percent = parseInt(props.percent);

  return (
    <Card elevation={1} className={classes.card}>
      <CardContent>
        <div className={classes.content} >
          <Typography className={classes.name} variant="h4">
            CPU
          </Typography>
          <Avatar aria-label="recipe" className={classes.avater}>
            <DesktopMacIcon/>
          </Avatar>
        </div>
        <Typography className={classes.percent} variant="h6">
          {percent}%
        </Typography>
        <LinearProgress variant="determinate" value={percent} />
      </CardContent>
    </Card>
  );
}

Cpu.propTypes = {
  percent: PropTypes.number.isRequired
};