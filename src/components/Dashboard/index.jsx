import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import keydown from 'react-keydown';

import ProfileHeader from 'Components/ProfileHeader';
import TaskHandler from 'Components/TaskHandler';
import timerStore from 'Stores/TimerStore';
import userStore from 'Stores/UserStore';

import './Dashboard.css';

@inject('backendStore') @observer
export default class Dashboard extends Component {

    constructor() {
        super();

        this.state = {
            people: null
        };
    }

    @keydown('space')
    submit(event) {
        event.preventDefault();
        console.log('space bar pressed');
        if (!userStore.selectedUser) {
            return;
        }
        if (timerStore.timer_running) {
            timerStore.stopTimer(userStore.selectedUser);
        } else {
            timerStore.startTimer(userStore.selectedUser);
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    someFunction = () => {

    }

    render() {

        return (
            <div className="content-wrapper">
                <ProfileHeader />
                <TaskHandler user="Fiilis-Ville"/>
            </div>
        )
    }
}
