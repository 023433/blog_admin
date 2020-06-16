import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';
import QueryString from "query-string";

import Add from '../../components/views/category/Add'
import Search from '../../components/search/Search'
import ButtonGroup from '../../components/views/category/ButtonGroup'
import Content from '../../components/views/category/Content'

import { ApiAsync, Backdrop } from '../../service/api/ApiService';
import { getCategory } from '../../service/views/ServiceCategory';

export default function ViewCategory(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.palette.content.padding,
      backgroundColor: theme.palette.content.backgroundColor,
      height: theme.palette.content.height,
      color: theme.palette.content.color,
      minHeight: theme.palette.content.minHeight,
    },
  }));

  const queryString = QueryString.parse(props.location.search);

  let search = "";

  if(queryString !== undefined){
    search = queryString.search;
  }  

  const classes = useStyles();

  const [state] = ApiAsync(() => getCategory(search), [search]);
  const { isLoading, data } = state;


  if(isLoading){
    return (<Backdrop/>)
  }

  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Add data={data}/>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Search title={search}/>
          </Grid>
          <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <ButtonGroup/>
          </Grid>
        </Grid>
        
        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Content data={data}/>
          </Grid>
        </Grid>
      </form>
      
    </div>
  );
}


