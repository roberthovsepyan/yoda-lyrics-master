import React from 'react';
import {green900} from 'material-ui/styles/colors';
import YodaHead from '../images/yoda_head.png';

const style = {
    color: green900,
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center'
};

const headingStyle = {
    marginRight: 15,
};

export const Header = () => {
    return (
        <div style={style}>
            <h1 style={headingStyle}>Yoda: Lyrics Master</h1>
            <img src={YodaHead} alt='yoda_head'/>
        </div>
    );
};