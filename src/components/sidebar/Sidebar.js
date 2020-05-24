import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import { Divider, Drawer } from '@material-ui/core';

import { PostAdd, Dashboard, People, Comment, LocalOffer } from '@material-ui/icons';

import Nav from './components/nav/Nav'
import Profile from './components/profile/Profile'
export default function Sidebar(props) {

  const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.sidebar.backgroundColor,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(2)
    },
    drawer: {
      width: 240,
      [theme.breakpoints.up('lg')]: {
        marginTop: 64,
        height: 'calc(100% - 64px)'
      },
    },
    nav: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  }));

  const { open, variant, onClose } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard'
    },
    {
      title: 'Users',
      href: '/users'
    },
  ];

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div className={classes.root}>
        <Profile name="Admin" avatar="" bio="Admin"/>
        <Divider />

        <div className={classes.nav}>
          <Nav 
            title="대시보드" 
            pages={pages} 
            icon={<Dashboard/>} 
            expanded={expanded === '대시보드'} 
            onChange={handleChange('대시보드')} 
          />
          <Nav 
            title="포스트" 
            pages={pages} 
            icon={<PostAdd/>} 
            expanded={expanded === '포스트'} 
            onChange={handleChange('포스트')} 
          />
          <Nav 
            title="댓글" 
            pages={pages} 
            icon={<Comment/>} 
            expanded={expanded === '댓글'} 
            onChange={handleChange('댓글')} 
          />
          <Nav 
            title="태그" 
            pages={pages} 
            icon={<LocalOffer/>} 
            expanded={expanded === '태그'} 
            onChange={handleChange('태그')} 
          />
          <Nav 
            title="사용자" 
            pages={pages} 
            icon={<People/>} 
            expanded={expanded === '사용자'} 
            onChange={handleChange('사용자')} 
          />

        </div>

        <Divider />
      </div>
    </Drawer>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};