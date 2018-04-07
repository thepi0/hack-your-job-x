import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Avatar from 'material-ui/Avatar';
import MdPause from 'react-icons/lib/md/pause';
import keydown from 'react-keydown';

import ProfileHeaderStore from 'Stores/ProfileHeaderStore';
import snackbarStore from 'Stores/SnackbarStore';
import timerStore from 'Stores/TimerStore';

import FlatButton from 'material-ui/FlatButton';

import Unicorn from 'Public/unicorn.jpg';
import userStore from 'Stores/UserStore';

import './ProfileHeader.css';

@inject('ProfileHeaderStore') @observer
export default class ProfileHeader extends Component {

    constructor() {
        super();

        this.state = {
            people: null,
            selectedUser: null,
            selectedUserId: null
        };
    }

    @keydown('space')
    submit( event ) {
        timerStore.stopTimer(this.state.selectedUser);
    }

    componentDidMount() {

        if (!userStore.users.length) {
        userStore.loadUsers()
            .then(ok => console.log('users loaded'))
            .catch(message => snackbarStore.showMessage("Couldn't load users"));
        } else {
            //userStore.selectUser(userStore.users[0])
        }


    }

    selectUser = (user) => {
        this.setState({selectedUser: user});
        if (user.id === this.state.selectedUserId) {
            timerStore.stopTimer(user);
        } else {
            this.setState({selectedUserId: user.id});
            timerStore.clearTimer();
            userStore.selectUser(user);
            timerStore.startTimer(user);
        }

    }

    endDaily = () => {
        console.log('end daily');
    }

    render() {

        const buttonStyle = {borderRadius: '30px', backgroundColor: '#f8485e', color: '#FFFFFF', padding: '5px 15px', height: '50px', fontSize: '20px',
  fontWeight: '500'};

        return (
            <div className="profile-header-wrapper">
                <div className="profile-left" onClick={this.selectUser}>
                    {userStore.selectedUser ?
                        <div className="profile-avatar-wrap">
                            <div className="timer-spinner">
                                <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        <circle
                                            id="circle"
                                            className="circle_animation"
                                            r="69.85699"
                                            cy="81"
                                            cx="81"
                                            strokeWidth="12"
                                            stroke={ProfileHeaderStore.getSpinnerColor(userStore.selectedUser.time_spent)}
                                            fill="none"
                                            style={{strokeDashoffset: 440-(userStore.selectedUser.time_spent*(440/60))}}/>
                                    </g>
                                </svg>
                                <div className="profile-avatar-image active-user">
                                    <Avatar
                                        src={userStore.selectedUser.avatar}
                                        size={100} />
                                    {timerStore.timer_running ?
                                        <div className="profile-avatar-pause">
                                            <MdPause style={{width: '50px', height: '50px', color: '#FFFFFF'}}/>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div className="profile-avatar-name">
                                {userStore.selectedUser.name}
                            </div>
                        </div>
                        :
                        null
                    }
                </div>
                <div className="profile-center">
                    {userStore.getUsers.length ?
                        userStore.getUsers.map(user => {
                            return (
                                <div key={user.id} onClick={() => this.selectUser(user)} className="not-active-user-wrap">
                                    <div className="profile-avatar-image">
                                        <Avatar
                                            src={user.avatar}
                                            size={75} />
                                    </div>
                                    <div className="profile-avatar-name">
                                        {user.name}
                                    </div>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </div>
                <div className="profile-right">
                    <FlatButton label="Lopeta daily" style={buttonStyle} onClick={() => this.endDaily()} />
                </div>
            </div>
        )
    }
}
