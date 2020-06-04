import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { List, ListItem, ListItemText } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

export default function Database(props) {

  const useStyles = makeStyles(theme => ({
    content: {
      display: "flex",
      justifyContent: "space-between",
    },
    card: {
      backgroundColor: theme.palette.dashboard.card.backgroundColor,
    },
    flexGrow: {
      flexGrow: 1
    },
    list: {
      display: "flex",
      minHeight: "300px",
      maxHeight: "300px",
      overflow: 'auto',
      marginTop: theme.spacing(1),
      color: theme.palette.dashboard.card.icon.color,
    },
    name: {
      color: theme.palette.dashboard.card.color,
      fontWeight: 700,
    },
    typography: {
      color: theme.palette.dashboard.card.color,
      fontWeight: 500,
    },
    root: {
      width: '100%',
      color: theme.palette.dashboard.card.color,
    },
    size: {
      backgroundColor: theme.palette.content.badge.backgroundColor,
      color: theme.palette.content.badge.color,
      padding: "5px",
      display: "flex",
      position: "relative",
      alignItems: "center",
      flexShrink: 0,
      lineHeight: 1,
      borderRadius: "5px",
      justifyContent: "center",
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

  const classes = useStyles();


  const getResultSize = (bytes) => {
    var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var e = Math.floor(Math.log(bytes)/Math.log(1024));
  
    if(e === "-Infinity") {
      return "0 " + s[0]; 
    } else {
      return (bytes/Math.pow(1024, Math.floor(e))).toFixed(0) + " " + s[e];
    }
  }


  let sum = 0;

  let listItems = props.data.map(item => {
    sum += item.size;

    return(
    <ListItem button className={classes.nested} key={item.name}>
      <FiberManualRecordIcon style={{width: "6px", marginRight: "3px"}}/>
      <ListItemText primary={item.name} />
      <div className={classes.flexGrow} />
      <Typography className={classes.size} variant="subtitle2">
        {getResultSize(item.size)}
      </Typography>

    </ListItem>
  )});


  return (
    <Card elevation={0} className={classes.card}>
      <CardContent>
        <div className={classes.content} >
          <Typography className={classes.name} variant="h4">
            DB 사용량
          </Typography>
          
        </div>
        <div className={classes.list} >

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            <ListItem button >
              <Typography className={classes.typography} variant="h6">
                - Blog
              </Typography>
              <div className={classes.flexGrow} />
              <Typography className={classes.size} variant="subtitle2">
                {getResultSize(sum)}
              </Typography>
            </ListItem>
            <Collapse in={true}  timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {listItems}
              </List>
            </Collapse>
          </List>

        </div>
      </CardContent>
    </Card>
  );


}