import React, { useEffect } from 'react';
import { ApiAsync, Axios, Backdrop } from '../../service/ApiService';
import makeStyles from '@material-ui/core/styles/makeStyles';

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

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch();
    }, 10000);
    return () => clearInterval(interval);
  });

  const [state, dispatch] = ApiAsync(() => getData(), []);
  const { isLoading, data } = state;

  async function getData() {
    const response = await Axios.get(
      '/actuator/health'
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

  const disk = data.components.diskSpace.details;

  const total = disk.total;
  const free = disk.free;

  const getResultSize = (size) => {
    var bytes = parseInt(total);
 
    var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes)/Math.log(1024));
  
    if(e === "-Infinity") {
      return "0 " + s[0]; 
    } else {
      return (bytes/Math.pow(1024, Math.floor(e))).toFixed(0) + " " + s[e];
    }
  }

  let percent = parseInt((total - free) / total * 100);

  return (
    <Card elevation={0} className={classes.card}>
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