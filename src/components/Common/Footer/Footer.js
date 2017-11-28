import React, {PureComponent, Component} from 'react'

// Utilities
import log from '../../../utilities/log'

import './Footer.scss'

class Footer extends PureComponent {

    render() {

        log(this, 'Render');

        return (
            <footer className="footer">
                <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
            </footer>
        )
    }
}

export default Footer
