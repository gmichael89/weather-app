import { combineReducers } from 'redux'

import locationsearch from './modules/location-search'
import weatherresult from './modules/weather-result'

export default combineReducers({
    locationsearch,
    weatherresult
});
