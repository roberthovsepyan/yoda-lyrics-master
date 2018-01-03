import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm,} from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SearchButton from 'material-ui/svg-icons/action/search';
import {green500, green800} from 'material-ui/styles/colors';

import {fetchTracks, fetchTracksSuccess, tracksAvailable} from '../actions/tracksSearch';

const searchStyle = {
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 4,
    padding: 20,
    boxShadow: '3px 3px 5px 0px rgba(0,0,0,0.4)',
    display: 'flex',
    width: 700,
    height: 60,
    justifyContent: 'center',
    backgroundColor: green500,
    alignItems: 'center'
};

const inputStyle = {
    display: 'inline-block',
    backgroundColor: 'white',
    borderRadius: 4,
    height: 50,
    width: 268,
    paddingLeft: 12,
};

const iconStyle = {
    height: 40,
    width: 40
};

const buttonStyle = {
    marginLeft: 5,
    verticalAlign: 'middle',

};


class Search extends Component {
    submit = (values) => {
        if (!values.lyrics) {this.props.reset();}
        else {
            let value = values.lyrics.replace(/\s/g, '+');
            this.props.fetchMusic(value);
            this.props.reset();
        }
    };

    render () {
        console.log(this.props.tracks.tracks, this.props.tracks.available);
        return (
            <div style={searchStyle}>
                <div>
                    <form onSubmit={this.props.handleSubmit(this.submit)}>
                        <div style={inputStyle}>
                            <Field name="lyrics" component={TextField} underlineFocusStyle={{borderColor: green500}}
                                   hintText="Type song title, artist or lyrics"/>
                        </div>
                        <FloatingActionButton style={buttonStyle} backgroundColor={green800} iconStyle={iconStyle} type="submit">
                            <SearchButton />
                        </FloatingActionButton>
                    </form>
                </div>
            </div>
        );
    }
}

function fetchMusic(value) {
    return (dispatch) => {
        let url = 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.search?f_has_lyrics=1&page=1&page_size=20&q=' +
            value + '&s_track_rating=desc';
        dispatch(fetchTracks());
        return fetch(url, {headers: {'Accept': 'application/json', 'X-Mashape-Key': 'Yllm790cC9mshjl2vkAWojoxh3z3p15JuwQjsnx88m2g79Z5KJ'}})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    //find out how many tracks with search results there are available
                    for (let pair of response.headers.entries()) {
                        if (pair[0]==='x-musixmatch-available') {
                            dispatch(tracksAvailable(pair[1]));
                        }
                    }
                    return response.json();
                }})
            .then(response => dispatch(fetchTracksSuccess(response)))
            .catch(err => console.warn(err));
    }
}

Search = connect((state) => ({tracks: state.tracks}), {fetchMusic})(Search);

Search = reduxForm({
    form: 'lyrics'
})(Search);

export default Search;