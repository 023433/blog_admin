import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

import Brightness2RoundedIcon from '@material-ui/icons/Brightness2Rounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';

import LogoSamll from '../svg/logo/small';

import MenuContext from "../../context/MenuContext";
import { PropertyMenu } from '../../context/PropertyMenu';
import { Cookies } from '../../service/ApiService';
import { Cookie } from '../../service/api/enum/Cookie';


export default function Header(props) {

  const useStyles = makeStyles(theme => ({
    logoFirst: {
      fill: theme.palette.logo.first.fill
    },
    logoSecond: {
      fill: theme.palette.logo.second.fill
    },
    header: {
      backgroundColor: theme.palette.header.backgroundColor
    },
    icon: {
      color: theme.palette.header.icon.color,
    },
    badge: {
      "& .MuiBadge-badge":{
        backgroundColor: theme.palette.header.badge.backgroundColor,
        color: theme.palette.header.badge.color
      }
    },
    root: {
      boxShadow: 'none'
    },
    flexGrow: {
      flexGrow: 1
    },
    signOutButton: {
      marginLeft: theme.spacing(1)
    }
  }));

  const { onSidebarOpen } = props;
  const { theme, toggleTheme } = useContext(MenuContext);

  const classes = useStyles();
  const history = useHistory();

  const signout = () => {
    Cookies.remove(Cookie.STR_TOKEN);
    history.push("/signin");
    window.location.reload()
  }
  
  return (
    <AppBar>
      <Toolbar className={classes.header} >
        <div style={{maxWidth:"45px", minHeight:"45px", minWidth:"45px", maxHeight:"45px"}}> 
          <RouterLink to="/">
            <LogoSamll 
              first={classes.logoFirst} 
              second={classes.logoSecond} />
          </RouterLink>
        </div>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton className={classes.icon}>
            <Badge
              className={classes.badge} 
              badgeContent={100} 
              max={99} 
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            className={classes.icon}
            color="inherit"
            onClick={toggleTheme}
          >
            {theme===PropertyMenu.Dark? <WbSunnyRoundedIcon /> : <Brightness2RoundedIcon />}
          </IconButton>

          <IconButton
            className={classes.icon}
            color="inherit"
            onClick={signout}
          >
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onSidebarOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired
};