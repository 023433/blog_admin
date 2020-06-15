import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';

import Category from '../../components/post/Category'
import Search from '../../components/post/Search'
import ButtonGroup from '../../components/post/ButtonGroup'
import Content from '../../components/post/Content'
import Pagination from '../../components/post/Pagination'

import { ApiAsync, Backdrop } from '../../service/api/ApiService';
import { useLocation} from "react-router";
import QueryString from "query-string";

import { getPosts, getCategory } from '../../service/views/ServicePost';

export default function Post(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.palette.content.padding,
      backgroundColor: theme.palette.content.backgroundColor,
      height: theme.palette.content.height,
      color: theme.palette.content.color,
      minHeight: theme.palette.content.minHeight,
    },
  }));

  const classes = useStyles();

  const location = useLocation();
  const path = location.pathname.replace("/", "");
  const queryParam = props.location.query;
  const queryString = QueryString.parse(props.location.search);

  let no = 0;
  let search = "";
  let category = "";

  if(queryParam !== undefined){
    no = queryParam.page - 1;
  }  
  
  if(queryString !== undefined){
    no = queryString.page - 1;
    search = queryString.search;
    category = queryString.category;
  }  

  const [stateCategory] = ApiAsync(getCategory, []);
  const [statePost] = ApiAsync(() => getPosts(no), [no]);

  if(stateCategory.isLoading 
    || statePost.isLoading){

    return (<Backdrop/>)
  }

  if(statePost.data != null){
    statePost.data.pageable["totalPages"] = statePost.data.totalPages
  }

  delete queryString["page"];

  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Category data={stateCategory.data} selected={category}/>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Search title={search}/>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
            <ButtonGroup/>
          </Grid>
        </Grid>
        
        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Content data={statePost.data.content}/>
          </Grid>
        </Grid>

        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Pagination pageable={statePost.data.pageable} path={path} search={queryString}/>
          </Grid>
        </Grid>
      </form>
      
    </div>
  );
}


