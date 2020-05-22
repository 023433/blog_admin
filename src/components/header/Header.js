import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import PropTypes from 'prop-types';

import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

import Brightness2RoundedIcon from '@material-ui/icons/Brightness2Rounded';
import WbSunnyRoundedIcon from '@material-ui/icons/WbSunnyRounded';

import LogoSamll from '../svg/logo/small';


export default function Header(props) {

  const useStyles = makeStyles(theme => ({
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

  const { currentTheme, toggleTheme, onSidebarOpen } = props;

  const [theme, setTheme] = React.useState(currentTheme);

  const classes = useStyles();

  const themeChange = () => {
    toggleTheme()
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <AppBar>
      <Toolbar>
        <div style={{maxWidth:"45px", minHeight:"45px", minWidth:"45px", maxHeight:"45px"}}> 
          <RouterLink to="/">
            <LogoSamll 
              logoFirst={classes.logoFirst} 
              logoSecond={classes.logoSecond} />
          </RouterLink>
        </div>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={themeChange}
          >
            {theme==="dark"? <WbSunnyRoundedIcon /> : <Brightness2RoundedIcon />}
          </IconButton>

          <IconButton
            className={classes.signOutButton}
            color="inherit"
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
  currentTheme: PropTypes.string.isRequired, 
  toggleTheme: PropTypes.func.isRequired, 
  onSidebarOpen: PropTypes.func.isRequired
};