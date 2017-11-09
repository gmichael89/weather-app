import React, {PureComponent, Component} from 'react'
import PropTypes from 'prop-types'
import Skycons from 'react-skycons'

class CurrentWeather extends PureComponent {

    static propTypes = {
        data: PropTypes.object
    }

    render() {

        const { data } = this.props
console.log(this.props, this.state)
        console.log(data)

        return (
            <div>
                CurrentWeather
            </div>
        )
    }
}

export default CurrentWeather
