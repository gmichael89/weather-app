import React, {PureComponent, Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import PropTypes from 'prop-types'
import AppConfig from 'AppConfig'
import log from '../../utilities/log'

import {
    getDeviceCoords,
    getCoordData,
    getLocationData,
    requestGeocodeAddress
} from '../../reducers/modules/location-search'

class LocationSearch extends PureComponent {

    static propTypes = {
        //onReceivedLocation: PropTypes.func.isRequired
    }

    state = {
        location: {
            address: ''
        }
    }

    render() {

        log(this, 'Render');

        var hasCoords = this.props.getLocationData.coords.lat;
        if (hasCoords) {
            return <Redirect to={`/result/${this.props.getLocationData.coords.lat},${this.props.getLocationData.coords.lng}` } push={true} />
        }

        return (
            <div className='location-search'>
                <form
                    className='location-search__form'
                    onSubmit={this.onSubmit}>
                    <input
                        className='input'
                        type='text'
                        onChange={this.inputOnBlur}
                        value={this.state.location.address} />
                    <button
                        className="btn btn--search-location"
                        onClick={this.geocodeAddress}
                        disabled={ hasCoords ? true : false }>
                        Geocode Address
                    </button>
                    <button
                        className="btn btn--get-device-location"
                        onClick={this.getDeviceLocation}
                        disabled={ hasCoords ? true : false }>
                        Get Device Location
                    </button>
                </form>
                <div className="location-search__result-data">
                    {
                        hasCoords ? (
                            this.dataTableHTML()
                        ) :
                        <div>Enter your location above</div>
                    }
                </div>
            </div>
        )
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

    geocodeAddress = event => {

        event.preventDefault();

        let address = this.state.location.address;

        if (address.length) {
            this.props.requestGeocodeAddress(address);
        }
    }

    getDeviceLocation = event => {

        event.preventDefault();

        this.props.getDeviceCoords();

    }

    inputOnBlur = ({ target }) => {

        this.setState({
            location: {
                address: `${target.value}`
            }
        });

    }
}

const mapStateToProps = (state) => ({
    getLocationData: getLocationData(state)
});

export default connect(mapStateToProps, {
    getDeviceCoords,
    requestGeocodeAddress
})(LocationSearch);
