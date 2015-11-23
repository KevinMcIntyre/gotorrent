require('../../css/main.css');

'use strict';

// Component Imports
import React from "react";
import { AppBar, LeftNav, MenuItem } from "material-ui";
import { updatePath } from 'redux-simple-router';
import { toggleNav } from '../actions/actions.js'
import { store } from '../app.js';

const menuItems = [
    { type: MenuItem.Types.SUBHEADER, text: 'Transfers' },
    { route: 'transfers', text: 'All' },
    { route: 'transfers', text: 'Downloading' },
    { route: 'transfers', text: 'Complete' },
];

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.leftNavStyle = {
            height: "100vh",
            position: "relative",
            float: "left",
            width: "20%",
            transform: "none"
        };
        this.toggleLeftNav = this.toggleLeftNav.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.openNav !== this.props.openNav;
    }

    toggleLeftNav() {
        this.refs.leftNav.toggle();
        let leftNav = document.querySelector(".left-nav");
        let shouldCloseNav = this.props.openNav;
        if (shouldCloseNav) {
            leftNav.classList.add("left-nav-closed");
        } else {
            leftNav.classList.remove("left-nav-closed");
        }
        store.dispatch(toggleNav(!shouldCloseNav));
    }

    _onLeftNavChange(e, key, payload) {
        if (payload.route != undefined) {
            store.dispatch(updatePath(payload.route));
        }
    }

    render() {
        return (
            <div>
                <AppBar title="GoTorrent"
                        onLeftIconButtonTouchTap={this.toggleLeftNav} />
                <LeftNav className="left-nav"
                         ref="leftNav"
                         menuItems={menuItems}
                         style={this.leftNavStyle}
                         onChange={this._onLeftNavChange} />
            </div>
        );
    }
}