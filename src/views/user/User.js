import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Grid from '@material-ui/core/Grid';
import { useLocation} from "react-router";
import QueryString from "query-string";

import Search from '../../components/search/Search'
import Pagination from '../../components/pagination/Pagination'
import Detail from '../../components/views/user/Detail'
import Form from '../../components/views/user/Form'

import { ApiAsync, Backdrop } from '../../service/api/ApiService';
import { getUsers } from '../../service/views/ServiceUser';

import Button from '@material-ui/core/Button';

export default function User(props) {
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
    paper: {
      display: "flex",
      alignItems: "center",
      height: "100%",
    },
    button: {
      width: "100%",
      height: "100%",
      backgroundColor: theme.palette.content.item.backgroundColor,
      color: theme.palette.content.item.icon.color,
      display: 'flex',
      alignItems: "center",
      justifyContent: "center",
    },
    buttonGroup: {
      marginTop: theme.spacing(1),
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
            container 
            direction="column" 
            item xs={12} sm={12} md={7} lg={7} xl={7}>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                <Search title={search}/>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                <div className={classes.paper}>
                  <Button
                    variant="contained"
                    className={classes.button}
                  >
                    추가
                  </Button>
                </div>
              </Grid>
            </Grid>
            
            
            <Grid className={classes.container} container spacing={2}>
              <Grid item xs={12}>
                <Detail data={data.content}/>
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
            item xs={12} sm={12} md={5} lg={5} xl={5}>

            <Grid item xs={12}>
              <Form data={data.content}/>
              <Grid container spacing={2} className={classes.buttonGroup}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  <div className={classes.paper}>
                    <Button
                      variant="contained"
                      className={classes.button}
                    >
                      저장
                    </Button>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                  
                  <div className={classes.paper}>
                    <Button
                      variant="contained"
                      className={classes.button}
                    >
                      삭제
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>

          </Grid>
   
        </Grid>
        

      </form>
    </div>
  );
}


