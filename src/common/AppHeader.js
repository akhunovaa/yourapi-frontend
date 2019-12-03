import React, {Component} from 'react';
import './AppHeader.css';

class AppHeader extends Component {
    render() {

        return (
            <div>
                { !this.props.authenticated ? (
                    <div className="header-authenticated">

                    </div>
                ) : (
                    <div className="header">

                    </div>
                )}
            </div>
        )
    }
}

export default AppHeader;
