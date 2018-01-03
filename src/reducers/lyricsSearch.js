export default function (state={isFetching: false}, action) {
    switch (action.type) {
        case 'FETCH_LYRICS':
            return {...state, isFetching: true,};
        case 'FETCH_LYRICS_SUCCESS':
            return {...state, yodafied: '', error: '', isFetching: false, lyrics: action.payload};
        case 'YODAFY':
            return {...state, isFetching: true};
        case 'YODAFY_SUCCESS':
            return {...state, isFetching: false, yodafied: action.payload};
        case 'YODAFY_FAIL':
            return {...state, isFetching: false, error: 'Sorry, yodaspeak API is currently not working'};
        default:
            return state;
    }
};