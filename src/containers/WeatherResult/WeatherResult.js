import React, {PureComponent, Component} from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// Utilities
import log from '../../utilities/log'

// Components
import { CoordinateDataTable } from '../../components/Common/CoordinateDataTable'
import CurrentWeather from '../../components/WeatherResult/CurrentWeather/CurrentWeather'
import DailyWeather from '../../components/WeatherResult/DailyWeather/DailyWeather'

import {
    getLocationData,
    setDeviceCoordsFromPath
} from '../../reducers/modules/location-search'

import {
    getWeatherData,
    isGettingWeatherData,
    requestWeatherData,
    hasRequestFailed,
    isRequestSuccessful
} from '../../reducers/modules/weather-result'

class WeatherResult extends PureComponent {

    static propTypes = {
        coords: PropTypes.object
    }

    render() {

        const { coords }  = this.props.getLocationData

        log(this, 'Render');

        if ( ! this.hasCoords()) {
            return <Redirect to="/" push={false} />
        }

        return (
            <section className="weather-result">
                <h1>Result</h1>
                {
                    (this.hasCoords()) ?
                        CoordinateDataTable(coords) : ''
                }
                {
                    (this.props.isGettingWeatherData) ?
                         this.renderLoading() : ''
                }
                {
                    (this.props.hasRequestFailed) ?
                        <p>There was a problem requesting the data.</p> : ''
                }
                {
                    (this.props.isRequestSuccessful && !this.props.hasRequestFailed) ?
                        <div>
                            <CurrentWeather data={this.props.getWeatherData.currently} />
                            <DailyWeather data={this.props.getWeatherData.daily} />
                        </div>
                    : ''
                 }
            </section>
        )
    }

    renderLoading() {
        return <p>Loading Results...</p>
    }

    // Can call setState
    componentDidMount() {

        let coords = {
            lat: this.props.getLocationData.lat || this.props.match.params.lat,
            lng: this.props.getLocationData.lng || this.props.match.params.lng
        };

        // If a user has landed on the link.
        if (!this.props.getLocationData.coords.lat.length) {
            this.props.setDeviceCoordsFromPath({
                lat: this.props.match.params.lat,
                lng: this.props.match.params.lng
            });
        }

        this.props.requestWeatherData(coords);

    }

    hasCoords() {
        return (this.props.getLocationData && this.props.getLocationData.coords) || this.props.match.params.lat.length > -1
    }
}

const mapStateToProps = (state) => ({
    getLocationData: getLocationData(state),
    getWeatherData: getWeatherData(state),
    isGettingWeatherData: isGettingWeatherData(state),
    hasRequestFailed: hasRequestFailed(state),
    isRequestSuccessful: isRequestSuccessful(state)
});

export default connect(mapStateToProps, {
    requestWeatherData,
    setDeviceCoordsFromPath
})(WeatherResult)
