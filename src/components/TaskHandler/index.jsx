import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Task from 'Components/Task';
import './TaskHandler.css';

@inject('backendStore', 'userStore') @observer
class TaskHandler extends Component {

    constructor(props) {
        super(props);
        this.props.backendStore.loadData();
    }

    componentDidUpdate() {
        this.tasksYesterday.value = this.props.userStore.selectedUser.yesterday;
        this.tasksToday.value = this.props.userStore.selectedUser.today;
        this.tasksProblems.value = this.props.userStore.selectedUser.blocked;
        this.setHeight(this.tasksYesterday);
        this.setHeight(this.tasksToday);
        this.setHeight(this.tasksProblems);
    }

    onYesterdayDrop = (ev) => {
        this.props.userStore.selectedUser.yesterday += this.props.userStore.selectedUser.yesterday.length > 0 ? "\n" + ev.dataTransfer.getData('data') + "\n" : ev.dataTransfer.getData('data') + "\n";
        this.tasksYesterday.value = this.props.userStore.selectedUser.yesterday;
        this.setHeight(this.tasksYesterday);
    }

    onTodayDrop = (ev) => {
        this.props.userStore.selectedUser.today += this.props.userStore.selectedUser.today.length > 0 ? "\n" + ev.dataTransfer.getData('data') + "\n" : ev.dataTransfer.getData('data') + "\n";
        this.tasksToday.value = this.props.userStore.selectedUser.today;
        this.setHeight(this.tasksToday);
    }

    onProblemsDrop = (ev) => {
        this.props.userStore.selectedUser.blocked += this.props.userStore.selectedUser.blocked.length > 0 ? "\n" + ev.dataTransfer.getData('data') + "\n" : ev.dataTransfer.getData('data') + "\n";
        this.tasksProblems.value = this.props.userStore.selectedUser.blocked;
        this.setHeight(this.tasksProblems);
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    setHeight = (el) => {
        el.style.height = "1px";
        el.style.height = el.scrollHeight + "px";
    }

    yesterdayChange = (e) => {
        this.props.userStore.selectedUser.yesterday = e.target.value;
        this.setHeight(e.target);
    }

    todayChange = (e) => {
        this.props.userStore.selectedUser.today = e.target.value;
        this.setHeight(e.target);
    }

    blockedChange = (e) => {
        this.props.userStore.selectedUser.blocked = e.target.value;
        this.setHeight(e.target);
    }

    render() {
        let user = this.props.userStore.selectedUser;
        if(!user)
            return null;
        const tasks = this.props.backendStore.getUserTasks(user.name);
        let i = 0;

        return (
            <div className="TaskHandler">
                <div className="TaskHandler-task-list">
                    <div className="TaskHandler-task-list-title">Sprint 15</div>
                    {
                        tasks && tasks["In Progress"] && tasks["In Progress"].map(t => {
                            return <Task data={t} key={i++}/>
                        })
                    }
                    {
                        tasks && tasks["To Do"] && tasks["To Do"].map(t => {
                            return <Task data={t} key={i++}/>
                        })
                    }
                    {
                        tasks && tasks["Done"] && tasks["Done"].map(t => {
                            return <Task data={t} key={i++}/>
                        })
                    }
                </div>
                <div className="TaskHandler-task-summary">
                    <div className="TaskHandler-task-summary-container">
                    <div className="TaskHandler-task-summary-title">Eilen</div>
                    <div className="TaskHandler-task-summary-editor">
                        <textarea onDrop={this.onYesterdayDrop} onDragOver={this.allowDrop} defaultValue={user.yesterday} ref={(e) => this.tasksYesterday = e} onChange={this.yesterdayChange}></textarea>
                    </div>
                    <br/>
                    <div className="TaskHandler-task-summary-title">Tänään</div>
                    <div className="TaskHandler-task-summary-editor" onDrop={this.onTodayDrop} onDragOver={this.allowDrop}>
                        <textarea defaultValue={this.props.backendStore.tasksToday} ref={(e) => this.tasksToday = e} onChange={this.todayChange}></textarea>
                    </div>
                    <br/>
                    <div className="TaskHandler-task-summary-title">Esteet</div>
                    <div className="TaskHandler-task-summary-editor" onDrop={this.onProblemsDrop} onDragOver={this.allowDrop}>
                        <textarea defaultValue={this.props.backendStore.tasksProblems} ref={(e) => this.tasksProblems = e} onChange={this.blockedChange}></textarea>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskHandler;