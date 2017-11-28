import React, {PureComponent} from 'react'
import Skycons from 'react-skycons'

import './ResultComponentBase.scss'

class ResultComponentBase extends PureComponent {

    chartjsDoughnutDefaults = {
        type: 'doughnut',
        options: {
            verticallyCentertext: true,
            tooltips: {
                enabled: false
            },
            events: [], // Disable events (hover, click etc.)
            maintainAspectRatio: false,
            animationEasing: 'easeInOutQuart',
            cutoutPercentage: 50,
            animation: {
                animateScale: true,
                duration: 1600
            },
            title: {
                fontSize: 30,
                //display: true
            }
        }
    }

    formatIconName() {
        return `${this.props.data.icon.replace(/-/g, '_').toUpperCase()}`
    }

    parseDate(utcSeconds) {

        if (!utcSeconds) return '';

        var d = new Date(0); // 0 sets the date to the epoch
        d.setUTCSeconds(utcSeconds);

        return d.toString()
    }

    summary(componentName) {

        const { data } = this.props

        return (
            <div className={`${componentName}__summary`}>
                <time>{this.parseDate(data.time)}</time>
                <div>
                    {data.summary}
                </div>
                <div>
                    <div className="result-component__icon-wrapper">
                        <Skycons
                            className="result-component__icon"
                            color="black"
                            icon={this.formatIconName()}
                            autoplay={true} />
                    </div>
                </div>
            </div>
        )
    }

    convertToPercentage(value) {
        return `${value * 100}%`
    }
}

export default ResultComponentBase
