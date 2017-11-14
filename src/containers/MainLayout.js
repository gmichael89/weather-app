import React, {PureComponent, Component} from 'react'

// Utilities
import log from '../utilities/log'

// Components
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'

class MainLayout extends PureComponent {

    render() {

        log(this, 'Render');

        return (
            <div className="main-layout">
                <Header />
                <main>
                    {this.props.children}
                </main>
                <Footer />
            </div>
        )
    }
}

export default MainLayout
