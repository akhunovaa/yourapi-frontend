import React, {Component} from 'react';
import './AppHeader.css';
import {Link} from "react-router-dom";
import {Icon, Input, Dropdown} from "semantic-ui-react";

class AppHeader extends Component {
    render() {

        return (
            <div>
                { this.props.authenticated ? (
                    <div className="header-authenticated">
                        <div className='header-left-logo'>
                            <Link to="/"><b style={{color: 'white'}}>YourAPI</b></Link>
                        </div>
                        <div className='header-center-container'>
                            <div className='header-center-navlink'>
                                <Link to="/"><b style={{color: '#A5A5A5'}}>Магазин API</b></Link>
                            </div>
                            <div className='header-center-navlink'>
                                <Link to="/"><b style={{color: '#A5A5A5'}}>Интеграторы</b></Link>
                            </div>
                            <div className='header-center-search-input'>
                                <Input size={'small'} fluid icon={{ name: 'search', link: true, iconPosition: 'right' }}
                                       placeholder='Поиск...' id="search" name="search"/>
                            </div>
                        </div>
                        <div className="header-right-menu">
                            <div className='header-right-navlink'>
                                <Dropdown text='RU' closeOnChange>
                                    <Dropdown.Menu>
                                        <Dropdown.Item text='RU' description='Русский' />
                                        <Dropdown.Item text='EN' description='English' />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <div className='header-right-navlink'>
                                <Icon link size={'large'}  name='bell outline' />
                            </div>
                            <div className='header-right-navlink'>
                                <Icon link size={'large'}  name='bookmark outline' />
                            </div>
                            <div className='header-right-navlink-profile'>
                                <Icon link size={'huge'} name='user circle' />
                            </div>
                        </div>
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
