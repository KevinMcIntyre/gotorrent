require('../../css/main.css');

'use strict';

import React from "react";
import { Toolbar, ToolbarGroup, RaisedButton } from "material-ui";

const ipc = electronRequire("ipc");

export default class TransferBar extends React.Component {
    constructor(props) {
        super(props);
        this.toolbarStyle = {
            padding: "0",
                position: "relative",
                boxShadow: "rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px"
        };
    }

    openTorrent() {
        ipc.send("open-torrent");
    }

    render() {
        return (
            <Toolbar style={this.toolbarStyle}>
                <ToolbarGroup key={0} float="right">
                    <RaisedButton label="Add Torrent" primary={true} onClick={this.openTorrent}/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}