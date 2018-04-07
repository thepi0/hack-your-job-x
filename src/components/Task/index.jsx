import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import './Task.css';

const colors = {
    'yellow': '#f8e71c',
    'blue-gray': '#0f6780',
    'green': '#7ed321'
}

@inject('backendStore') @observer
class Task extends Component {

    dragStart = (ev) => {
        ev.dataTransfer.setData("data", this.props.data.summary);
    }

    render() {
        return (
            <div className="Task" draggable="true" onDragStart={this.dragStart}>
                <div className="Task-color" style={{
                    background: colors[this.props.data.color]
                }}></div>
                <span className="Task-text">{this.props.data.summary} </span>
            </div>
        )
    }
}

export default Task;