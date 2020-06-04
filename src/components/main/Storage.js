import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { List, ListItem } from '@material-ui/core';

export default function Storage(props) {

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

  return (
    <Card elevation={0} className={classes.card}>
      <CardContent>
        <div className={classes.content} >
          <Typography className={classes.name} variant="h4">
            HDD 사용량
          </Typography>
          
        </div>
        <div className={classes.list} >

          <List
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            {
              Object.entries(props.data).map(([key,value])=>{
                console.log(key,value);
                return (
                  <ListItem button key={key} >
                    <Typography className={classes.typography} variant="h6">
                      - {key}
                    </Typography>
                    <div className={classes.flexGrow} />
                    <Typography className={classes.size} variant="subtitle2">
                      {getResultSize(value)}
                    </Typography>
                  </ListItem>
                )
              })
            }
            
          </List>

        </div>
      </CardContent>
    </Card>
  );


}