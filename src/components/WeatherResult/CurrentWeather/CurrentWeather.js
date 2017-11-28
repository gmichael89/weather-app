import React, {PureComponent} from 'react'
import ResultComponentBase from '../ResultComponentBase'

import PropTypes from 'prop-types'
import deepMerge from 'deepmerge'

import log from '../../../utilities/log'

import './CurrentWeather.scss'

class CurrentWeather extends ResultComponentBase {

    static propTypes = {
        data: PropTypes.object
    }

    state = {
        componentName: 'current-weather'
    }

    render() {

        log(this, 'Render');

        const { data } = this.props

        console.log(data)

        return (
            <section className={`${data.componentName} result-component`}>
                <h2>Current Weather</h2>
                {
                    this.summary(data.componentName)
                }
                <div>
                    <canvas id="CloudCover" />
                </div>
            </section>
        )
    }

    componentDidMount() {

        var ctx = document.getElementById('CloudCover').getContext("2d")
        const { data } = this.props

        this.doughnutData = {
            datasets: [
                {
                    label: 'Cloud Cover',
                    data: [data.cloudCover, parseFloat((1 - data.cloudCover))],
                    backgroundColor: ['rgb(255, 99, 132)', '#EEE'],
                    label: ['Cloud Cover']
                }
            ]
        };

        ctx.canvas.height = 200;

        var mergedConfig = deepMerge(this.chartjsDoughnutDefaults, {
            data: this.doughnutData,
            options: {
                title: {
                    text: `${this.convertToPercentage(this.props.data.cloudCover)}`
                }
            }
        })

        this.doughnutChart = new Chart(ctx, mergedConfig);
    }
}

export default CurrentWeather
