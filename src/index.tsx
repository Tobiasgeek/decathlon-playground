import React from 'react';
import ReactDOM from 'react-dom';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import Index from './views/Index'
import Admin from './views/Admin'

import reportWebVitals from './reportWebVitals';

import './assets/css/material-dashboard-react.css?v=1.6.0'
import './assets/css/index.css'

ReactDOM.render(
    <Router>
        <Switch>
            <Route strict path="/admin" component={Admin} />
            <Route path="/" component={Index} />
        </Switch>
    </Router>
, document.getElementById('root') );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
