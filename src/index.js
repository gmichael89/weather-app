
import 'isomorphic-fetch'
import 'normalize.css'
import 'chart.js'

import { polyfill } from 'es6-promise'

import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

// Store
import store from './reducers/store'

// Components
import MainLayout from './containers/MainLayout/MainLayout'
import Dashboard from './containers/Dashboard'
import WeatherResult from './containers/WeatherResult/WeatherResult'

//<Route exact path='/' component={Dashboard} />

render(
    <Provider store={store}>
        <MainLayout>
            <Router>
                <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route exact path='/result/:lat,:lng' component={WeatherResult} />
                        <Redirect to='/' component={Dashboard} />
                </Switch>
            </Router>

        </MainLayout>
    </Provider>,
    document.getElementById('app')
)

// Register ChartJS Plugin
Chart.pluginService.register({

    beforeDraw: function(chart) {

        if (!chart.options.verticallyCentertext) return;

        var width = chart.chart.width;
        var height = chart.chart.height;
        var ctx = chart.chart.ctx;

        ctx.restore();

        var fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em Quicksand, Arial";
        ctx.textBaseline = "middle";

        var text = chart.options.title.text,
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2;

        ctx.fillText(text, textX, textY);
        ctx.save();
    }
});
