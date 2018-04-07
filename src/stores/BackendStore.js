import {observable, computed, action} from 'mobx';
import history from '../history';
import axios, {setAuthToken, removeAuthToken} from 'Services/axios';
import store from 'store2';
import snackbarStore from './SnackbarStore';

class BackendStore {
    @observable people = null;

    constructor() {
    }

    @computed get something1() {
        return false;
    }

    @action.bound something2() {

    }

}

const backendStore = new BackendStore();

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {

    if (error.response.status === 400) {
        snackbarStore.showMessage("BOOM! You're f**ked. Evertyhing exploded.");
        backendStore.forceLogOut();
    } else if (error.response.status === 401) {
        snackbarStore.showMessage("No no no no. Not for you!");
        backendStore.forceLogOut();
    }

    return Promise.reject(error);
});


export default backendStore;
