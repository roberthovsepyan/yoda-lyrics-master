export const fetchTracks = () => {
    return {
        type: 'FETCH_TRACKS'
    }
};

export const fetchTracksSuccess = (text) => {
    return {
        type: 'FETCH_TRACKS_SUCCESS',
        payload: text
    }
};

export const tracksAvailable = (number) => {
    return {
        type: 'TRACKS_AVAILABLE',
        payload: number
    }
};