import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import MdArrowDropDown from 'react-icons/lib/md/arrow-drop-down';
import Logo from 'Public/logo.png';

import './Header.css';

@inject('userStore') @observer
export default class Header extends Component {

    constructor() {
        super();

        this.state = {
            people: null,
            user: null
        };
    }

    render() {

        return (
            <div className="header-wrapper">
                <img src={Logo} alt="Hack My Daily" />
                <div className="right-menu">
                    <div>Project X</div><div className="icon"><MdArrowDropDown style={{width: '36px', height: '36px'}} /></div><div>Kirjaudu ulos</div>
                </div>
            </div>
        )
    }
}
