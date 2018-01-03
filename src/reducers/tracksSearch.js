export default function (state={isFetching: false}, action) {
    switch (action.type) {
        case 'FETCH_TRACKS':
            return {...state, isFetching: true};
        case 'FETCH_TRACKS_SUCCESS':
            return {...state, isFetching: false, tracks: action.payload};
        case 'TRACKS_AVAILABLE':
            return {...state, available: action.payload};
        default:
            return state;
    }
};