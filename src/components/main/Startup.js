import React, { useEffect } from 'react';
import { ApiAsync, Axios, Backdrop } from '../../service/ApiService';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Timestamp from '../../components/date/Timestamp';

export default function Startup(props) {

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

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch();
    }, 36000);
    return () => clearInterval(interval);
  });

  const [state, dispatch] = ApiAsync(() => getData(), []);
  const { isLoading, data } = state;

  async function getData() {
    const response = await Axios.get(
      '/actuator/metrics/os.uptime'
    ).catch(error => {
      console.log(error);
    });

    if(response === undefined){
      return;
    }
    
    if(response.status === 200){
      return response;
    }
  }

  if(isLoading){
    return (<Backdrop/>)
  }
  
  const date = data.measurements[0].value;

  var now = new Date().getTime();
  
  var elapsed = parseInt((now - date) / 1000 / 60 / 60);

  return (
    <Card elevation={0} className={classes.card}>
      <CardContent>
        <div className={classes.content} >
          <Typography className={classes.name} variant="h4">
            STARTUP
          </Typography>
          <Avatar aria-label="recipe" className={classes.avater}>
            <FlipCameraAndroidIcon/>
          </Avatar>
        </div>
        <div className={classes.content} >
          <Typography className={classes.percent} variant="h6">
            {elapsed}H
          </Typography>
          <Typography className={classes.percent} variant="button">
            <Timestamp className={classes.percent} dateTime={date} variant="button"/>
          </Typography>
        </div>
        <LinearProgress variant="determinate" value={100} />
      </CardContent>
    </Card>
  );
}