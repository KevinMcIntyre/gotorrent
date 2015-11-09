require('../../../css/main.css');

'use strict';

import React from "react";
import {LinearProgress, RaisedButton} from "material-ui";

let ipc = electronRequire("ipc");
let start = "Start!";
let stop = "Stop";
let progressCount = 0;

export const Chat = React.createClass({
    getInitialState: function () {
        return {
            buttonText: start,
            progress: 0
        }
    },
    toggleProcess: function () {
        if (this.state.buttonText === start) {
            this.setState({buttonText: stop});
            ipc.send('toggle-process', 'start');
        } else if (this.state.buttonText === stop) {
            this.setState({buttonText: start});
            ipc.send('toggle-process', 'stop');
        }
    },
    render: function () {
        return (
            <div>
                <div className="page-body">
                    <h1>Hello Electron!</h1>

                    <div className="progress-bar-container">
                        <LinearProgress mode="indeterminate"/>
                    </div>
                    <RaisedButton label={this.state.buttonText} primary={true} onClick={this.toggleProcess}/>
                </div>
            </div>
        );
    }
});
