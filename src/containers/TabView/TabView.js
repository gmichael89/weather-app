import React, {PureComponent, Component} from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import PropTypes from 'prop-types'

// Utilities
import log from '../../utilities/log'

import './TabView.scss'

class TabView extends PureComponent {

    state = {
        activeIndex: 0
    }

    render() {

        log(this, 'Render');

        const { data } = this.props;

        //console.log(data, this.state);

        return (
            <div className="tab-view">
                <div className="tab-view__tabs">
                {
                    this.generateTabs(data)
                }
                </div>
                <div className="tab-view__panels">
                {
                    this.generatePanels(data)
                }
                </div>
            </div>
        )
    }

    generateTabs(data) {

        const style = {
            display: 'none'
        };

        return data.map((item, i) => {

            var cssClass = `tab-view__tab ${this.state.activeIndex == i ? 'tab-view__tab--active' : '' }`

            return (
                <div className={cssClass}
                    onClick={this.tabClicked}
                    key={i}
                    index={i}>{item.title}</div>
            )
        })
    }

    generatePanels(data) {

        return data.map((item, i) => {

            var cssClass = `tab-view__panel ${this.state.activeIndex == i ? 'tab-view__panel--active' : '' }`

            return (
                <div className={cssClass} key={i}>
                    {
                        React.createElement(item.component, {
                            //...props,
                            data: item.data
                        })
                    }
                </div>
            )
        })
    }

    tabClicked = ({target}) => {

        this.setState({
            activeIndex: target.getAttribute('index')
        })
    }

}

export default TabView
