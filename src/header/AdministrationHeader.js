import React, {Component} from 'react';
import './AdministrationHeader.css';
import {Link} from "react-router-dom";
import {Icon, Dropdown} from "semantic-ui-react";
import HeaderUserPortal from "../header/HeaderUserPortal";

class AdministrationHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {currentUser, onLogout} = this.props;

        return (
            <div className="profile-administration-header">
                <div className='left-profile-administration-header-links'>
                    <div className='header-left-logo'>
                        <Link to="/"><b style={{color: 'white'}}>YourAPI</b></Link>
                    </div>
                    <div className='header-navigation-link'>
                        <Link to="#" style={{color: 'white'}}>Личный кабинет</Link>
                    </div>
                    <div className='lk-page-link'>
                        <Link to="/profile" style={{color: '#A7C8F4'}}>Настройки профиля</Link>
                    </div>
                    <div className='admin-page-link'>
                        <Link to="/profile/administration" style={{color: 'white'}}><b>Администрирование</b></Link>
                    </div>
                    <div className='api-page-link'>
                        <Link to="/profile/api" style={{color: '#A7C8F4'}}>Мои API</Link>
                    </div>
                    <div className='linked-api-page-link'>
                        <Link to="#" style={{color: '#A7C8F4'}}>Подключенные API</Link>
                    </div>
                </div>
                <div className='right-profile-administration-header-links'>
                    <div className='profile-administration-header-navlink'>
                        <Link to="/shop" style={{color: '#FFFFFF'}}>Магазин</Link>
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

export default AdministrationHeader;
