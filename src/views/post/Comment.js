import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import { useLocation} from "react-router";
import QueryString from "query-string";

import Category from '../../components/views/post/Category'
import Search from '../../components/search/Search'
import Pagination from '../../components/pagination/Pagination'
import Post from '../../components/views/comment/Post'
import CommentList from '../../components/views/comment/Comment'

import { ApiAsync, Backdrop } from '../../service/api/ApiService';
import { getPosts, getCategory } from '../../service/views/ServicePost';


export default function Comment(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.palette.content.padding,
      backgroundColor: theme.palette.content.backgroundColor,
      height: theme.palette.content.height,
      color: theme.palette.content.color,
    },
    container: {
      marginTop: theme.spacing(1),
    },
  }));
  console.log(props.location.search);

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
        <Grid container direction="row" spacing={2} >

          <Grid 
            container 
            direction="column" 
            item xs={12} sm={12} md={5} lg={5} xl={5}>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Search title={search}/>
              </Grid>
              <Grid item xs={12}>
                <Category data={stateCategory.data} selected={category}/>
              </Grid>
            </Grid>
            
            
            <Grid className={classes.container} container spacing={2}>
              <Grid item xs={12}>
                <Post data={statePost.data.content}/>
              </Grid>
              <Grid item xs={12}>
                <Pagination pageable={statePost.data.pageable} path={path} search={queryString}/>
              </Grid>
            </Grid>
 
          </Grid>
          

          <Grid 
            container 
            direction="row"
            justify="flex-start"
            alignItems="flex-start" 
            item xs={12} sm={12} md={7} lg={7} xl={7}>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <CommentList data={statePost.data.content}/>
              </Grid>
              <Grid item xs={12}>
                <Pagination pageable={statePost.data.pageable} path={path} search={queryString}/>
              </Grid>
            </Grid>

          </Grid>
   
        </Grid>
        

      </form>
    </div>
  );
}


