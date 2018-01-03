export const fetchTracks = () => {
    return {
        type: 'FETCH_TRACKS'
    }
};

export const fetchTracksSuccess = (tracks, value) => {
    return {
        type: 'FETCH_TRACKS_SUCCESS',
        payload: {tracks, value}
    }
};

export const tracksAvailable = (number) => {
    return {
        type: 'TRACKS_AVAILABLE',
        payload: number
    }
};

export const addTracksSuccess = (tracks) => {
    return {
        type: 'ADD_TRACKS_SUCCESS',
        payload: tracks
    }
};

export const addTracks = () => {
    return {
        type: 'ADD_TRACKS'
    }
};