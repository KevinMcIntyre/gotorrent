require('../../css/main.css');

'use strict';

import React from "react";
import {FontIcon} from "material-ui";

export const PlayPause = React.createClass({
    getInitialState: function () {
        return {
            paused: this.props.isPaused
        }
    },
    setPause: function() {
        this.setState({
            paused: !this.state.paused
        });
    },
    render: function () {
        var icon;
        if (this.state.paused) {
            icon = <FontIcon className="material-icons">pause_circle_outline</FontIcon>
        } else {
            icon = <FontIcon className="material-icons">play_circle_outline</FontIcon>
        }
        return (
            <span className="action-button" onClick={this.setPause}>
                {icon}
            </span>
        );
    }
});