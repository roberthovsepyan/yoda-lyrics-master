import React, {Component} from 'react';
import {connect} from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import {green900} from 'material-ui/styles/colors';

import {addTracks, addTracksSuccess} from '../actions/tracksSearch';

class LoadMore extends Component {
    handleClick () {
        //calculate what page to search for in the api call
        let page = this.props.tracks.tracks.length/30 + 1;
        this.props.fetchMore(this.props.tracks.value, page);
    };

    render () {
        return (
            <div style={{marginTop: 15}}>
                <RaisedButton label={this.props.tracks.isAdding ? 'Loading...' : 'Load more'} fullWidth
                              labelColor={green900} onClick={this.handleClick.bind(this)}/>
            </div>
        );
    }
}

function fetchMore (value, page)  {
    return (dispatch) => {
        let url = `https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.search?f_has_lyrics=1&page=${page}&page_size=30&q=` +
            value + '&s_track_rating=desc';
        dispatch(addTracks());
        return fetch(url, {headers: {'Accept': 'application/json', 'X-Mashape-Key': 'Yllm790cC9mshjl2vkAWojoxh3z3p15JuwQjsnx88m2g79Z5KJ'}})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    return response.json();
                }})
            .then(response => dispatch(addTracksSuccess(response)))
            .catch(err => console.warn(err));
    }
}

LoadMore = connect((state) => ({tracks: state.tracks}), {fetchMore})(LoadMore);

export default LoadMore;