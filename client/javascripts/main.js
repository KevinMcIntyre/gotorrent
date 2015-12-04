require('../css/main.css');

'use strict';

// Component Imports
import React from "react";
import Dropzone from "react-dropzone";
import injectTapEventPlugin from "react-tap-event-plugin"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { store } from './app.js';
import { addTorrent, updateTorrent, toggleMagnetModal } from './actions/actions.js';
import { Nav, MagnetModal } from './components/index.js';

injectTapEventPlugin();

// NOTE: electronRequire is defined in index.js
const ipc = electronRequire("ipc");

export function addTorrentFiles(files) {
    let pathArray = [];
    if (files) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (typeof file === 'string') {
                if (file.indexOf("torrent") > -1) {
                    pathArray.push(file);
                }
            } else {
                if (file.type.indexOf("torrent") > -1) {
                    pathArray.push(file.path);
                }
            }
        }
        if (pathArray.length > 0) {
            for (let i = 0; i < pathArray.length; i++) {
                store.dispatch(addTorrent({
                    path: pathArray[i],
                    isMagnet: false
                }));
            }
        }
    }
}

class GoTorrent extends React.Component {
    constructor(props) {
        super(props);
        this.fileDrop = this.fileDrop.bind(this);
    }

    fileDrop(files) {
        addTorrentFiles(files);
    }

    render() {
        return (
            <div>
                <Dropzone ref="dropzone" className="dropzone-div" onDrop={this.fileDrop} disableClick={true}
                          accept={".torrent"}>
                    <Nav openNav={this.props.ui.get("navIsOpen")} />
                    <div className="content-container">
                        {this.props.children}
                    </div>
                </Dropzone>
                <MagnetModal open={this.props.ui.get("magnetModalIsOpen")} />
            </div>
        );
    }
}

ipc.on('event', function (arg) {
    switch (arg) {
        case "open-torrent":
        {
            ipc.send("open-torrent");
            break;
        }
        case "open-magnet":
        {
            let modalIsOpen = store.getState().ui.get("magnetModalIsOpen");
            if (!modalIsOpen) {
                store.dispatch(toggleMagnetModal(true));
            }
            break;
        }
        default:
        {
            break;
        }
    }
});

ipc.on('add-torrent-files', function (files) {
    addTorrentFiles(files);
});

ipc.on('torrent-update', function (torrentObj) {
    store.dispatch(updateTorrent(torrentObj));
});

function mapStateToProps(state) {
    return {
        ui: state.ui
    };
}

export default connect(
    mapStateToProps, {
        addTorrent,
        updateTorrent
    }
)(GoTorrent);