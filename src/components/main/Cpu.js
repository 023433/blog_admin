import React, { useEffect } from 'react';
import { ApiAsync, Axios, Backdrop } from '../../service/ApiService';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';

export default function Cpu() {

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
    }, 3000);
    return () => clearInterval(interval);
  });

  const [state, dispatch] = ApiAsync(() => getData(), []);
  const { isLoading, data } = state;

  async function getData() {
    const response = await Axios.get(
      '/actuator/metrics/system.cpu.usage'
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

  let percent = parseInt(data.measurements[0].value * 100);

  return (
    <Card elevation={0} className={classes.card}>
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