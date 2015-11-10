require('../../css/main.css');

'use strict';

import React from "react";

function formatKilobytes(kilobytes) {
    return parseFloat(kilobytes/1000000).toFixed(2);
}

export const TorrentStatus = React.createClass({
    render: function () {
        var torrentStatus;
        //if (this.state.paused) {
            torrentStatus = "Paused";
        //} else {
        //    torrentStatus = `Downloading from ${this.props.torrent.activePeers} of ${this.props.torrent.totalPeers} - DL: ${formatKilobytes(this.props.torrent.downloadInKBytes)}, UL: ${formatKilobytes(this.props.torrent.uploadInKBytes)}`;
        //}
        return (
            <h3 className="torrent-status">
                {torrentStatus}
            </h3>
        );
    }
});