import React, {Component} from 'react';
import './MobileAppHeader.css';
// import HeaderUserPortal from "../../header/HeaderUserPortal";

class MobileAppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {onLogout, authenticated} = this.props;

        return (
            <div id="mobile_header_container">
                <svg className="mobile_header_body" viewBox="0 0 500 95">
                    <path id="mobile_header_body" d="M 0 0 L 500 0 L 500 95 L 0 95 L 0 0 Z">
                    </path>
                </svg>

                {
                     authenticated ? (
                        <div>
                            {/*<HeaderUserPortal currentUser={currentUser} onLogout={onLogout} {...this.props}/>*/}
                            <div id="login">
                                <svg className="Rectangle_3">
                                    <rect id="Rectangle_3" rx="16" ry="16" x="0" y="0" width="75" height="32">
                                    </rect>
                                </svg>
                                <div id="Log_In">
                                    <a onClick={onLogout} style={{color: 'white'}}>
                                        <span>Выйти</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <HeaderUserPortal currentUser={currentUser} onLogout={onLogout} {...this.props}/>
                        </div>
                    )}
            </div>
        )
    }
}

export default MobileAppHeader;
