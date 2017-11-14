import React, {PureComponent, Component} from 'react'

// Utilities
import log from '../../utilities/log'

class Header extends PureComponent {

    render() {

        log(this, 'Render');

        return (
            <header>Header</header>
        )
    }
}

export default Header
