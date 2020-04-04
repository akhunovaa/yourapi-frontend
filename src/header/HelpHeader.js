import React, {Component} from 'react';
import './HelpHeader.css';
import {Link} from "react-router-dom";
import {Icon, Dropdown} from "semantic-ui-react";
import HeaderUserPortal from "../header/HeaderUserPortal";

class HelpHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const styles = {
            b: {
                color: 'white',
                fontSize: '16px',
                width: '100%'
            },
            span:
                {
                    color: 'white'
                }
        };

        const {currentUser, onLogout} = this.props;

        return (
            <div className="help-header">
                <div className='left-help-header-links'>
                    <div className='header-help-logo'>
                        <Link to="/"><b style={styles.b}>YourAPI</b></Link>
                    </div>
                    <div className='header-help-sub'>
                        <Link to="/help"><span style={styles.span}>Справка</span></Link>
                    </div>
                </div>
                <div className='right-profile-administration-header-links'>
                    <div className='help-header-navlink'>
                        <Link to="/shop" style={{color: '#FFFFFF'}}>Магазин API</Link>
                    </div>
                    <div className='profile-administration-header-language-navlink'>
                        <Dropdown text='RU' closeOnChange>
                            <Dropdown.Menu>
                                <Dropdown.Item text='RU' description='Русский' />
                                <Dropdown.Item text='EN' description='English' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='header-right-navlink-bell'>
                        <Icon link size={'large'}  name='bell outline' />
                    </div>
                    <div className='header-right-navlink-bookmark'>
                        <Icon link size={'large'}  name='bookmark outline' />
                    </div>
                    <div className='header-right-navlink-profile'>
                        <HeaderUserPortal currentUser={currentUser} onLogout={onLogout} {...this.props}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default HelpHeader;
