require('../../css/main.css');

'use strict';

import React from "react";
import { Checkbox, LinearProgress, FontIcon } from 'material-ui';
import { PlayPause, OpenFolder, TorrentStatus, Close } from './index.js';
import { formatBytes, formatToPercentString } from '../utils/formatters.js'

function getFileNameFromPath(path) {
    const splitPath = path.split("/");
    return splitPath[splitPath.length - 1];
}

export default class Torrent extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    shouldComponentUpdate(nextProps) {
        return (nextProps.bytesComplete !== this.props.bytesComplete) || (nextProps.isPaused !== this.props.isPaused);
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
        const torrentBody = this.props.isInit ?
            <div>
                <h1 className="torrent-name">{this.props.name}</h1>

                <h2 className="torrent-progress">
                    {
                        `${formatBytes(this.props.bytesComplete)}
                         of ${formatBytes(this.props.sizeInBytes)}
                         (${formatToPercentString((this.props.bytesComplete / this.props.sizeInBytes))})`
                    }
                </h2>
                <LinearProgress
                    mode="determinate"
                    value={Math.floor((this.props.bytesComplete / this.props.sizeInBytes) * 100)} />
                <TorrentStatus
                    isPaused={this.props.isPaused}
                    activePeers={this.props.activePeers}
                    totalPeers={this.props.totalPeers}
                    download={this.props.download}
                    upload={this.props.upload}/>
            </div>
            :
            <div>
                <h1 className="torrent-name">{getFileNameFromPath(this.props.filePath)}</h1>

                <h2 className="torrent-progress">{"Initializing torrent"}</h2>
                <LinearProgress mode="indeterminate" />

                <h3 className="torrent-status">{"Fetching metadata..."}</h3>
            </div>;

        return (
            <div>
                <div ref="torrentRow" className="torrent-row">
                    <Close torrentId={this.props.key} onClick={this.props.onClose} />
                    <div className="torrent-select">
                        <Checkbox
                            ref="checkbox"
                            name={"torrent-" + this.props.key}
                            value={this.props.key}
                            onCheck={this.handleClick}/>
                    </div>
                    <div className="torrent-body">
                        <div className="torrent-info" onClick={this.handleClick}>
                            { torrentBody }
                        </div>
                        <div className="torrent-actions">
                            <PlayPause isPaused={this.props.isPaused} onClick={this.props.onPause}/>
                            <OpenFolder filePath={this.props.filePath}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


