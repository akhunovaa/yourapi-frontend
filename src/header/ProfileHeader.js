import React, {Component} from 'react';
import './ProfileHeader.css';
import {NavLink} from "react-router-dom";
import {Icon, Dropdown} from "semantic-ui-react";
import HeaderUserPortal from "./HeaderUserPortal";

class ProfileHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {currentUser, onLogout} = this.props;

        return (
            <div className="profile-header">
                <div className='left-profile-header-links'>
                    <div className='header-left-logo'>
                        <NavLink to="/" className='white-inactive-link'>YourAPI</NavLink>
                    </div>
                    <div className='header-navigation-link'>
                        <NavLink to="/profile" className='white-inactive-link'>Личный кабинет</NavLink>
                    </div>
                    <div className='lk-page-link'>
                        <NavLink to="/profile" className='white-inactive-link'>Настройки профиля</NavLink>
                    </div>
                    <div className='admin-page-link'>
                        <NavLink to="/profile/administration" className='blue-inactive-link'>Администрирование</NavLink>
                    </div>
                    <div className='api-page-link'>
                        <NavLink to="/profile/api" className='blue-inactive-link'>Мои API</NavLink>
                    </div>
                    <div className='linked-api-page-link'>
                        <NavLink to="/profile/api" className='blue-inactive-link'>Подключенные API</NavLink>
                    </div>
                </div>
                <div className='right-profile-header-links'>
                    <div className='profile-header-navlink'>
                        <NavLink to="/shop" className='white-inactive-link'>Магазин</NavLink>
                    </div>
                    <div className='profile-header-language-navlink'>
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

export default ProfileHeader;
