import React, {PureComponent, Component} from 'react'

import WeatherResult from './WeatherResult/WeatherResult'
import LocationSearch from './LocationSearch/LocationSearch'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import log from '../utilities/log'

class Dashboard extends PureComponent {

    static propTypes = {
        //location: PropTypes.func.isRequired
    }

    state = {
        coords: {
            lat: '',
            lng: ''
        }
    }

    constructor() {
        super();

        this.receivedLocation = this.receivedLocation.bind(this);
    }

    render() {

        log(this, 'Render');
        const { coords } = this.state;
        //console.log(coords);

        var hasCoords = coords.lat ? true : false;

        return (
            <div className="dashboard">
                <h1>Weather App</h1>
                {
                    hasCoords ?
                    <WeatherResult coords={this.state.coords} />
                    :
                    <LocationSearch onReceivedLocation={this.receivedLocation} />
                }
            </div>
        )
    }

    receivedLocation(coords) {

        this.setState({
            coords
        });
    }
}

const mapStateToProps = (state) => ({
    //location: getLocationData(state)
});

export default connect(mapStateToProps)(Dashboard)
