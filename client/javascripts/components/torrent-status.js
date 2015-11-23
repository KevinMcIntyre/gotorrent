require('../../css/main.css');

'use strict';

import React from "react";

function formatKilobytes(kilobytes) {
    kilobytes = parseInt(kilobytes);
    return parseFloat(kilobytes / 1000000).toFixed(2);
}

export default class TorrentStatus extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var status;
        if (this.props.isPaused) {
            status = "Paused";
        } if (this.props.isComplete) {
            status = "Download complete"
        } else {
            status = `Downloading from ${this.props.activePeers} of ${this.props.totalPeers} Peers - DL: ${formatKilobytes(this.props.download)}, UL: ${formatKilobytes(this.props.upload)}`;
        }
        return (
            <h3 className="torrent-status">
                { status }
            </h3>
        );
    }
}