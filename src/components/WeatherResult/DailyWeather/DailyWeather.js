import React, {PureComponent} from 'react'
import ResultComponentBase from '../ResultComponentBase'

import PropTypes from 'prop-types'

import log from '../../../utilities/log'

import './DailyWeather.scss'

class DailyWeather extends ResultComponentBase {

    static propTypes = {
        data: PropTypes.object
    }

    state = {
        componentName: 'daily-weather'
    }

    render() {

        log(this, 'Render');

        const { data } = this.props

        console.log(data)

        return (
            <section className={`${this.state.componentName} result-component`}>
                <h2>Daily Weather</h2>
                {
                    this.summary(this.state.componentName)
                }
            </section>
        )
    }


}

export default DailyWeather
