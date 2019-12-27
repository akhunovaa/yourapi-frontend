import React, {Component} from 'react';
import './ProfileHeader.css';
import {Link, NavLink} from "react-router-dom";
import {Icon, Input, Dropdown, Portal, Divider, Segment, List} from "semantic-ui-react";

class ProfileHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const { open } = this.state;
        return (
            <div className="profile-header">
                <div className='left-profile-header-links'>
                    <div className='header-left-logo'>
                        <Link to="/"><b style={{color: 'white'}}>YourAPI</b></Link>
                    </div>
                    <div className='header-navigation-link'>
                        <Link to="#" style={{color: 'white'}}>Личный кабинет</Link>
                    </div>
                    <div className='lk-page-link'>
                        <Link to="#" style={{color: 'white'}}><b>Настройки профиля</b></Link>
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
                        <Link to="#" style={{color: '#FFFFFF'}}>Магазин</Link>
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
                        <Portal
                            closeOnPortalMouseLeave
                            closeOnTriggerClick
                            closeOnDocumentClick
                            trigger={
                                <Icon link name='user circle' />
                            }
                            open={open}
                            onOpen={this.handleOpen}
                            onClose={this.handleClose}>
                            <div id='profile-portal' onClick={this.handleClose}>
                                <Segment className="profile-segment"
                                         style={{position: 'fixed',  right: 12,  top: '76px', zIndex: 1000}}>
                                    <List size={"big"}>
                                        <List.Item>
                                            <List.Content>
                                                <NavLink to="/"><span className="portal-item portal-item-main">Личный кабинет</span></NavLink>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <NavLink to="/profile"><span className="portal-item">Настройка профиля</span></NavLink>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <NavLink to="/profile/administration"><span className="portal-item">Администрирование</span></NavLink>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Divider style={{marginTop: 0,  marginBottom: 0, paddingTop: 0, paddingBottom: 0}}/>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <NavLink to="/"><span className="portal-item">Справка</span></NavLink>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Divider style={{marginTop: 0,  marginBottom: 0, paddingTop: 0, paddingBottom: 0}}/>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <a onClick={this.props.onLogout}>
                                                    <span className="portal-item">Выйти</span>
                                                </a>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </Segment>
                            </div>
                        </Portal>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileHeader;
