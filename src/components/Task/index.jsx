import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import './Task.css';

const colors = {
    1: 'yellow',
    2: 'green'
}

@inject('backendStore') @observer
class Task extends Component {

    dragStart = (ev) => {
        ev.dataTransfer.setData("data", this.props.data.text);
    }

    render() {
        return (
            <div className="Task" draggable="true" onDragStart={this.dragStart}>
                <div className="Task-color" style={{
                    background: colors[this.props.data.type]
                }}></div>
                <span className="Task-text">{this.props.data.text} </span>
            </div>
        )
    }
}

export default Task;