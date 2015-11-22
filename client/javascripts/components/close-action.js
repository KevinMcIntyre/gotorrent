require('../../css/main.css');

'use strict';

import React from 'react';
import { FontIcon } from 'material-ui';

let ipc = electronRequire("ipc");

export default class OpenFolder extends React.Component {
    constructor(props) {
        super(props);
        this.closeTorrent = this.closeTorrent.bind(this);
    }

    closeTorrent() {
        this.props.onClick();
    }

    render() {
        return (
            <div className="close-button" onClick={this.closeTorrent}>
                <FontIcon className="material-icons" style={{
                    "fontSize": "14px",
                    "cursor": "pointer",
                    "float": "right"
                }}>close</FontIcon>
            </div>
        );
    }
}