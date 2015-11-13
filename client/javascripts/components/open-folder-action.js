require('../../css/main.css');

'use strict';

import React from 'react';
import { FontIcon } from 'material-ui';

let ipc = electronRequire("ipc");

export default class OpenFolder extends React.Component {
    constructor(props) {
        super(props);
        this.openFolder = this.openFolder.bind(this);
    }

    openFolder() {
        ipc.send('open-folder', this.props.filePath);
    }

    render() {
        return (
            <span className="action-button" onClick={this.openFolder}>
                <FontIcon className="material-icons">folder_open</FontIcon>
            </span>
        );
    }
}