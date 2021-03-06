import {List, Map} from "immutable";
import { ADD_TORRENT, REMOVE_TORRENT, UPDATE_TORRENT, SELECT_TORRENT, PAUSE_TORRENT, TOGGLE_NAV, TOGGLE_MAGNET_MODAL } from '../actions/actions.js';

const ipc = electronRequire("ipc");

const torrentState = Map({
        "torrents": List([]),
        "torrentsById": Map({})
    }
);

export function torrentReducer(state = torrentState, action = null) {
    switch (action.type) {
        case ADD_TORRENT:
        {
            let prevId = state.get("torrents").last();
            const newId = prevId == undefined ? 1 : (state.get("torrents").last() + 1);
            const torrent = {
                id: newId,
                name: '',
                bytesComplete: '',
                sizeInBytes: '',
                filePath: action.info.path,
                activePeers: '',
                totalPeers: '',
                download: '',
                upload: '',
                isPaused: false,
                isSelected: false,
                isInit: false,
                isMagnet: action.info.isMagnet
            };

            ipc.send("start-torrent", {
                id: torrent.id,
                path: torrent.filePath,
                isMagnet: torrent.isMagnet
            });

            return state
                .set(
                    "torrents",
                    state.get("torrents").push(newId)
                ).set(
                    "torrentsById",
                    state.get("torrentsById").set(newId.toString(), torrent)
                );
        }
        case REMOVE_TORRENT:
        {
            ipc.send("stop-torrent", action.id);

            return state
                .set(
                    "torrents",
                    state.get("torrents").delete(state.get("torrents").indexOf(parseInt(action.id)))
                ).set(
                    "torrentsById",
                    state.get("torrentsById").delete(action.id)
                );
        }
        case SELECT_TORRENT:
        {
            const torrent = state.get("torrentsById").get(action.id);
            torrent.isSelected = !torrent.isSelected;
            return state
                .set(
                    "torrentsById",
                    state.get("torrentsById").set(action.id, torrent)
                );
        }
        case PAUSE_TORRENT:
        {
            const torrent = state.get("torrentsById").get(action.id);
            torrent.isPaused = !torrent.isPaused;

            if (torrent.isPaused) {
                ipc.send("stop-torrent", torrent.id);
            } else {
                ipc.send("start-torrent", {
                    id: torrent.id,
                    path: torrent.filePath,
                    isMagnet: torrent.isMagnet
                });
            }

            return state
                .set(
                    "torrentsById",
                    state.get("torrentsById").set(action.id, torrent)
                );
        }
        case UPDATE_TORRENT:
        {
            const torrentId = action.torrent.id.toString();
            const oldTorrentState = state.get("torrentsById").get(torrentId);
            if (oldTorrentState) {
                const newTorrentState = Object.assign({}, action.torrent, {
                    isPaused: oldTorrentState.isPaused,
                    isSelected: oldTorrentState.isSelected,
                    isInit: true,
                    isMagnet: oldTorrentState.isMagnet
                });

                return state
                    .set(
                    "torrentsById",
                    state.get("torrentsById").set(torrentId, newTorrentState)
                );
            } else {
                return state;
            }
        }
        default :
        {
            return state;
        }
    }
}

const uiState = Map({
        "navIsOpen": true,
        "magnetModalIsOpen": false
    }
);

export function uiReducer(state = uiState, action = null) {
    switch (action.type) {
        case TOGGLE_NAV:
        {
            return state.set("navIsOpen", action.open);
        }
        case TOGGLE_MAGNET_MODAL:
        {
            return state.set("magnetModalIsOpen", action.open);
        }
        default :
        {
            return state;
        }
    }
}