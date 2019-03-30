import axios from 'axios';
import store from '@/store/store';

export default () => {
    return axios.create({
        baseURL: `https://formulaire-ser.herokuapp.com/`,
        // baseURL: `http://localhost:8081/`,
        headers: {
            Authorization: `Bearer ${store.state.token}`
        }
    });
};