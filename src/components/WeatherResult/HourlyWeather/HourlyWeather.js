import React, {PureComponent} from 'react'
import ResultComponentBase from '../ResultComponentBase'

import PropTypes from 'prop-types'

import log from '../../../utilities/log'

import './HourlyWeather.scss'

class HourlyWeather extends ResultComponentBase {

    static propTypes = {
        data: PropTypes.object
    }

    state = {
        componentName: 'hourly-weather'
    }

    render() {

        log(this, 'Render');

        const { data } = this.props

        console.log(data)

        return (
            <section className={`${this.state.componentName} result-component`}>
                <h2>Hourly Weather</h2>
                {
                    this.summary(this.state.componentName)
                }
            </section>
        )
    }

    componentDidMount() {
        // this.cloudCover = document.getElementById('CloudCover')
        // console.log(this.doughnutData);
        // let doughnutChart = new Chart(this.cloudCover, {
        //     type: 'doughnut',
        //     data: this.doughnutData
        //     //options: options
        // });
        // new Chart(document.getElementById("CloudCover1"),{
        //     "type":"doughnut",
        //     "data":{
        //         "labels":["Red","Blue","Yellow"],
        //         "datasets":[{
        //             "label":"My First Dataset",
        //             "data":[300,50,100],
        //             "backgroundColor":[
        //                 "rgb(255, 99, 132)",
        //                 "rgb(54, 162, 235)",
        //                 "rgb(255, 205, 86)"
        //             ]
        //         }]
        //     }
        // });
        // var myChart = new Chart(document.getElementById('CloudCover'), {
        //     type: 'bar',
        //     data: {
        //         labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        //         datasets: [{
        //             label: '# of Votes',
        //             data: [12, 19, 3, 5, 2, 3],
        //             backgroundColor: [
        //                 'rgba(255, 99, 132, 0.2)',
        //                 'rgba(54, 162, 235, 0.2)',
        //                 'rgba(255, 206, 86, 0.2)',
        //                 'rgba(75, 192, 192, 0.2)',
        //                 'rgba(153, 102, 255, 0.2)',
        //                 'rgba(255, 159, 64, 0.2)'
        //             ],
        //             borderColor: [
        //                 'rgba(255,99,132,1)',
        //                 'rgba(54, 162, 235, 1)',
        //                 'rgba(255, 206, 86, 1)',
        //                 'rgba(75, 192, 192, 1)',
        //                 'rgba(153, 102, 255, 1)',
        //                 'rgba(255, 159, 64, 1)'
        //             ],
        //             borderWidth: 1
        //         }]
        //     },
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        //             }]
        //         }
        //     }
        // });
    }
}

export default HourlyWeather
