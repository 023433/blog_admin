import { Axios } from '../api/ApiService';

async function getCategory(search) {
  let data = {}

  if(search !== undefined && search !== ""){
    data.search = search
  }
  
  const response = await Axios.get(
    '/categories',
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

export { getCategory };