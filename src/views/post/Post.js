import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';

import Category from '../../components/category/CategoryPost'

import { ApiAsync, Axios, Backdrop } from '../../service/api/ApiService';


export default function Post() {

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
      <Grid container spacing={2} >

        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Category data={data}/>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Category data={data}/>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <Category data={data}/>
        </Grid>
      </Grid>
      
    </div>
  );
}


