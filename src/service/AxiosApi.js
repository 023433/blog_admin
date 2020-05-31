import Axios from 'axios';
import Cookies from 'js-cookie';

let apiUrl = "";

if(process.env.NODE_ENV === "production"){
    apiUrl = "https://api.devj.io";
}else{
    apiUrl = "http://localhost:8080";
    // apiUrl = "http://192.168.0.154:8080";
}

const instance = Axios.create({
    baseURL: apiUrl
});

// Alter defaults after instance has been created
instance.defaults.headers.common['X-Auth-Token'] = Cookies.get("X_AUTH_TOKEN");

export default instance;