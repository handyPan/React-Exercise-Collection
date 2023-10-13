import axios from 'axios';

export default axios.create({
    baseURL:'http://localhost:8080',
    // headers: {"ngrok-skip-browser-warning": "true"}
    // headers: {"Access-Control-Allow-Origin": "*"}
    
    // withCredentials: false,
    // headers: {
    //     'Access-Control-Allow-Origin' : '*',
    //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    //     'Content-Type': 'application/json'
    //     }
});