import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';

import Add from '../../components/tag/Add'
import Search from '../../components/tag/Search'
import ButtonGroup from '../../components/tag/ButtonGroup'
import Content from '../../components/tag/Content'
import Pagination from '../../components/tag/Pagination'
import { useLocation} from "react-router";
import { ApiAsync, Backdrop } from '../../service/api/ApiService';
import QueryString from "query-string";

import { getTags } from '../../service/views/ServiceTag';

export default function Tag(props) {
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

  if(queryParam !== undefined){
    no = queryParam.page - 1;
  }  
  
  if(queryString !== undefined){
    no = queryString.page - 1;
    search = queryString.search;
  }  

  const [state] = ApiAsync(() => getTags(no, search), [no, search]);
  const { isLoading, data } = state;

  if(isLoading){
    return (<Backdrop/>)
  }

  if(data != null){
    data.pageable["totalPages"] = data.totalPages
  }

  delete queryString["page"];

  return (
    <div className={classes.root}>
      <form>
        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <Add/>
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
            <Content data={data.content}/>
          </Grid>
        </Grid>

        <Grid container spacing={2} >
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Pagination pageable={data.pageable} path={path} search={queryString}/>
          </Grid>
        </Grid>
      </form>
      
    </div>
  );
}


