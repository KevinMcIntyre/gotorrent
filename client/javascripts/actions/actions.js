// Torrent Actions
export const ADD_TORRENT = 'ADD_TORRENT';
export const SELECT_TORRENT = 'SELECT_TORRENT';
export const PAUSE_TORRENT = 'PAUSE_TORRENT';
export const UPDATE_TORRENT = 'UPDATE_TORRENT';
export const REMOVE_TORRENT = 'REMOVE_TORRENT';


export function addTorrent(info) {
    return {
        type: ADD_TORRENT, info
    }
}

export function selectTorrent(id) {
    return {
        type: SELECT_TORRENT, id
    }
}

export function pauseTorrent(id) {
    return {
        type: PAUSE_TORRENT, id
    }
}

export function updateTorrent(torrent) {
    return {
        type: UPDATE_TORRENT, torrent
    }
}

export function removeTorrent(id) {
    return {
        type: REMOVE_TORRENT, id
    }
}

// UI Actions
export const TOGGLE_NAV = 'TOGGLE_NAV';
export const TOGGLE_MAGNET_MODAL = 'TOGGLE_MAGNET_MODAL';

export function toggleNav(open) {
    return {
        type: TOGGLE_NAV, open
    }
}

export function toggleMagnetModal(open) {
    return {
        type: TOGGLE_MAGNET_MODAL, open
    }
}