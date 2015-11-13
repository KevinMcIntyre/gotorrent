// Torrent Actions

export const ADD_TORRENT = 'ADD_TORRENT';
export const SELECT_TORRENT = 'SELECT_TORRENT';
export const PAUSE_TORRENT = 'PAUSE_TORRENT';

export function addTorrent(torrent) {
    return {
        type: ADD_TORRENT, torrent
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


// UI Actions

export const TOGGLE_NAV = 'TOGGLE_NAV';

export function toggleNav(open) {
    return {
        type: TOGGLE_NAV, open
    }
}