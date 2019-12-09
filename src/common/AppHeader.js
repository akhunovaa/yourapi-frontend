import React, {Component} from 'react';
import './AppHeader.css';
import {Link, NavLink} from "react-router-dom";
import {Icon, Input, Dropdown, Portal, Button, Divider, Segment, List} from "semantic-ui-react";

class AppHeader extends Component {


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
                                <Input size={'small'} fluid icon={{ name: 'search', link: true}}
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
                ) : (
                    <div className="header">

                    </div>
                )}
            </div>
        )
    }
}

export default AppHeader;
