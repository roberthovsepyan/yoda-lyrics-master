import React, {Component} from 'react';

import Search from './Search';
import Tracks from './Tracks';
import {Header} from './Header';


class Homepage extends Component {
    render () {
        return (
            <div>
                <Header/>
                <Search/>
                <Tracks/>
            </div>
        );
    }
}

export default Homepage;