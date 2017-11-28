import React, { PureComponent, Component } from 'react'

// Utilities
import log from '../../utilities/log'

// Components
import Header from '../../components/Common/Header/Header.js'
import Footer from '../../components/Common/Footer/Footer.js'

import './MainLayout.scss'

class MainLayout extends PureComponent {

    render() {

        log(this, 'Render');

        return (
            <div className="main-layout">
                <Header />
                <main className="main-layout__content">
                    {this.props.children}
                </main>
                <Footer />
            </div>
        )
    }
}

export default MainLayout
