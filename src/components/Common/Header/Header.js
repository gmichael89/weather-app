import React, {PureComponent, Component} from 'react'

// Utilities
import log from '../../../utilities/log'

import './Header.scss'

class Header extends PureComponent {

    render() {

        log(this, 'Render');

        return (
            <header className="header">
                <div className="header__title">Weather Checker App</div>
            </header>
        )
    }
}

export default Header
