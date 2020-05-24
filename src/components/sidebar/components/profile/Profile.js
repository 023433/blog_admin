import React from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

export default function Profile(props) {

  const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      padding: "10px",
      flexDirection: 'column',
      alignItems: 'center',
      minHeight: 'fit-content'
    },
    avatar: {
      width: 60,
      height: 60
    },
    name: {
      marginTop: theme.spacing(1),
      color: theme.palette.sidebar.nav.color,
    },
    bio: {
      color: theme.palette.sidebar.nav.color,
    }
  }));

  const classes = useStyles();

  const { name, avatar, bio } = props;


  return (
    <div className={classes.root}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {name}
      </Typography>
      <Typography className={classes.bio} variant="body2">{bio}</Typography>
    </div>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired, 
  avatar: PropTypes.string.isRequired, 
  bio: PropTypes.string.isRequired
};

