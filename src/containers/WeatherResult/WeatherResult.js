import React, {PureComponent, Component} from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// Utilities
import log from '../../utilities/log'

// Components
import CoordinateDataTable from '../../components/Common/CoordinateDataTable'

// Containers
import TabView from '../TabView/TabView'

// Components
import CurrentWeather from '../../components/WeatherResult/CurrentWeather/CurrentWeather'
import DailyWeather from '../../components/WeatherResult/DailyWeather/DailyWeather'
import HourlyWeather from '../../components/WeatherResult/HourlyWeather/HourlyWeather'
import MinutelyWeather from '../../components/WeatherResult/MinutelyWeather/MinutelyWeather'

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

    getTabMappings() {

        return [{
            title: 'Currently',
            component: CurrentWeather,
            apiDataAccessor: 'currently'
        },{
            title: 'Hourly',
            component: HourlyWeather,
            apiDataAccessor: 'hourly'
        },{
            title: 'Daily',
            component: DailyWeather,
            apiDataAccessor: 'daily'
        },{
            title: 'Minutely',
            component: MinutelyWeather,
            apiDataAccessor: 'minutely'
        }]
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
                        {
                            <TabView data={this.buildTabData()} />
                        }
                    </div>
                    : ''
                 }
            </section>
        )
    }

    buildTabData = () => {
        return this.getTabMappings().map((item) => {
            return {
                ...item,
                data: this.props.getWeatherData[item.apiDataAccessor]
            }
        })
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
