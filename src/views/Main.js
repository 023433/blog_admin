import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';

import Cpu from '../components/main/Cpu';
import Hdd from '../components/main/Hdd';
import Memory from '../components/main/Memory';
import Startup from '../components/main/Startup';

export default function Main() {

  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.palette.content.padding,
      backgroundColor: theme.palette.content.backgroundColor,
      height: theme.palette.content.height,
      color: theme.palette.content.color,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>     
      <Grid container spacing={1} >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Cpu/>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Hdd/>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Memory/>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Startup/>
        </Grid>

      </Grid>
    </div>
  );
}


