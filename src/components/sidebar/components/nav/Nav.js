import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import { NavLink as RouterLink } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Collapse } from '@material-ui/core';

import { ExpandMore, NavigateNext } from '@material-ui/icons';

export default function Nav(props) {

  const useStyles = makeStyles(theme => ({
    root: {
      paddingBottom: "0",
      paddingTop: "0"
    },
    list: {
      display: 'flex',
      alignItems: "center",
      borderRadius: "6px",
      paddingLeft: "6px",
      paddingRight: "3px",
    },
    listText: {
      display: 'flex',
      alignItems: "center",

      "& .MuiListItemText-primary": {
        fontSize: "15px",
        fontWeight: 900,
        color: theme.palette.sidebar.nav.color,
      }
    },
    listIcon: {
      minWidth: "34px",
      color: theme.palette.sidebar.nav.color,
      "& .MuiSvgIcon-root": {
        width: "21px",
      }
    },
    expansionIcon: {
      width: "18px",
      color: theme.palette.sidebar.nav.color,
    },
    item: {
      display: 'flex',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: "6px",
      paddingRight: "3px",
      borderRadius: "6px",
    },
    itemText: {
      paddingLeft: "34px",
      "& .MuiListItemText-primary": {
        fontSize: "13px",
        fontWeight: 600,
        color: theme.palette.sidebar.nav.color,
      }
    },
  }));

  const classes = useStyles();

  const { title, pages, icon, expanded, onChange } = props;

  const handleClick = (event) => {
    onChange(event, title);
  };
  
  const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{ flexGrow: 1 }}
    >
      <RouterLink {...props} />
    </div>
  ));

  return (
    <List className={classes.root}>
      <ListItem  
        button 
        onClick={handleClick}
        key={title}
        className={classes.list}
      >
        <ListItemIcon className={classes.listIcon}>
          {icon}
        </ListItemIcon>

        <ListItemText 
          className={classes.listText}
          primary={title} />

        {
          expanded ? 
           <ExpandMore className={classes.expansionIcon}/>
            : <NavigateNext className={classes.expansionIcon}/> 
        }

      </ListItem >

      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <List component="div" disablePadding>
        {
          pages ? pages.map(page => (
            <ListItem
              button
              className={classes.item}
              key={page.title}
              component={CustomRouterLink}
              to={page.href}
            >
              <ListItemText 
                className={classes.itemText}
                primary={page.title} />
            </ListItem>
          )) : null
        }
          
        </List>
      </Collapse>
      

    </List>
  );
}


Nav.propTypes = {
  title: PropTypes.string.isRequired, 
  pages: PropTypes.array.isRequired, 
  icon: PropTypes.element.isRequired
};

