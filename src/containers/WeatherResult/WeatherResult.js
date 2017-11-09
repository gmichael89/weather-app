import React, {PureComponent, Component} from 'react'

import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import log from '../../utilities/log'

// Components
import CurrentWeather from '../../components/WeatherResult/CurrentWeather'

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

        log(this, 'Render');

        if ( ! this.hasCoords()) {
            return <Redirect to="/" push={false} />
        }

        console.log(this.props.getWeatherData)

        return (
            <div className="weather-result">
                <h1>Result</h1>
                <section>
                { this.dataTableHTML() }
                {
                    // !this.props.hasRequestFailed
                    // ?
                    (this.props.isGettingWeatherData) &&

                         this.renderLoading()


                    // :
                    //
                }
                {
                    (this.props.isRequestSuccessful) &&

                            <CurrentWeather data={this.props.getWeatherData.currently} />

                    // :
                    //     <p>There was a problem requesting the data.</p>
                 }
                 </section>
            </div>
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
        if (!this.props.getLocationData.lat) {
            this.props.setDeviceCoordsFromPath({
                lat: this.props.match.params.lat,
                lng: this.props.match.params.lng
            });
        }

        this.props.requestWeatherData(coords);

    }

    hasCoords() {
        return this.props.lat || this.props.match.params.lat
    }

    dataTableHTML() {
        return (
            <section>
                <h2>Your current position</h2>
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
            </section>
        );
    }
}

const mapStateToProps = (state) => ({
    getLocationData: getLocationData(state),
    getWeatherData: getWeatherData(state),
    isGettingWeatherData: isGettingWeatherData(state),
    hasRequestFailed: hasRequestFailed(state),
    isRequestSuccessful: isRequestSuccessful(state)
});

export default connect(mapStateToProps, { requestWeatherData, setDeviceCoordsFromPath })(WeatherResult)
