import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import StorageIcon from '@material-ui/icons/Storage';
import FlipCameraAndroidIcon from '@material-ui/icons/FlipCameraAndroid';
import MemoryIcon from '@material-ui/icons/Memory';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';

import LinearProgress from '@material-ui/core/LinearProgress';

export default function Main() {

  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.palette.content.padding,
      backgroundColor: theme.palette.content.backgroundColor,
      height: theme.palette.content.height,
      color: theme.palette.content.color,
    },
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
    progress: {

    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>     
      <Grid container spacing={1} >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
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
                20%
              </Typography>
              <LinearProgress variant="determinate" value={80} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
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
                  20%
                </Typography>
                <Typography className={classes.percent} variant="button">
                  2T
                </Typography>
              </div>
              <LinearProgress variant="determinate" value={80} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <div className={classes.content} >
                <Typography className={classes.name} variant="h4">
                  MEMORY
                </Typography>
                <Avatar aria-label="recipe" className={classes.avater}>
                  <MemoryIcon/>
                </Avatar>
              </div>
              
              <div className={classes.content} >
                <Typography className={classes.percent} variant="h6">
                  20%
                </Typography>
                <Typography className={classes.percent} variant="button">
                  16G
                </Typography>
              </div>
              <LinearProgress variant="determinate" value={80} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <div className={classes.content} >
                <Typography className={classes.name} variant="h4">
                  ON
                </Typography>
                <Avatar aria-label="recipe" className={classes.avater}>
                  <FlipCameraAndroidIcon/>
                </Avatar>
              </div>
              <div className={classes.content} >
                <Typography className={classes.percent} variant="h6">
                  177H
                </Typography>
                <Typography className={classes.percent} variant="button">
                  2020-05-27
                </Typography>
              </div>
              <LinearProgress variant="determinate" value={100} />
            </CardContent>
          </Card>
        </Grid>
        

      </Grid>
      

    </div>
  );
}


