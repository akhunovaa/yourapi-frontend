import React, {Component} from 'react';
import './ProfileHeader.css';
import {Link} from "react-router-dom";
import {Icon, Dropdown} from "semantic-ui-react";
import HeaderUserPortal from "./HeaderUserPortal";

class UserProfileHeader extends Component {

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
                        <Link to="/"><b style={{color: 'white'}}>YourAPI</b></Link>
                    </div>
                    <div className='header-navigation-link'>
                        <Link to="/profile" style={{color: '#A7C8F4'}}>Личный кабинет</Link>
                    </div>
                    <div className='lk-page-link'>
                        <Link to="/profile" style={{color: '#A7C8F4'}}><b>Настройки профиля</b></Link>
                    </div>
                    <div className='admin-page-link'>
                        <Link to="/profile/administration" style={{color: '#A7C8F4'}}>Администрирование</Link>
                    </div>
                    <div className='api-page-link'>
                        <Link to="/profile/api" style={{color: '#A7C8F4'}}>Мои API</Link>
                    </div>
                    <div className='linked-api-page-link'>
                        <Link to="#" style={{color: '#A7C8F4'}}>Подключенные API</Link>
                    </div>
                </div>
                <div className='right-profile-header-links'>
                    <div className='profile-header-navlink'>
                        <Link to="/shop" style={{color: '#FFFFFF'}}>Магазин</Link>
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

export default UserProfileHeader;
