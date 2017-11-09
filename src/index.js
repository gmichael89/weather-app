
import 'isomorphic-fetch'
import { polyfill } from 'es6-promise'

import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

// Store
import store from './reducers/store'

// Components
import Dashboard from './containers/Dashboard'
import WeatherResult from './containers/WeatherResult/WeatherResult'

render(
    <Provider store={store}>
        <Router>
            <div>
                <Switch>
                    <Route exact path='/' component={Dashboard} />
                    <Route exact path='/result/:lat,:lng' component={WeatherResult} />
                    <Redirect to='/' component={Dashboard} />
                </Switch>
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
)
