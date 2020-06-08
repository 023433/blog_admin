import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';

import Category from '../../components/category/Add'
import Search from '../../components/category/Search'
import ButtonGroup from '../../components/category/ButtonGroup'
import Content from '../../components/category/Content'
import Pagination from '../../components/category/Pagination'

import { ApiAsync, Axios, Backdrop } from '../../service/api/ApiService';

export default function ViewCategory() {
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
// eslint-disable-next-line
const [state, dispatch] = ApiAsync(getCategory, []);
const { isLoading, data } = state;

async function getCategory() {
  const response = await Axios.get(
    '/categories',
  ).catch(error => {
    console.log(error);
  });

  if(response === undefined){
    return;
  }

  if(response.status === 200){
    return response;
  }
}

if(isLoading){
  return (<Backdrop/>)
}

return (
  <div className={classes.root}>
    <form>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Category data={data}/>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Search title={"data"}/>
        </Grid>
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <ButtonGroup/>
        </Grid>
      </Grid>
      
      <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Content/>
        </Grid>
      </Grid>

      <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Pagination/>
        </Grid>
      </Grid>
    </form>
    
  </div>
);
}


