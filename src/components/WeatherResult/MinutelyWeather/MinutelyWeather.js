import React, {PureComponent} from 'react'
import ResultComponentBase from '../ResultComponentBase'

import PropTypes from 'prop-types'

import log from '../../../utilities/log'

import './MinutelyWeather.scss'

class MinutelyWeather extends ResultComponentBase {

    static propTypes = {
        data: PropTypes.object
    }

    state = {
        componentName: 'minutely-weather'
    }

    render() {

        log(this, 'Render');

        const { data } = this.props

        console.log(data)

        return (
            <section className={`${data.componentName} result-component`}>
                <h2>Minutely Weather</h2>
                {
                    this.summary(data.componentName)
                }
                <div>
                    <canvas id="MinuteChart" />
                </div>
            </section>
        )
    }

    componentDidMount() {

        const { data } = this.props.data

        var ctx = document.getElementById('MinuteChart').getContext("2d")
        console.log(data);

        // let doughnutChart = new Chart(this.canvas, {
        //     type: 'doughnut',
        //     data: this.doughnutData
        //     //options: options
        // });

        ctx.canvas.width = 800;

        this.minuteChart = new Chart.Line(ctx, {
            "data": {
                labels: data.map((item, index) => {
                    return `${index}min`
                }),
                datasets: [{
                    label: "Precipitation Intensity",
                    borderColor: '#ff0000',
                    backgroundColor: '#ff0000',
                    fill: false,
                    data: data.map((item) => {
                        return item.precipIntensity
                    }),
                    yAxisID: "y-axis-1",
                }, {
                    label: "Precipitation Probability",
                    borderColor: '#0070ff',
                    backgroundColor: '#0070ff',
                    fill: false,
                    data: data.map((item) => {
                        return item.precipProbability
                    }),
                    yAxisID: "y-axis-2"
                }]
            },
            options: {
                responsive: false,
                hoverMode: 'index',
                stacked: false,
                title:{
                    display: true,
                    text:'Precipitation Intensity & Precipitation Probability'
                },
                scales: {
                    yAxes: [{
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "left",
                        id: "y-axis-1",
                    }, {
                        type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                        display: true,
                        position: "right",
                        id: "y-axis-2",

                        // grid line settings
                        gridLines: {
                            drawOnChartArea: false, // only want the grid lines for one axis to show up
                        }
                    }]
                }
            }
        });
    }
}

export default MinutelyWeather
