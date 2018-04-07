import axios from 'axios';
import {APPLICATION_CLIENT} from '../constants'

const instance = axios.create({
    //dev
    baseURL: "https://api.hackmydaily.xyz:1446/"/*,
    headers: {'client': APPLICATION_CLIENT}*/
});

export const setAuthToken = (token) => {
    if (token !== null) {
        instance.defaults.headers.common.Authorization = "Token " + token;
    }
};

export const removeAuthToken = () => {
    delete instance.defaults.headers.common.Authorization;
};

export default instance;
