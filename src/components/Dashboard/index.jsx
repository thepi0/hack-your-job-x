import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import ProfileHeader from 'Components/ProfileHeader';
import TaskHandler from 'Components/TaskHandler';

import './Dashboard.css';

@inject('backendStore') @observer
export default class Dashboard extends Component {

    constructor() {
        super();

        this.state = {
            people: null
        };
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
                Dashboard content will come here
                <ProfileHeader />
                <TaskHandler user="Fiilis-Ville"/>
            </div>
        )
    }
}
