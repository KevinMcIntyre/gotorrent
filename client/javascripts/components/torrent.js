require('../../css/main.css');

'use strict';

import React from "react";
import { Checkbox, LinearProgress, FontIcon } from 'material-ui';
import { PlayPause, OpenFolder, TorrentStatus } from './index.js';

function formatKilobytes(kilobytes) {
    kilobytes = parseInt(kilobytes);
    return parseFloat(kilobytes / 1000000).toFixed(2);
}

function formatProgressPercent(decimal) {
    decimal = parseInt(decimal);
    return parseFloat(Math.round(decimal * 10000) / 100).toFixed(2);
}

export default class Torrent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        let select = this.props.isSelected;
        this.refs.checkbox.setChecked(!select);
        let torrentRow = this.refs.torrentRow;
        if (!select) {
            torrentRow.classList.add("torrent-selected");
        } else {
            torrentRow.classList.remove("torrent-selected");
        }
        this.props.onClick();
    }

    render() {
        return (
            <div>
                <div ref="torrentRow" className="torrent-row">
                    <div className="torrent-select">
                        <Checkbox
                            ref="checkbox"
                            name={"torrent-" + this.props.key}
                            value={this.props.key}
                            onCheck={this.handleClick}/>
                    </div>
                    <div className="torrent-info" onClick={this.handleClick}>
                        <h1 className="torrent-name">{this.props.name}</h1>

                        <h2 className="torrent-progress">{formatKilobytes(this.props.kBytesCompleted)}
                            of {formatKilobytes(this.props.sizeInKBytes)} GB
                            ({formatProgressPercent(this.props.kBytesCompleted / this.props.sizeInKBytes)}%)</h2>
                        <LinearProgress mode="indeterminate"/>
                        <TorrentStatus
                            isPaused={this.props.isPaused}
                            activePeers={this.props.activePeers}
                            totalPeers={this.props.totalPeers}
                            download={this.props.download}
                            upload={this.props.upload}/>
                    </div>
                    <div className="torrent-actions">
                        <PlayPause isPaused={this.props.isPaused} onClick={this.props.onPause} />
                        <OpenFolder filePath={this.props.filePath}/>
                    </div>
                </div>
            </div>
        );
    }
}


