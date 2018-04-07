import {observable} from 'mobx';

class SnackbarStore {

    @observable displayToast = false;

    constructor() {
        this.toastMessage = "";
    }

    showMessage = (message) => {
        this.toastMessage = message;
        this.displayToast = true;
    };

    close = () => {
        this.displayToast = false;
        this.toastMessage = "";
    };
}

export default new SnackbarStore();
