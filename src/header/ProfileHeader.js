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
                        <Link to="#" style={{color: '#A7C8F4'}}>Администрирование</Link>
                    </div>
                    <div className='api-page-link'>
                        <Link to="#" style={{color: '#A7C8F4'}}>Мои API</Link>
                    </div>
                    <div className='linked-api-page-link'>
                        <Link to="#" style={{color: '#A7C8F4'}}>Подключенные API</Link>
                    </div>
                </div>
                <div className='right-profile-header-links'>
                    <div className='profile-header-navlink'>
                        <Link to="#" style={{color: '#FFFFFF'}}>Магазин API</Link>
                    </div>
                    <div className='profile-header-language-navlink'>
                        <Dropdown text='RU' closeOnChange>
                            <Dropdown.Menu>
                                <Dropdown.Item label={{ color: 'white'}} text='RU' description='Русский' />
                                <Dropdown.Item label={{ color: 'white'}} text='EN' description='English' />
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
                                <Icon link size={'huge'} name='user circle' />
                            }
                            open={open}
                            onOpen={this.handleOpen}
                            onClose={this.handleClose}>
                            <div id='profile-portal' onClick={this.handleClose}>
                                <Segment className="profile-segment"
                                         style={{position: 'fixed',  right: 12,  top: '76px', zIndex: 1000, }}>
                                    <List size={"big"}>
                                        <List.Item>
                                            <List.Content>
                                                <NavLink to="/" style={{color: 'black'}}>Личный кабинет</NavLink>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <NavLink to="/profile" style={{color: 'gray'}}>Настройка профиля</NavLink>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <NavLink to="/" style={{color: 'gray'}}>Администрирование</NavLink>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Divider/>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <NavLink to="/" style={{color: 'gray'}}>Справка</NavLink>
                                            </List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <Divider/>
                                        </List.Item>
                                        <List.Item>
                                            <List.Content>
                                                <a onClick={this.props.onLogout} style={{color: 'gray'}}>
                                                    <span>Выйти</span>
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
