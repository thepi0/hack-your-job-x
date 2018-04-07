import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import axios, {setAuthToken} from 'Services/axios';
import { withRouter } from 'react-router-dom'

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
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <div className="content-wrapper text-center">
                <h3>Enter token</h3>
                <input type="text" ref={(e) => this.tokenInput = e}/><br/>
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default withRouter(Login);