import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {setAuthToken} from 'Services/axios';
import { withRouter } from 'react-router-dom';
import TaskHandler from 'Components/TaskHandler';
import FlatButton from 'material-ui/FlatButton';
import Logo from 'Public/logo.svg';

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
        this.props.history.push('/pick');
        this.props.backendStore.loadData();
    }

    render() {

        const buttonStyle = {borderRadius: '30px', backgroundColor: '#49e2c5', color: '#FFFFFF', padding: '5px 15px', height: '50px', fontSize: '20px',
  fontWeight: '500', fontFalimy: 'GTEesti'};

        return (
            <div className="content-wrapper login">
                <div className="login-inner-wrap">
                    <div className="login-logo"><img src={Logo} alt="Hack My Daily" /></div>
                    <div className="login-input"><input type="text" placeholder="Anna koodi" ref={(e) => this.tokenInput = e}/></div>
                    <div className="login-button"><FlatButton label="Astu dailyn maailmaan" style={buttonStyle} labelStyle={{textTransform: 'capitalize', fontSize: '20px',
              fontWeight: '500', fontFalimy: 'GTEesti'}} onClick={() => this.login()} /></div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
