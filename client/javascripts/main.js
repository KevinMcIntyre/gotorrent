require('../css/main.css');

'use strict';

// Component Imports
import React from "react";
import { AppBar, LeftNav, MenuItem, IconButton, Toolbar, LinearProgress, RaisedButton } from "material-ui";
import { NavigationMoreVert } from "material-ui/lib/svg-icons"
import Dropzone from "react-dropzone";
import injectTapEventPlugin from "react-tap-event-plugin"
import { updatePath } from 'redux-simple-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { store } from './app.js';
import  { addTorrent, toggleNav } from './actions/actions.js'

injectTapEventPlugin();

// NOTE: electronRequire is defined in index.js
const ipc = electronRequire("ipc");
const menuItems = [
    { type: MenuItem.Types.SUBHEADER, text: 'Files' },
    { route: 'transfers', text: 'Transfers' },
    { text: 'Library' },
    { type: MenuItem.Types.SUBHEADER, text: 'Community' },
    { route: 'chat', text: 'Peer Chat' },
    { text: 'Forum' }
];

class GoTorrent extends React.Component {
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

    fileDrop(files) {
        let pathArray = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].type.indexOf("torrent") > -1) {
                pathArray.push(files[i].path);
            }
        }
        if (pathArray.length > 0) {
            ipc.send("torrent", pathArray);
        }
    }

    toggleLeftNav() {
        this.refs.leftNav.toggle();
        let leftNav = document.querySelector(".left-nav");
        let shouldCloseNav = this.props.ui.get("navIsOpen");
        if (shouldCloseNav) {
            leftNav.classList.add("left-nav-closed");
        } else {
            leftNav.classList.remove("left-nav-closed");
        }
        this.props.toggleNav(!shouldCloseNav);
    }

   _onLeftNavChange(e, key, payload) {
        if (payload.route != undefined) {
            store.dispatch(updatePath(payload.route));
        }
    }

    render() {
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
}

ipc.on('event', function (arg) {
    switch (arg) {
        case "open-torrent":
        {
            ipc.send("open-torrent");
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

function mapStateToProps(state) {
    return {
        ui: state.ui
    };
}

export default connect(
    mapStateToProps, {
        addTorrent,
        toggleNav
    }
)(GoTorrent);