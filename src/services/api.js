import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.1.111:3333',
});
api.defaults.timeout = 5000;
export default api;