import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {green900, green600, lightGreen300} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

import YodaHead from '../images/yoda_head.png';
import Yodafy from '../images/yodafy.svg';
import {fetchLyrics, fetchLyricsSuccess, yodafy, yodafySuccess, yodafyFail} from '../actions/lyricsSearch';

const style = {
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
    borderRadius: 4,
    padding: 20,
    width: 1000,
    backgroundColor: 'white',
    textAlign: 'center',
    color: green900,
};

const linkStyle = {
    display: 'flex',
    justifyContent: 'center'
};

const yodafyStyle = {
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 200,
    height: 50,
    borderRadius: 4,
    paddingLeft: 20,
    backgroundColor: lightGreen300,
    fontSize: 'x-large',
    cursor: 'pointer'
};

const headingStyle = {
    marginLeft: 25,
};

class ActiveTrack extends Component {

    componentDidMount () {
        this.props.fetch_lyrics(this.props.match.params.id);
    };

    renderLyrics () {
        //so React represents newlines correctly
        return this.props.lyrics.lyrics.lyrics_body.split('*')[0].split('\n').map((item, key) => {
                return <span key={key}>{item}<br/></span>
        })
    };

    yodafyLyrics () {
        //replacing spaces and newlines for correct api call
        let value = this.props.lyrics.lyrics.lyrics_body.split('*')[0].replace(/\n/g, '. ').replace(/\s/g, '+');
        this.props.yodafy_lyrics(value);
    };

    renderYodafied () {
        if (!this.props.lyrics.yodafied && !this.props.lyrics.error) {return ''}
        else if (!this.props.lyrics.yodafied) {return this.props.lyrics.error}
        else {return this.props.lyrics.yodafied.replace(/\./g, '\n').split('\n').map((item, key) => {
            return <span key={key}>{item}<br/></span>
        })}
    };

    //find the name of the track and artist
    findTrack () {
        let song = {};
        this.props.tracks.tracks.forEach((track) => {
            if (track.track_id === Number(this.props.match.params.id)) {
                song.name = track.track_name;
                song.artist = track.artist_name;
            }
        });
        return song;
    };

    render () {
        if (!this.props.lyrics.lyrics || this.props.lyrics.isFetching) {
            return <div className='loading'>
                        <CircularProgress size={80} thickness={7} color={green600}/>
                   </div>
        }
        return (
            <div>
                <div style={linkStyle}>
                    <Link to='/'>
                        <img src={YodaHead} alt='yoda_head'/>
                    </Link>
                </div>
                <div style={{textAlign: 'center'}}>
                    <p style={{color: green900, fontSize: 'x-large'}}>{this.findTrack().name}</p>
                    <p style={{fontSize: 'large'}}>{this.findTrack().artist}</p>
                </div>
                <div style={style}>
                    {this.renderYodafied() || this.renderLyrics()}
                    <div style={yodafyStyle} onClick={this.yodafyLyrics.bind(this)}>
                        <img height='30px' width='30px' src={Yodafy} alt='yodafy'/>
                        <p style={headingStyle}>Yodafy!</p>
                    </div>
                </div>
            </div>
        );
    }
}

//musixmatch api only provides 30% of the lyrics for free
function fetch_lyrics (value) {
    return (dispatch) => {
        let url = 'https://musixmatchcom-musixmatch.p.mashape.com/wsr/1.1/track.lyrics.get?track_id=' + value;
        dispatch(fetchLyrics());
        return fetch(url, {headers: {'Accept': 'application/json', 'X-Mashape-Key': 'Yllm790cC9mshjl2vkAWojoxh3z3p15JuwQjsnx88m2g79Z5KJ'}})
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                } else {
                    return response.json();
                }})
            .then(response => dispatch(fetchLyricsSuccess(response)))
            .catch(err => console.warn(err));
    }
}

function yodafy_lyrics (value) {
    return (dispatch) => {
        let url = 'https://yoda.p.mashape.com/yoda?sentence=' + value;
        dispatch(yodafy());
        return fetch(url, {headers: {'Accept': 'text/plain', 'X-Mashape-Key': 'Yllm790cC9mshjl2vkAWojoxh3z3p15JuwQjsnx88m2g79Z5KJ'}})
            .then((response) => {
                if (!response.ok) {
                    dispatch(yodafyFail());
                    throw Error(response.statusText);
                } else {
                    return response.text();
                }})
            .then(response => {dispatch(yodafySuccess(response));})
            .catch(err => console.warn(err));
    }
}

ActiveTrack = connect((state) => ({lyrics: state.lyrics, tracks: state.tracks}), {fetch_lyrics, yodafy_lyrics})(ActiveTrack);

ActiveTrack = withRouter(ActiveTrack);

export default ActiveTrack;
