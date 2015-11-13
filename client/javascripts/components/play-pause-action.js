require('../../css/main.css');

'use strict';

import React from "react";
import { FontIcon } from "material-ui";

export default class PlayPause extends React.Component {
    constructor(props) {
        super(props);
        this.setPause = this.setPause.bind(this);
    }

    setPause() {
        this.props.onClick();
    }

    render() {
        var icon;
        if (this.props.isPaused) {
            icon = <FontIcon className="material-icons">play_circle_outline</FontIcon>
        } else {
            icon = <FontIcon className="material-icons">pause_circle_outline</FontIcon>
        }
        return (
            <span className="action-button" onClick={this.setPause}>
                {icon}
            </span>
        );
    }
}