import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import { Divider, Drawer } from '@material-ui/core';

import { PostAdd, Dashboard, People, Comment, LocalOffer } from '@material-ui/icons';

import Nav from './components/nav/Nav'
import Profile from './components/profile/Profile'

import MenuContext from "../../context/MenuContext";


export default function Sidebar(props) {

  const { onTab, handleOnTab } = useContext(MenuContext);

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
    drawerBorder:{
      border: "none"
    },
    nav: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1)
    }
  }));

  const { open, variant, onClose } = props;

  const classes = useStyles();
  
  const dashboard = [
    {
      title: '접속 통계',
      href: '/dashboard'
    },
  ];

  const post = [
    {
      title: '글 관리',
      href: '/post'
    },
    {
      title: '카테고리 관리',
      href: '/category'
    },
  ];

  const comment = [
    {
      title: '댓글 관리',
      href: '/comment'
    },
    {
      title: '설정',
      href: '/commentsetup'
    },    
  ];

  const tag = [
    {
      title: '태그 관리',
      href: '/tag'
    },
  ];

  const user = [
    {
      title: '사용자 관리',
      href: '/user'
    },
  ];
  

  const [expanded, setExpanded] = React.useState(onTab);

  const handleChange = (panel) => (event, isExpanded) => {
    handleOnTab(panel);
    setExpanded(isExpanded ? panel : "");
  };

  return (
    <Drawer
      anchor="left"
      classes={
        { 
          paper: classes.drawer, 
          paperAnchorDockedLeft: classes.drawerBorder
        }
      }
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
            pages={dashboard} 
            icon={<Dashboard/>} 
            expanded={expanded === '대시보드'} 
            onChange={handleChange('대시보드')} 
          />
          <Nav 
            title="포스트" 
            pages={post} 
            icon={<PostAdd/>} 
            expanded={expanded === '포스트'} 
            onChange={handleChange('포스트')} 
          />
          <Nav 
            title="댓글" 
            pages={comment} 
            icon={<Comment/>} 
            expanded={expanded === '댓글'} 
            onChange={handleChange('댓글')} 
          />
          <Nav 
            title="태그" 
            pages={tag} 
            icon={<LocalOffer/>} 
            expanded={expanded === '태그'} 
            onChange={handleChange('태그')} 
          />
          <Nav 
            title="사용자" 
            pages={user} 
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