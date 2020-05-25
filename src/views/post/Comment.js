import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

export default function Comment() {
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
      Comment content
    </div>
  );
}


