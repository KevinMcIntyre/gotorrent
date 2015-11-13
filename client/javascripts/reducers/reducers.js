import {List, Map} from "immutable";
import _ from "lodash";
import { ADD_TORRENT, SELECT_TORRENT, PAUSE_TORRENT, TOGGLE_NAV } from '../actions/actions.js';

const initId = _.uniqueId;
const torrentState = Map({
        "torrents": List([1]),
        "torrentsById": Map({
            "1": {
                id: 1,
                name: "arch-linux-4.3-server-amd64.iso",
                kBytesCompleted: 20634,
                sizeInKBytes: 1050000,
                filePath: '/Users/Kevin/Music',
                activePeers: 50,
                totalPeers: 60,
                downloadInKBytes: 50043,
                uploadInKBytes: 10342,
                isPaused: false,
                isSelected: false,
                isInit: true
            }
        })
    }
);

export function torrentReducer(state = torrentState, action = null) {
    switch (action.type) {
        case ADD_TORRENT:
        {
            const newId = _.uniqueId;
            const torrent = {
                id: newId,
                name: action.name,
                kBytesCompleted: 0,
                sizeInKBytes: null,
                filePath: action.path,
                activePeers: null,
                totalPeers: null,
                downloadInKBytes: 0,
                uploadInKBytes: 0,
                isPaused: false,
                isSelected: false,
                isInit: false
            };
            return state
                .set(
                "torrents",
                state.get("torrents").push(newId)
            ).set(
                "torrentsById",
                state.get("torrentsById").set(newId, torrent)
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
            return state
                .set(
                "torrentsById",
                state.get("torrentsById").set(action.id, torrent)
            );
        }
        default :
        {
            return state;
        }
    }
}

const uiState = Map({
        "navIsOpen": true
    }
);

export function uiReducer(state = uiState, action = null) {
    switch (action.type) {
        case TOGGLE_NAV:
        {
            return state.set("navIsOpen", action.open)
        }
        default :
        {
            return state;
        }
    }
}