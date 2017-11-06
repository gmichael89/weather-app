
import 'isomorphic-fetch'
import { polyfill } from 'es6-promise'

import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import {render} from 'react-dom'
import {Provider} from 'react-redux'

// Store
import store from './reducers/store'

// Components
import Dashboard from './components/Dashboard'
import WeatherResult from './components/WeatherResult/WeatherResult'

render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/result' component={WeatherResult} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('app')
)
