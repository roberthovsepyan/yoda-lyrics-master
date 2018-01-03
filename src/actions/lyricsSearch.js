export const fetchLyrics = () => {
    return {
        type: 'FETCH_LYRICS'
    }
};

export const fetchLyricsSuccess = (lyrics) => {
    return {
        type: 'FETCH_LYRICS_SUCCESS',
        payload: lyrics
    }
};

export const yodafySuccess = (lyrics) => {
    return {
        type: 'YODAFY_SUCCESS',
        payload: lyrics
    }
};

export const yodafy = () => {
    return {
        type: 'YODAFY'
    }
};

export const yodafyFail = () => {
    return {
        type: 'YODAFY_FAIL'
    }
};
