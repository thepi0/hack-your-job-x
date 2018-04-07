import {observable, action, computed} from 'mobx';
import axios from 'Services/axios';
import snackbarStore from 'Stores/SnackbarStore';

export class UserStore {
    @observable users = [];
    @observable loadingUsers = false;

    @action.bound loadUsers() {
        this.loadingUsers = true;
        return new Promise((resolve, reject) => {
            axios.get('/projects/1/').then((users) => {
                console.log(users);
                let userData = users.data.users;
                const newUsers = userData.map((user, index) => {
                    const newUser = new User(index, user.name, user.avatar);
                    newUser.setUserInfo(user);
                    return newUser;
                }).filter(user => !this.userIds.includes(user.id));
                this.users.push(...newUsers);
                resolve();
                this.loadingUsers = false;
                console.log(this.users);
            }).catch(e => {
                reject();
                this.loadingUsers = false;
                console.log(e);
            });
        });
    }

    @action.bound selectUser(user) {
        let prevSelected = null;
        if (this.selectedUser) {
            prevSelected = this.selectedUser.id;
            this.selectedUser.deselect();
        }
        if (user.id !== prevSelected) {
            user.select();
        }
    }

    @computed get selectedUser() {
        return this.users.filter(user => user.selected)[0] || null;
    }

    @computed get userIds() {
        return this.users.map(user => user.id);
    }

    @computed get getAllUsers() {
        return this.users.filter(user => !user.selected) || null;
    }

    @computed get getUsers() {
        return this.users.filter(user => !user.selected && user.selected_for_daily) || null;
    }

    @computed get getSignedInUser() {
        return this.users[0];
    }

}

export class User {
    @observable id = null;
    @observable name = "";
    @observable avatar = "";
    @observable selected = false;
    @observable time_spent = 0;
    @observable selected_for_daily = false;

    constructor(id, name = "", avatar = "") {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
    }

    @computed get fullName() {
        return this.name;
    }

    @action.bound toggleForDaily () {
        this.selected_for_daily = !this.selected_for_daily;
    }

    @action.bound select() {
        this.selected = true;
    }

    @action.bound deselect() {
        this.selected = false;
    }

    @action.bound updateTimeSpent(time) {
        this.time_spent = time;
    }

    @action.bound setUserInfo({name, avatar}) {
        this.name = name;
        this.avatar = avatar;
    }

}

export default new UserStore();
