require('normalize.css/normalize.css');
require('styles/app.less');
require('font-awesome-webpack');

import 'core-js/fn/object/assign';
import 'common/polyfill'

import React from 'react';
import ReactDOM from 'react-dom';
import App from './Router';

import History from 'common/History.jsx'
import store from './stores/'
import {
    syncHistoryWithStore
} from 'react-router-redux';

const history = syncHistoryWithStore(History, store)
// Render the main component into the dom
ReactDOM.render(<App store={store} history ={history} />, document.getElementById('app'));
