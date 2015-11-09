require('../css/main.css');

'use strict';


// Component Imports
import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, IndexRoute} from "react-router";
import createHistory from 'history/lib/createHashHistory'
import {AppBar, LeftNav, MenuItem, IconButton, Toolbar, LinearProgress, RaisedButton} from "material-ui";
import {NavigationMoreVert} from "material-ui/lib/svg-icons"
import Dropzone from "react-dropzone";
import injectTapEventPlugin from "react-tap-event-plugin"

injectTapEventPlugin();

// Route imports
const Transfers = require('./components/pages/transfers.js').Transfers;
const Chat = require('./components/pages/chat.js').Chat;

// NOTE: electronRequire is defined in index.js
const ipc = electronRequire("ipc");

const menuItems = [
    {type: MenuItem.Types.SUBHEADER, text: 'Transfers'},
    {route: 'transfers', text: 'Downloading'},
    {text: 'Complete'},
    {type: MenuItem.Types.SUBHEADER, text: 'Community'},
    {route: 'chat', text: 'Peer Chat'},
    {text: 'Forum'}
];

const App = React.createClass({
    getInitialState: function () {
        return {
            navIsOpen: true
        }
    },
    leftNavStyle: {
        height: "100vh",
        position: "inherit",
        float: "left",
        width: "20%",
        transform: "none"
    },
    fileDrop: function (files) {
        var pathArray = [];
        for(var i = 0; i < files.length; i ++) {
            if (files[i].type.indexOf("torrent") > -1) {
                pathArray.push(files[i].path);
            }
        }
        if (pathArray.length > 0) {
            ipc.send("torrent", pathArray);
        }
    },
    toggleLeftNav: function () {
        this.refs.leftNav.toggle();
        let leftNav = document.querySelector(".left-nav");
        let shouldCloseNav = this.state.navIsOpen;
        if (shouldCloseNav) {
            leftNav.classList.add("left-nav-closed");
        } else {
            leftNav.classList.remove("left-nav-closed");
        }
        this.setState({navIsOpen: !shouldCloseNav})
    },
    _onLeftNavChange(e, key, payload) {
        if (payload.route != undefined) {
            this.props.history.pushState(null, payload.route);
        }
    },
    render: function () {
        return (
            <Dropzone ref="dropzone" className="dropzone-div" onDrop={this.fileDrop} disableClick={true}
                      accept={".torrent"}>
                <AppBar title="GoTorrent"
                        onLeftIconButtonTouchTap={this.toggleLeftNav}
                        iconElementRight={
                            <IconButton>
                                <NavigationMoreVert />
                            </IconButton>
                        }
                    />
                <LeftNav className="left-nav"
                         ref="leftNav"
                         menuItems={menuItems}
                         style={this.leftNavStyle}
                         onChange={this._onLeftNavChange}/>

                <div className="content-container">
                    {this.props.children}
                </div>
            </Dropzone>
        );
    }
});

const Routes = React.createClass({
    render: function () {
        return (
            <Router history={createHistory()}>
                <Route path="/" component={App}>
                    <IndexRoute component={Transfers}/>
                    <Route path="transfers" component={Transfers}/>
                    <Route path="chat" component={Chat}/>
                </Route>
            </Router>
        );
    }
});

ReactDOM.render(<Routes/>, document.getElementById("content"));

ipc.on('event', function (arg) {
    switch (arg) {
        case "open-torrent":
        {
            chooseFile(".open-torrent");
            break;
        }
        case "open-magnet":
        {
            console.log("magnets and shit");
            break;
        }
        default:
        {
            break;
        }
    }
});

ipc.on('message', function (arg) {
    console.log(arg);
});