import { createAction, handleActions } from 'redux-actions'

// Actions
export const GET_WEATHER_DATA = 'weatherapp/weatherresult/GET_WEATHER_DATA';
export const UPDATING_WEATHER_DATA = 'weatherapp/weatherresult/UPDATING_WEATHER_DATA';

// Action Creators
const gettingWeatherData = createAction(GET_WEATHER_DATA);
const updatingWeatherData = createAction(UPDATING_WEATHER_DATA);

const Config = require('AppConfig');
const getWeatherDataUrl = `${Config.Endpoints.GetWeatherData}`;

// State
const defaultState = {
    isGettingWeatherData: false,
    success: 0,
    hasRequestFailed: 0,
    data: null
};

export function requestWeatherData(coords) {
    //console.log('requestWeatherData');
    return (dispatch) => {

        dispatch(gettingWeatherData());

        fetch(`${getWeatherDataUrl}/${coords.lat},${coords.lng}`)
        	.then((response) => {

                return response.text();

            }).then((json) => {

                var response = JSON.parse(json);

                if (response.status != 200) {
                    throw new Error(response.data.message)
                }
console.log(response);
                dispatch(updatingWeatherData({
                    success: 1,
                    data: response.data
                }));

            }).catch((ex) => {
                //console.log('FAILED', ex);

                dispatch(updatingWeatherData({
                    success: 0,
                    hasRequestFailed: 1,
                    data: null
                }))
            })
    }
}

// Reducer  ---------------------
const reducer = handleActions({
    [gettingWeatherData] (state) {
        return {
            ...state,
            isGettingWeatherData: true
        }
    },
    [updatingWeatherData] (state, { payload }) {
        return {
            ...state,
            isGettingWeatherData: false,
            ...payload
        }
    }
}, defaultState)

export default reducer
// -----------------------------

// Selectors - Gets called in mapstateprops
export const getWeatherData = (state) => {
    //console.log('Selector: getWeatherData', state.weatherresult.data);
    return state.weatherresult.data
}

export const isGettingWeatherData = (state) => {
    return state.weatherresult.isGettingWeatherData
}

export const hasRequestFailed = (state) => {
    return state.weatherresult.hasRequestFailed
}

export const isRequestSuccessful = (state) => {
    return state.weatherresult.success
}
