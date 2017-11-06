import { createAction, handleActions } from 'redux-actions'

// Actions
export const GET_DEVICE_COORDS = 'weatherapp/locationsearch/GET_DEVICE_COORDS';
export const SET_DEVICE_COORDS_FROM_PATH = 'weatherapp/locationsearch/SET_DEVICE_COORDS_FROM_PATH';
export const UPDATING_DEVICE_COORDS = 'weatherapp/locationsearch/UPDATING_DEVICE_COORDS';
//export const GET_USER_LOCATION = 'weatherapp/locationsearch/GET_USER_LOCATION';

export const GET_GEOCODE_ADDRESS = 'weatherapp/locationsearch/GET_GEOCODE_ADDRESS';
export const UPDATING_GEOCODE_ADDRESS = 'weatherapp/locationsearch/UPDATING_GEOCODE_ADDRESS';

// Action Creators
const gettingDeviceCoords = createAction(GET_DEVICE_COORDS);
const settingDeviceCoordsFromPath = createAction(SET_DEVICE_COORDS_FROM_PATH);
const gettingGeocodeAddress = createAction(GET_GEOCODE_ADDRESS);
const updatingUserCoords = createAction(UPDATING_DEVICE_COORDS);

const Config = require('AppConfig');

// State
const defaultState = {
    isGettingDeviceCoords: false,
    success: 0,
    location: {
        address: '',
        coords: {
            lat: '',
            lng: ''
        }
    }
};

export function setDeviceCoordsFromPath(coords) {

    return (dispatch) => {

        dispatch(settingDeviceCoordsFromPath())

        var payload = {
            success: 1,
            location: {
                address: '',
                coords: {
                    lat: parseFloat(coords.lat).toFixed(7),
                    lng: parseFloat(coords.lng).toFixed(7)
                }
            }
        };

        dispatch(updatingUserCoords(payload));

    }
}

export function getDeviceCoords () {

    return (dispatch) => {

        dispatch(gettingDeviceCoords())

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {

                var payload = {
                    success: 1,
                    location: {
                        address: '',
                        coords: {
                            lat: position.coords.latitude.toFixed(7),
                            lng: position.coords.longitude.toFixed(7)
                        }
                    }
                };
                //console.log('Success getting current position.', payload);

                dispatch(updatingUserCoords(payload));

            }, () => {

                console.log('Error getting current position.');

                dispatch(updatingUserCoords());
            });
        }
        else {
            dispatch(updatingUserCoords());
        }
    }
}

export function requestGeocodeAddress(address) {

    return (dispatch) => {

        dispatch(gettingGeocodeAddress());

        fetch(`${Config.Endpoints.GoogleGeocode}?address=${address}&key=${Config.ApiKeys.GoogleGeocode}`)
        	.then((response) => {

                return response.text();

            }).then((json) => {

                var data = JSON.parse(json);

                if (data.results.length) {
                    var result = data.results[0];

                    var payload = {
                        success: 1,
                        location: {
                            address: '',
                            coords: {
                                lat: result.geometry.location.lat,
                                lng: result.geometry.location.lng
                            }
                        }
                    };
                    //console.log('Success geocoding position.', payload);

                    dispatch(updatingUserCoords(payload));
                }

                dispatch(updatingUserCoords());

            }).catch(function(ex) {
                console.log('Parsing failed', ex);
                dispatch(updatingUserCoords());
            });
    }
}

// Reducer  ---------------------
const reducer = handleActions({
    [gettingDeviceCoords] (state) {
        return {
            ...state,
            isGettingDeviceCoords: true
        }
    },
    [gettingGeocodeAddress] (state) {
        return {
            ...state,
            isGettingDeviceCoords: true
        }
    },
    [updatingUserCoords] (state, { payload }) {
        return {
            ...state,
            isGettingDeviceCoords: false,
            ...payload
        }
    }
}, defaultState)

export default reducer
// -----------------------------

// Selectors - Gets called in mapstateprops
export const getLocationData = (state) => {
    //console.log('Selector: getCoordData', state.locationsearch.location);
    return state.locationsearch.location
}

// export const getIsGettingLocation = (state) => {
//     console.log('getIsGettingLocation', state);
//     state.isGettingLocation
// }
