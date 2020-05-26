import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Avatar from '@material-ui/core/Avatar';
import SdStorageIcon from '@material-ui/icons/SdStorage';
import StorageIcon from '@material-ui/icons/Storage';

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
      <Grid/>
      <Typography/>
      <StorageIcon/>
      <Card elevation={0} className={classes.card}>
        <CardContent className={classes.cover}>
        <Avatar aria-label="recipe" className={classes.avatar}>
          <SdStorageIcon/>
        </Avatar>

        </CardContent>
      </Card>

      <Card elevation={0} className={classes.card}>
        <CardContent className={classes.cover}>
        <Avatar aria-label="recipe" className={classes.avatar}>
          <SdStorageIcon/>
        </Avatar>

        </CardContent>
      </Card>
    </div>
  );
}


