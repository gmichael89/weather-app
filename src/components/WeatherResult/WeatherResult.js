import React, {PureComponent, Component} from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import log from '../../utilities/log'

import {
    getLocationData,
    setDeviceCoordsFromPath
} from '../../reducers/modules/location-search'

import {
    getWeatherData,
    requestWeatherData
} from '../../reducers/modules/weather-result'

class WeatherResult extends PureComponent {

    static propTypes = {
        coords: PropTypes.object
    }

    state = {
        loading: 0
    }
    // state = {
    //     coords: {
    //         lat: '',
    //         lng: ''
    //     }
    // }

    constructor(props) {

        super(props);

        //this.receivedLocation = this.receivedLocation.bind(this);
    }

    render() {

        log(this, 'Render');

        let { coords } = this.props.getLocationData;

        if (!coords.lat.length && this.props.match.params.lat) {
            this.updateDeviceCoordsFromPath();
        }

        var hasCoords = coords.lat.length ? true : false;
        if (!hasCoords) {
            return <Redirect to="/" push={false} />
        }

        return (
            <div className="weather-result">
                <h2>Result</h2>

                {
                    hasCoords ?
                    <section>
                        <h2>Getting Results For..</h2>
                        { this.dataTableHTML() }
                    </section>
                    :
                    ''
                 }
            </div>
        )
    }

    // Can call setState
    componentDidMount() {
        console.log('componentDidMount')
        const { coords } = this.props.getLocationData;

        console.log(coords)
        if (coords.lat) {
            this.props.requestWeatherData(coords);
        }
    }

    updateDeviceCoordsFromPath() {

        this.props.setDeviceCoordsFromPath({
            lat: this.props.match.params.lat,
            lng: this.props.match.params.lng
        });
    }

    dataTableHTML() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Latitude:</td>
                        <td>{this.props.getLocationData.coords.lat}</td>
                    </tr>
                    <tr>
                        <td>Longitude:</td>
                        <td>{this.props.getLocationData.coords.lng}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => ({
    getLocationData: getLocationData(state),
    getWeatherData: getWeatherData(state)
});

export default connect(mapStateToProps, { requestWeatherData, setDeviceCoordsFromPath })(WeatherResult)
