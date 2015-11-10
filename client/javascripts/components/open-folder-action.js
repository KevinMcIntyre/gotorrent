require('../../css/main.css');

'use strict';

import React from "react";
import {FontIcon} from "material-ui";

let ipc = electronRequire("ipc");

export const OpenFolder = React.createClass({
    openFolder: function() {
        ipc.send('open-folder', this.props.filePath);
    },
    render: function () {
        return (
            <span className="action-button" onClick={this.openFolder}>
                <FontIcon className="material-icons">folder_open</FontIcon>
            </span>
        );
    }
});