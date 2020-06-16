import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import AddIcon from '@material-ui/icons/Add';

export default function Add(props) {

  const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor: theme.palette.content.item.backgroundColor,
      color: theme.palette.content.item.color,
      padding: `${theme.spacing(1)}px`,
      display: "flex",
    },
    icon: {
      color: theme.palette.content.item.icon.color,
    },
    input: {
      color: theme.palette.content.item.color,
      "& ::placeholder": {
        color: theme.palette.content.item.color,
      },
      "& .MuiInput-underline:before": {
        borderBottom: "none",
      },
      "& .MuiInput-underline:after": {
        borderBottom: "none",
      },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottom: "none",
      },
    }

  }));

  const classes = useStyles();

  return (

      <Paper elevation={1} className={classes.paper}>
        <InputBase 
          className={classes.input}
          id="outlined-basic" 
          placeholder="카테고리를 입력하세요."
          fullWidth 
          variant="filled"
          />
        <IconButton className={classes.icon}>
          <AddIcon/>
        </IconButton>
      </Paper>

    
  )
}