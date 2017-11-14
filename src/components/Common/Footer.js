import React, {PureComponent, Component} from 'react'

// Utilities
import log from '../../utilities/log'

class Footer extends PureComponent {

    render() {

        log(this, 'Render');

        return (
            <footer>
                <a href="https://darksky.net/poweredby/">Powered by Dark Sky</a>
            </footer>
        )
    }
}

export default Footer
