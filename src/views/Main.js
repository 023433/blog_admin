import React, { useEffect } from 'react';
import { ApiAsync, Backdrop } from '../service/api/ApiService';
import makeStyles from '@material-ui/core/styles/makeStyles';

import Grid from '@material-ui/core/Grid';

import { 
  getDataCpu, 
  getDataDatabase, 
  getDataStorage, 
  getDataTotalMemory, 
  getDataFreeMemory, 
  getDataStartup, 
  getHddData 
} from '../service/views/ServiceMain';

import Cpu from '../components/views/main/Cpu';
import Hdd from '../components/views/main/Hdd';
import Memory from '../components/views/main/Memory';
import Startup from '../components/views/main/Startup';

import CpuChart from '../components/views/main/CpuChart';
import MemoryChart from '../components/views/main/MemoryChart';
import Database from '../components/views/main/Database';
import Storage from '../components/views/main/Storage';


export default function Main() {

  const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.palette.content.padding,
      backgroundColor: theme.palette.content.backgroundColor,
      height: theme.palette.content.height,
      color: theme.palette.content.color,
      minHeight: theme.palette.content.minHeight,
    },
    content: {
      marginTop: theme.spacing(1),
    }
  }));


  const classes = useStyles();
  
  useEffect(() => {
    const interval = setInterval(() => {
      dispatchCpu();
      dispatchFreeMemory();
    }, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatchHdd();
    }, 10000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      dispatchStartup();
    }, 36000);
    return () => clearInterval(interval);
  });

  const [stateStartup, dispatchStartup] = ApiAsync(() => getDataStartup(), []);
  const [stateCpu, dispatchCpu] = ApiAsync(() => getDataCpu(), []);
  const [stateTotalMemory] = ApiAsync(() => getDataTotalMemory(), []);
  const [stateFreeMemory, dispatchFreeMemory] = ApiAsync(() => getDataFreeMemory(), []);
  const [stateHdd, dispatchHdd] = ApiAsync(() => getHddData(), []);
  const [stateDatabase] = ApiAsync(() => getDataDatabase(), []);
  const [stateStorage] = ApiAsync(() => getDataStorage(), []);

  if(stateCpu.isLoading
      || stateTotalMemory.isLoading
      || stateFreeMemory.isLoading
      || stateDatabase.isLoading
      || stateStorage.isLoading
      || stateStartup.isLoading
      || stateHdd.isLoading){

    return (<Backdrop/>)
  }

  const dataCpu = stateCpu.data;
  const percentCpu = parseInt(dataCpu.measurements[0].value * 100);

  const dataFreeMemory = stateFreeMemory.data;
  const dataTotalMemory = stateTotalMemory.data;

  const freeMemory = parseInt(dataFreeMemory.measurements[0].value);
  const totalMemory = parseInt(dataTotalMemory.measurements[0].value);
  const percentMemory = Math.round((totalMemory - freeMemory) / totalMemory * 100);

  const dataDatabase = stateDatabase.data;
  const dataStorage = stateStorage.data;

  const disk = stateHdd.data.components.diskSpace.details;
  const freeHdd = disk.free;
  const totalHdd = disk.total;

  const startupDate = stateStartup.data.measurements[0].value;

  return (
    <div className={classes.root}>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Cpu percent={percentCpu}/>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Hdd total={totalHdd} free={freeHdd} />
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Memory percent={percentMemory} total={totalMemory}/>
        </Grid>

        <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
          <Startup dateTime={startupDate}/>
        </Grid>

      </Grid>

      <Grid container spacing={2} className={classes.content}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CpuChart percent={percentCpu}/>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <MemoryChart percent={percentMemory} total={totalMemory}/>
        </Grid>
      </Grid>

      <Grid container spacing={2} className={classes.content}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Database data={dataDatabase}/>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <Storage data={dataStorage}/>
        </Grid>
      </Grid>

    </div>
  );
}


