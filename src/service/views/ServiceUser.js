import { Axios } from '../api/ApiService';

async function getUsers(no, search) {
  let data = {}

  if(no !== undefined && no !== "NaN" && no > 0){
    data.pageNo = no
  }

  if(search !== undefined && search !== ""){
    data.search = search
  }
  
  const response = await Axios.get(
    '/admin/tags',
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

export { getUsers };