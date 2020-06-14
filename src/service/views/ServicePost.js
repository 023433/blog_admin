import { Axios } from '../api/ApiService';

async function getPosts(no) {
  let data = {}

  if(no !== undefined && no !== "NaN" && no > 0){
    data.pageNo = no
  }

  const response = await Axios.get(
    '/posts',
    {params: data}
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


export { getPosts, getCategory };