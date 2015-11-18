require('../../css/main.css');

'use strict';

import React from "react";
import { TransferBar, Torrent } from '../components/index.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TorrentActions from '../actions/actions.js';

class Transfers extends React.Component {
    constructor(props) {
        super(props);
    }

    selectTorrent(id) {
        this.props.selectTorrent(id);
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

        return (
            <div>
                <TransferBar />
                <div className="transfers">
                    {torrentElems}
                </div>
            </div>
        );
    }
}

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