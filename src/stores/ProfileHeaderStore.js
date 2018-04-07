import {observable} from 'mobx';
import timerStore from 'Stores/TimerStore';

class ProfileHeaderStore {

    @observable timeRunning = false;

    constructor() {
        this.timeRunning = false;
    }

    /*toggleTimer = (user) => {
        this.timeRunning = !this.timeRunning;
        if (this.timeRunning) {
            timerStore.startTimer(user);
        } else {
            timerStore.stopTimer(user);
        }
    }*/

    getSpinnerColor = (time) => {
        if (time > 60) {
            return '#f44141';
        } else if (time > 45) {
            return '#f4c242';
        } else {
            return '#4ff441';
        }
    }

    startTimer = () => {
        this.timeRunning = true;
    };

    stopTimer = () => {
        this.timeRunning = false;
    };
}

export default new ProfileHeaderStore();
