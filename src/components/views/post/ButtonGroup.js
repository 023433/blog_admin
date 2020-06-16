import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
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
    flexGrow: {
      padding: `${theme.spacing(1)}px`,
      flexGrow: 1
    },
    icon: {
      color: theme.palette.content.item.icon.color,
    },
    input: {
      color: theme.palette.content.item.color,
      "& ::placeholder": {
        color: theme.palette.content.item.color,
      },
    }
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
      <div className={classes.flexGrow} />

      <Button
        variant="contained"
        className={classes.button}
        startIcon={<LockOpenIcon className={classes.icon}/>}
      >
        공개
      </Button>
      <div className={classes.flexGrow} />

      <Button
        variant="contained"
        className={classes.button}
        startIcon={<LockIcon className={classes.icon}/>}
      >
        비공개
      </Button>
    </div>
  )
}
