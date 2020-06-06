import { Axios } from '../api/ApiService';

const getDataCpu = async () => {
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

const getDataDatabase = async () => {
  const response = await Axios.get(
    '/actuator/sysinfo/db'
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


const getDataStorage = async () => {

  const params = new URLSearchParams();
  params.append('dir', "/home/devj/nginx/html");
  params.append('dir', "/upload/post");
  params.append('dir', "/upload/temp");

  const response = await Axios.get(
    '/actuator/sysinfo/storage',
    {'params': params},      
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


const getDataTotalMemory = async () => {

  const response = await Axios.get(
    '/actuator/metrics/os.memory.total'
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


const getDataFreeMemory = async () => {

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

const getHddData = async () => {
  const response = await Axios.get(
    '/actuator/health'
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



const getDataStartup = async () => {
  const response = await Axios.get(
    '/actuator/metrics/os.uptime'
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

const getResultSize = (bytes) => {
  var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  var e = Math.floor(Math.log(bytes)/Math.log(1024));

  if(e === "-Infinity") {
    return "0 " + s[0]; 
  } else {
    return (bytes/Math.pow(1024, Math.floor(e))).toFixed(0) + " " + s[e];
  }
}

    

export { getDataCpu, getDataDatabase, getDataStorage, getDataTotalMemory, getDataFreeMemory, getHddData, getDataStartup, getResultSize };