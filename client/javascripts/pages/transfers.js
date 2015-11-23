require('../../css/main.css');

'use strict';

import React from "react";
import { TransferBar, Torrent } from '../components/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TorrentActions from '../actions/actions.js';

// NOTE: electronRequire is defined in index.js
const ipc = electronRequire("ipc");

class Transfers extends React.Component {
    constructor(props) {
        super(props);
    }

    selectTorrent(id) {
        this.props.selectTorrent(id);
    }

    removeTorrent(id) {
        this.props.removeTorrent(id);
    }

    pauseTorrent(id) {
        this.props.pauseTorrent(id);
    }

    render() {
        const torrents = this.props.torrents.get("torrents");
        const torrentsById = this.props.torrents.get("torrentsById");
        let torrentElems = [];

        for (let i = 0; i < torrents.size; i++) {
            const torrent = torrentsById.get(torrents.get(i).toString());
            if (torrent != undefined) {
                torrentElems.push(
                    <Torrent
                        key={torrent.id.toString()}
                        onClick={this.selectTorrent.bind(this, torrent.id.toString())}
                        onPause={this.pauseTorrent.bind(this, torrent.id.toString())}
                        onClose={this.removeTorrent.bind(this, torrent.id.toString())}
                        name={torrent.name}
                        bytesComplete={torrent.bytesComplete}
                        sizeInBytes={torrent.sizeInBytes}
                        activePeers={torrent.activePeers}
                        totalPeers={torrent.totalPeers}
                        download={torrent.download}
                        upload={torrent.upload}
                        isPaused={torrent.isPaused}
                        filePath={torrent.filePath}
                        isSelected={torrent.isSelected}
                        isInit={torrent.isInit} />
                )
            }
        }

        const noTorrents =
            <div className="empty-transfers">
                <h1 className="empty-transfers-msg">
                    No active transfers.
                    <br />
                    Add a torrent to start a transfer.
                </h1>
            </div>;

        return (
            <div>
                <TransferBar />
                <div className="transfers">
                    {torrentElems.length > 0 ? torrentElems : noTorrents}
                </div>
            </div>
        );
    }
}

ipc.on("window-resize", function(windowHeight) {
    document.querySelector(".transfers").style.height = ((windowHeight - 142).toString() + "px");
});

function mapStateToProps(state) {
    return {
        torrents: state.torrents
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(TorrentActions, dispatch);
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Transfers);