import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ButtonGroup() {

  const useStyles = makeStyles(theme => ({
    paper: {
      display: "flex",
      alignItems: "center",
      height: "100%",

    },
    button: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.content.item.backgroundColor,
      color: theme.palette.content.item.icon.color,
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
    },
    icon: {
      color: theme.palette.content.item.icon.color,
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <Button
        variant="contained"
        className={classes.button}
        startIcon={<DeleteIcon className={classes.icon}/>}
      >
        삭제
      </Button>
    </div>
  )
}
