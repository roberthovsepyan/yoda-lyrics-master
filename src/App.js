import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom';

import {NotFound} from './components/NotFound';
import Homepage from './components/Homepage';
import ActiveTrack from './components/ActiveTrack';
import LightSaber from './images/lightsaber_luke.svg';

class App extends Component {
    render() {
        return (
            <div>
                <div style={{position: 'fixed', left: 0}}>
                    <img height="650px" width="200px" src={LightSaber} alt="lightsaber"/>
                </div>
                <div style={{position: 'fixed', right: 0}}>
                    <img height="650px" width="200px" src={LightSaber} alt="lightsaber"/>
                </div>
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/track/:id" component={ActiveTrack}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;
