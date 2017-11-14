import React, {PureComponent} from 'react'
import Skycons from 'react-skycons'

import './ResultComponent.scss'

class ResultComponent extends PureComponent {

    formatIconName() {
        return `${this.props.data.icon.replace(/-/g, '_').toUpperCase()}`
    }

    summary(componentName) {

        const { data } = this.props

        return (
            <div className={`${componentName}__summary`}>
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
}

export default ResultComponent
