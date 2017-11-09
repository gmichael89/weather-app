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

                var data = JSON.parse(json);

                // if (data.results.length) {
                //     var result = data.results[0];
                //
                //     var payload = {
                //         success: 1,
                //         location: {
                //             address: '',
                //             coords: {
                //                 lat: result.geometry.location.lat,
                //                 lng: result.geometry.location.lng
                //             }
                //         }
                //     };
                    //console.log('Success geocoding position.', payload);

                //     dispatch(updatingUserCoords(payload));
                // }

                dispatch(updatingWeatherData({
                    success: 1,
                    data
                }));

            }).catch((ex) => {
                console.log(ex);
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
