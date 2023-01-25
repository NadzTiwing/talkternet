import axios from "axios";
import { parse, stringify } from "qs";

const axiosConfig = axios.create({
    baseURL: 'http://10.0.2.2:5000',
    paramsSerializer: {
        encode: parse,
        serialize: stringify
    },
    timeout: 60000 // request timeout
});

// request interceptor
axiosConfig.interceptors.request.use(async(config) => {
        return config;
    }, (error) => {
       // console.log("Error in request interceptor: " +error);
        return Promise.reject(error);
    }
);

// response interceptor
axiosConfig.interceptors.response.use((response) => {
        //console.log("REPONSE INTERCEPTOR:" +response);
        return response;
    }, (error) => {
        //console.log("Error in response interceptor: " +error);
        return Promise.reject(error);
    }
);

export default axiosConfig;