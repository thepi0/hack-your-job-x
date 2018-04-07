import {observable} from 'mobx';
import moment from 'moment'; // eslint-disable-line no-unused-vars

class TimerStore {

    @observable seconds = 0;
    @observable user = null;
    @observable timer;
    @observable timer_running = false;
    @observable today = new Date();

    constructor() {
        this.seconds = 0;
    }

    getDate = () => {
        return moment(this.today).lang('fi').format('dddd DD.MM');
    }

    getTime = () => {
        return moment(this.today).lang('fi').format('H:mm');
    }

    addSecond = () => {
        this.seconds += 1;
        this.user.updateTimeSpent(this.seconds);
    }

    startTimer = (user) => {
        this.seconds = user.time_spent;
        this.user = user;
        this.timer = setInterval(this.addSecond, 1000);
        this.timer_running = true;
    }

    stopTimer = (user) => {
        user.updateTimeSpent(this.seconds);
        clearInterval(this.timer);
        this.user = null;
        this.timer_running = false;
    }

    clearTimer = (user) => {
        if (this.user) {
            this.user.updateTimeSpent(this.seconds);
            this.user = null;
        }
        this.timer_running = false;
        this.seconds = 0;
        clearInterval(this.timer);
    }
}

export default new TimerStore();
