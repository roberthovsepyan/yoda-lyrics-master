import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import {green500} from 'material-ui/styles/colors';

const headingStyle = {
    color: green500,
};

const textStyle = {
    color: 'grey'
};

class Track extends Component {
    render () {
        return (
            <div className='track'>
                <h3 style={headingStyle}>{this.props.trackName}</h3>
                <p style={textStyle}>{this.props.artistName}</p>
                <Divider/>
            </div>
        );
    }
}

export default Track;