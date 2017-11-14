import React, {PureComponent} from 'react'
import ResultComponent from '../ResultComponent'

import PropTypes from 'prop-types'

import log from '../../../utilities/log'

import './CurrentWeather.scss'

class CurrentWeather extends ResultComponent {

    static propTypes = {
        data: PropTypes.object
    }

    state = {
        componentName: 'current-weather'
    }

    render() {

        log(this, 'Render');

        const { data } = this.props

        console.log(data, this.state.componentName)

        return (
            <section className={`${this.state.componentName} result-component`}>
                <h2>Current Weather</h2>
                {
                    this.summary(this.state.componentName)
                }
            </section>
        )
    }
}

export default CurrentWeather
