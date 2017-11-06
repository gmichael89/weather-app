import { combineReducers } from 'redux'

import dashboard from './modules/dashboard'
import locationsearch from './modules/location-search'
import weatherresult from './modules/weather-result'

export default combineReducers({
    dashboard,
    locationsearch,
    weatherresult
});
