import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

export default function Search(props) {

  const useStyles = makeStyles(theme => ({
    paper: {
      backgroundColor: theme.palette.content.item.backgroundColor,
      color: theme.palette.content.item.color,
      padding: `${theme.spacing(1)}px`,
      display: "flex"
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

    <Paper elevation={1} className={classes.paper}>
      <InputBase 
        className={classes.input}
        id="outlined-basic" 
        placeholder="검색어를 입력하세요."
        fullWidth 
        variant="filled"
        name="search"
        defaultValue={props.title}
        />
      <IconButton type="submit" className={classes.icon}>
        <SearchIcon/>
      </IconButton>
    </Paper>
  )
}

Search.propTypes = {
  title: PropTypes.string
}
