import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Task from 'Components/Task';
import './TaskHandler.css';

@inject('backendStore') @observer
class TaskHandler extends Component {

    constructor(props) {
        super(props);

        this.state = {
            people: null
        };

        this.task = {
            type: 1,
            text: "Tee koodaustaikohja backendiin"
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    onYesterdayDrop = (ev) => {
        this.props.backendStore.tasksYesterday += this.props.backendStore.tasksYesterday.length > 0 ? "\n" + ev.dataTransfer.getData('data') + "\n" : ev.dataTransfer.getData('data') + "\n";
        this.tasksYesterday.value = this.props.backendStore.tasksYesterday;
    }

    onTodayDrop = (ev) => {
        this.props.backendStore.tasksToday += this.props.backendStore.tasksToday.length > 0 ? "\n" + ev.dataTransfer.getData('data') + "\n" : ev.dataTransfer.getData('data') + "\n";
        this.tasksToday.value = this.props.backendStore.tasksToday;
    }

    onProblemsDrop = (ev) => {
        this.props.backendStore.tasksProblems += this.props.backendStore.tasksProblems.length > 0 ? "\n" + ev.dataTransfer.getData('data') + "\n" : ev.dataTransfer.getData('data') + "\n";
        this.tasksProblems.value = this.props.backendStore.tasksProblems;
    }

    allowDrop = (ev) => {
        ev.preventDefault();
    }

    change = (e) => {
        this.props.backendStore.tasksYesterday = e.target.value;
    }

    render() {
        return (
            <div className="TaskHandler">
                <div className="TaskHandler-task-list">
                    <div className="TaskHandler-task-list-title">Sprint 15</div>
                    <Task data={this.task}/>
                    <Task data={this.task}/>
                    <Task data={this.task}/>
                    <Task data={this.task}/>
                    <Task data={this.task}/>
                </div>
                <div className="TaskHandler-task-summary">
                    <div className="TaskHandler-task-summary-container">
                    <div className="TaskHandler-task-summary-title">Eilen</div>
                    <div className="TaskHandler-task-summary-editor" onDrop={this.onYesterdayDrop} onDragOver={this.allowDrop}>
                        <textarea defaultValue={this.props.backendStore.tasksYesterday} ref={(e) => this.tasksYesterday = e} onChange={this.change}></textarea>
                    </div>
                    <br/>
                    <div className="TaskHandler-task-summary-title">Tänään</div>
                    <div className="TaskHandler-task-summary-editor" onDrop={this.onTodayDrop} onDragOver={this.allowDrop}>
                        <textarea defaultValue={this.props.backendStore.tasksToday} ref={(e) => this.tasksToday = e} onChange={this.change}></textarea>
                    </div>
                    <br/>
                    <div className="TaskHandler-task-summary-title">Esteet</div>
                    <div className="TaskHandler-task-summary-editor" onDrop={this.onProblemsDrop} onDragOver={this.allowDrop}>
                        <textarea defaultValue={this.props.backendStore.tasksProblems} ref={(e) => this.tasksProblems = e} onChange={this.change}></textarea>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskHandler;