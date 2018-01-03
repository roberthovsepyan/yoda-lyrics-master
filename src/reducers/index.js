import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import tracks from './tracksSearch';
import lyrics from './lyricsSearch';

export const allReducers=combineReducers({
    form: formReducer,
    tracks,
    lyrics
});