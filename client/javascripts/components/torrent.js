require('../../css/main.css');

'use strict';

import React from "react";
import {Checkbox, LinearProgress, FontIcon} from "material-ui";
let PlayPause = require('./play-pause-action.js').PlayPause;
let OpenFolder = require('./open-folder-action.js').OpenFolder;
let TorrentStatus = require('./torrent-status.js').TorrentStatus;


function formatKilobytes(kilobytes) {
    return parseFloat(kilobytes/1000000).toFixed(2);
}

function formatProgressPercent(decimal) {
    return parseFloat(Math.round(decimal * 10000) / 100).toFixed(2);
}

export const Torrent = React.createClass({
    getInitialState: function () {
        return {
            paused: true,
            clicked: false
        }
    },
    handleClick: function() {
        this.setState({
            clicked: !this.state.clicked
        });
        this.refs.checkbox.setChecked(!this.state.clicked);
        let torrentRow = this.refs.torrentRow;
        if (!this.state.clicked) {
            torrentRow.classList.add("torrent-selected");
        } else {
            torrentRow.classList.remove("torrent-selected");
        }
    },
    render: function () {
        return (
            <div>
                <div ref="torrentRow" className="torrent-row">
                    <div className="torrent-select">
                        <Checkbox
                            ref = "checkbox"
                            name={"torrent-" + this.props.torrent.id}
                            value={this.props.torrent.id.toString()}
                            onCheck={this.handleClick} />
                    </div>
                    <div className="torrent-info" onClick={this.handleClick}>
                        <h1 className="torrent-name">{this.props.torrent.name}</h1>
                        <h2 className="torrent-progress">{formatKilobytes(this.props.torrent.kBytesCompleted)} of {formatKilobytes(this.props.torrent.sizeInKBytes)} GB ({formatProgressPercent(this.props.torrent.kBytesCompleted/this.props.torrent.sizeInKBytes)}%)</h2>
                        <LinearProgress mode="indeterminate"/>
                        <TorrentStatus />
                    </div>
                    <div className="torrent-actions">
                        <PlayPause isPaused={this.state.paused} status={this.refs.torrentStatus} torrent={this.props.torrent} />
                        <OpenFolder filePath={this.props.torrent.filePath} />
                    </div>
                </div>
            </div>
        );
    }
});


