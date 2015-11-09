require('../../css/main.css');

'use strict';

import React from "react";
import {Toolbar, ToolbarGroup, RaisedButton} from "material-ui";

let toolbarStyle = {
    padding: "0",
    position: "relative",
    boxShadow: "rgba(0, 0, 0, 0.156863) 0px 1px 5px, rgba(0, 0, 0, 0.227451) 0px 1px 5px"
};

export const TransferBar = React.createClass({
    render: function () {
        return (
            <Toolbar style={toolbarStyle}>
                <ToolbarGroup key={0} float="right">
                    <RaisedButton label="Add Torrent" primary={true} />
                </ToolbarGroup>
            </Toolbar>
        );
    }
});


