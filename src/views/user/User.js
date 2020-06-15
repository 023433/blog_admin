import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';

import Search from '../../components/tag/Search'
import ButtonGroup from '../../components/tag/ButtonGroup'
import Content from '../../components/tag/Content'
import Pagination from '../../components/tag/Pagination'
import { useLocation} from "react-router";
import { ApiAsync, Backdrop } from '../../service/api/ApiService';
import QueryString from "query-string";
import { getUsers } from '../../service/views/ServiceUser';

export default function User(props) {
  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.palette.content.padding,
      backgroundColor: theme.palette.content.backgroundColor,
      height: theme.palette.content.height,
      color: theme.palette.content.color,
    },
    container: {
      display: 'grid',
      gridGap: theme.spacing(1),
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

  const [state] = ApiAsync(() => getUsers(no, search), [no, search]);
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
        <Grid container direction="row" spacing={2} >

          <Grid 
            className={classes.container}
            container 
            direction="column" 
            item xs={12} sm={12} md={7} lg={7} xl={7}>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Search title={search}/>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <ButtonGroup/>
              </Grid>
            </Grid>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Content data={data.content}/>
              </Grid>
              <Grid item xs={12}>
                <Pagination pageable={data.pageable} path={path} search={queryString}/>
              </Grid>
            </Grid>
 
          </Grid>
          

          <Grid 
            container 
            direction="row"
            justify="flex-start"
            alignItems="flex-start" 
            className={classes.container}
            item xs={12} sm={12} md={5} lg={5} xl={5}>

            <Grid item xs={12}>
              <Content data={data.content}/>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Search title={search}/>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <ButtonGroup/>
              </Grid>
            </Grid>
          </Grid>
   
        </Grid>
        

      </form>
    </div>
  );
}


