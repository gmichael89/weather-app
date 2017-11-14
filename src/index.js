
import 'isomorphic-fetch'
import { polyfill } from 'es6-promise'

import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

// Store
import store from './reducers/store'

// Components
import MainLayout from './containers/MainLayout'
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
