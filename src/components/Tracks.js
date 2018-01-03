import React, {Component} from 'react';
import {connect} from 'react-redux';
import Divider from 'material-ui/Divider';
import {green900, green600} from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';
import {Link} from 'react-router-dom';

import Track from './Track';

const style = {
    marginTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
    borderRadius: 4,
    padding: 20,
    width: 1000,
    backgroundColor: 'white',
    color: green900
};

class Tracks extends Component {

    renderTracks () {
        let tracks = [];
        if (this.props.tracks.tracks!==undefined) {
            this.props.tracks.tracks.forEach((track) => {
                tracks.push(
                    <Link key={track.track_id} to={`/track/${track.track_id}`} style={{ textDecoration: 'none' }}>
                        <Track trackName={track.track_name} artistName={track.artist_name}/>
                    </Link>)
            })
        }
        return tracks;
    };

    render () {
        if (this.props.tracks.isFetching) {
            return <div className='loading'>
                        <CircularProgress size={80} thickness={7} color={green600}/>
                   </div>
        }
        else if (!this.props.tracks.tracks) {return <p> </p>}
        else if (this.props.tracks.tracks.length<1) {return <div className='noMatch'><p>No matches found</p></div>}
        return (
            <div style={style}>
                <h2>TRACKS</h2>
                <Divider/>
                {this.renderTracks()}
            </div>
        );
    }
}

Tracks = connect((state) => ({tracks: state.tracks}))(Tracks);

export default Tracks;