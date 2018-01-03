export default function (state={isFetching: false, isAdding: false}, action) {
    switch (action.type) {
        case 'FETCH_TRACKS':
            return {...state, isFetching: true};
        case 'FETCH_TRACKS_SUCCESS':
            return {...state, isFetching: false, tracks: action.payload.tracks, formValue: action.payload.value};
        case 'TRACKS_AVAILABLE':
            return {...state, available: action.payload};
        case 'ADD_TRACKS':
            return {...state, isAdding: true};
        case 'ADD_TRACKS_SUCCESS':
            return {...state, isAdding: false, tracks: state.tracks.concat(action.payload)};
        default:
            return state;
    }
};