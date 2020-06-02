import React, { useEffect } from 'react';
import { ApiAsync, Axios, Backdrop } from '../service/ApiService';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';

import Cpu from '../components/main/Cpu';
import Hdd from '../components/main/Hdd';
import Memory from '../components/main/Memory';
import Startup from '../components/main/Startup';

import CpuChart from '../components/main/CpuChart';
import MemoryChart from '../components/main/MemoryChart';


export default function Main() {

  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.palette.content.padding,
      backgroundColor: theme.palette.content.backgroundColor,
      height: theme.palette.content.height,
      color: theme.palette.content.color,
    },
  }));


  const classes = useStyles();
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatchCpu();
      dispatchMemory();
    }, 5000);
    return () => clearInterval(interval);
  });

  const [total, setTotal] = React.useState(0);
  const [stateCpu, dispatchCpu] = ApiAsync(() => getDataCpu(), []);
  const [stateMemory, dispatchMemory] = ApiAsync(() => getDataMemory(), []);

  const dataCpu = stateCpu.data;
  const isLoadingCpu = stateCpu.isLoading;

  async function getDataCpu() {
    const response = await Axios.get(
      '/actuator/metrics/system.cpu.usage'
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

  if(isLoadingCpu){
    return (<Backdrop/>)
  }

  const percentCpu = parseInt(dataCpu.measurements[0].value * 100);

  const isLoadingMemory = stateMemory.isLoading;
  const dataMemory = stateMemory.data;

  async function getDataMemory() {

    if(total === 0){
      const response = await Axios.get(
        '/actuator/metrics/os.memory.total'
      ).catch(error => {
        console.log(error);
      });

      if(response === undefined){
        return;
      }

      if(response.status === 200){
        setTotal(Math.round(response.data.measurements[0].value))

      }
    }

    const response = await Axios.get(
      '/actuator/metrics/os.memory.free'
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

  if(isLoadingMemory){
    return (<Backdrop/>)
  }

  const free = parseInt(dataMemory.measurements[0].value);
  let percentMemory = Math.round((total - free) / total * 100);

  return (
    <div className={classes.root}>     
      <Grid container spacing={1} >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Cpu percent={percentCpu}/>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Hdd/>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Memory percent={percentMemory} total={total}/>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Startup/>
        </Grid>

      </Grid>

      <Grid container spacing={1} >
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CpuChart percent={percentCpu}/>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <MemoryChart percent={percentMemory} total={total}/>
        </Grid>
      </Grid>

    </div>
  );
}


