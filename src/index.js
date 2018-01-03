import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter as Router} from 'react-router-dom';

import './index.css';
import App from './App';
import { allReducers } from "./reducers/index";
import registerServiceWorker from './registerServiceWorker';

export const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <MuiThemeProvider>
                <App/>
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
