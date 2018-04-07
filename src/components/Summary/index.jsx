import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Header from 'Components/Header';
import LongestDailies from 'Public/summary-group.png';
import Offtopic from 'Public/offtopic.png';
import DailyBar from 'Public/dailybar.gif';

import './Summary.css';

@inject('backendStore') @observer
class End extends Component {

    render() {
        return (
            <div className="Summary">
            <Header/>
                <div className="Summary-wrapper">
                    <h3>Daily tänään</h3>
                    <div className="Summary-container">
                        <img src={DailyBar + "?"+ Math.random()} alt="Duration" className="duration" />
                        <br/><br/><br/>
                        <h4>Pisimmät daily-vuorot</h4>
                        <br/>
                        <img src={LongestDailies} alt="Longest dailies" className="smaller"/>
                        <br/><br/><br/><br/><br/>
                        <h4>Off-topiciin eksyttiin eniten vuoroilla</h4>
                        <br/>
                        <img src={Offtopic} alt="Offtopic" className="smaller"/>
                    </div>
                </div>
            </div>
        )
    }
}

export default End;