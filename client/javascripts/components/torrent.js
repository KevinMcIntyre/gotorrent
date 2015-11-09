require('../../css/main.css');

'use strict';

import React from "react";
import {Checkbox, LinearProgress, FontIcon} from "material-ui";

function convertKiloToGiga(kilobytes) {
    return parseFloat(kilobytes/1000000).toFixed(2);
}

function formatProgressPercent(decimal) {
    return parseFloat(Math.round(decimal * 10000) / 100).toFixed(2);
}

export const Torrent = React.createClass({
    render: function () {
        return (
            <div>
                <div className="torrent-row">
                    <div className="torrent-select">
                        <Checkbox
                            name={"torrent-" + this.props.torrent.id}
                            value={this.props.torrent.id.toString()} />
                    </div>
                    <div className="torrent-info">
                        <h1 className="torrent-name">{this.props.torrent.name}</h1>
                        <h2 className="torrent-progress">{convertKiloToGiga(this.props.torrent.kBytesCompleted)} of {convertKiloToGiga(this.props.torrent.sizeInKBytes)} GB ({formatProgressPercent(this.props.torrent.kBytesCompleted/this.props.torrent.sizeInKBytes)}%)</h2>
                        <LinearProgress mode="indeterminate"/>
                        <h3 className="torrent-status">Paused</h3>
                    </div>
                    <div className="torrent-actions">
                        <FontIcon className="material-icons">pause</FontIcon>
                        <FontIcon className="material-icons">folder_open</FontIcon>
                    </div>
                </div>
            </div>
        );
    }
});


