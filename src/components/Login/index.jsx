import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {setAuthToken} from 'Services/axios';
import { withRouter } from 'react-router-dom';
import TaskHandler from 'Components/TaskHandler';

import './Login.css';

@inject('backendStore') @observer
class Login extends Component {

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


    login = () => {
        setAuthToken(this.tokenInput.value);
        // this.props.history.push('/dashboard');
        this.props.backendStore.loadData();
    }

    render() {
        return (
            <div className="content-wrapper">
                <h3>Enter token</h3>
                <input type="text" defaultValue="hackday" ref={(e) => this.tokenInput = e}/><br/>
                <button onClick={this.login}>Login</button>
                <TaskHandler user="Fiilis-Ville"/>
            </div>
        )
    }
}

export default withRouter(Login);