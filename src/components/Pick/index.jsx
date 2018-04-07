import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {setAuthToken} from 'Services/axios';
import { withRouter } from 'react-router-dom';
import TaskHandler from 'Components/TaskHandler';
import Header from 'Components/Header';
import FlatButton from 'material-ui/FlatButton';
import userStore from 'Stores/UserStore';
import snackbarStore from 'Stores/SnackbarStore';
import timerStore from 'Stores/TimerStore';
import Avatar from 'material-ui/Avatar';
import Logo from 'Public/logo.svg';
import Crown from 'Public/daily-keisarin-kruunu.png';

import './Pick.css';

@inject('userStore') @observer
class Pick extends Component {

    constructor() {
        super();

        this.state = {
            people: null,
            user: null
        };
    }

    componentDidMount() {
        if (!userStore.users.length) {
        userStore.loadUsers()
            .then(ok => this.setState({user: userStore.getSignedInUser}))
            .catch(message => snackbarStore.showMessage("Couldn't load users"));
        }
    }

    componentWillUnmount() {

    }

    startDaily = () => {
        this.props.history.push('/dashboard');
    }

    selectUser = (user) => {
        user.toggleForDaily();
    }

    render() {

        const buttonStyle = {borderRadius: '30px', backgroundColor: '#49e2c5', color: '#FFFFFF', padding: '5px 15px', height: '50px', fontSize: '20px',
  fontWeight: '500', fontFalimy: 'GTEesti'};

        return (
            <div className="content-wrapper pick">
                <Header />
                <div className="content-width">
                    <div className="pick-information">

                        <div className="pick-person">
                            <div className="pick-date">
                                {timerStore.getDate()}
                            </div>
                            <div>
                                {this.state.user && this.state.user.name ? <h1>Iltaa {this.state.user.name}! Hieno dailypäivä tänään.</h1> : null }
                            </div>
                        </div>
                        <div className="pick-time">
                            {timerStore.getTime()}
                        </div>
                    </div>
                    <div className="people-inner-wrap">
                        <div className="people-inner-inner-wrap">
                            <div className="people-inner-heading">
                                <h2>Läsnäolijat</h2>
                            </div>
                            <div className="people-inner">
                                {userStore.getAllUsers.length ?
                                    userStore.getAllUsers.map((user, index) => {
                                        return (
                                            <div key={user.id} onClick={() => this.selectUser(user)} className="selection-user-wrap">
                                                {index === 0 ?
                                                    <div className="user-crown">
                                                        <img src={Crown} alt="Crown" />
                                                    </div>
                                                    :
                                                    null
                                                }
                                                <div className={"profile-avatar-image small" + (user.selected_for_daily ? ' daily-selected' : '')}>
                                                    <Avatar
                                                        src={user.avatar}
                                                        size={60} />
                                                </div>
                                                <div className="profile-avatar-name small">
                                                    {user.name}
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                                }
                            </div>
                        </div>
                    </div>
                    <div className="people-action">
                        <div className="login-button"><FlatButton label="Aloita daily" style={buttonStyle} labelStyle={{textTransform: 'capitalize', fontSize: '20px',
                  fontWeight: '500'}} onClick={() => this.startDaily()} /></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Pick);
