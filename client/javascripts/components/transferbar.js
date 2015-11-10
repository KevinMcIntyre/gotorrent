require('../../css/main.css');

'use strict';

import React from "react";
import {Toolbar, ToolbarGroup, RaisedButton} from "material-ui";

const ipc = electronRequire("ipc");

let toolbarStyle = {
    padding: "0",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px"
};

export const TransferBar = React.createClass({
    openTorrent: function() {
        ipc.send("open-torrent");
    },
    render: function () {
        return (
            <Toolbar style={toolbarStyle}>
                <ToolbarGroup key={0} float="right">
                    <RaisedButton label="Add Torrent" primary={true} onClick={this.openTorrent}/>
                </ToolbarGroup>
            </Toolbar>
        );
    }
});


