import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import './Summary.css';

@inject('backendStore') @observer
class End extends Component {

    render() {
        return (
            <div className="Summary">
                <div className="Summary-wrapper">
                    <h3>Daily tänään</h3>
                    <div className="Summary-container"></div>
                </div>
            </div>
        )
    }
}

export default End;