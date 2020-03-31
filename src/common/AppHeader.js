import React, {Component} from 'react';
import './AppHeader.css';
import {Link, NavLink, withRouter} from "react-router-dom";
import {Icon, Input, Dropdown, Portal, Divider, Segment, List, Button, Image} from "semantic-ui-react";
import ProfileHeader from "../header/ProfileHeader";
import AdministrationHeader from "../header/AdministrationHeader";
import ApiHeader from "../header/ApiHeader";

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        this.renderSwitch = this.renderSwitch.bind(this);
    }

    renderSwitch(path) {
        switch(path) {
            case '/':
                return <HomeHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/integrator':
                return <IntegratorHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop':
                return <ShopHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/profile':
                return <ProfileHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/profile/administration':
                return <AdministrationHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/profile/api':
                return <ApiHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/data':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/finance':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/mobile':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/map':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/adv':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/social':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/health':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/sport':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/web':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            case '/shop/category/other':
                return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
            default:
                return <HomeHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
        }
    }

    render() {
        const path=this.props.location.pathname;
        return (
            <div style={{maxHeight: '64px'}}>
                { this.props.authenticated ? (
                    this.renderSwitch(path)
                ) : (
                    <div className="header">

                    </div>
                )}
            </div>
        )
    }
}

class HomeHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            imageUrl: this.props.currentUser ? this.props.currentUser.imageUrl : ''
        };
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    componentDidMount() {

    }

    render() {
        const { open } = this.state;
        return (
            <div className="header-authenticated">
                <div className='header-left-logo'>
                    <Link to="/"><b style={{color: 'white'}}>YourAPI</b></Link>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-navlink-merch'>
                        <Link to="/shop"><b style={{color: '#A5A5A5'}}>Магазин</b></Link>
                    </div>
                    <div className='header-center-navlink-integration'>
                        <Link to="/integrator"><b style={{color: '#A5A5A5'}}>Интеграторы</b></Link>
                    </div>
                    <div className='header-center-search-input'>
                        <Input size={'small'} fluid icon={{ name: 'search', link: true}}
                               className='header-center-search' placeholder='Поиск...' id="search" name="search"/>
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
                                    this.state.imageUrl ? (
                                        <div className="profile-header-avatar">
                                            <Image src={this.state.imageUrl + "/40/40"} size='small' circular verticalAlign='middle'/>
                                        </div>
                                    ) : (
                                        <Icon link name='user circle' />
                                    )
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
                                                <NavLink to="/"><span className="portal-item portal-item-main">Главная страница</span></NavLink>
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
        );
    }
}

class IntegratorHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            imageUrl: this.props.currentUser ? this.props.currentUser.imageUrl : ''
        };
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    componentDidMount() {

    }

    render() {
        const { open } = this.state;
        return (
            <div className="header-authenticated">
                <div className='header-left-logo active-logo'>
                    <Link to="/">YourAPI</Link>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-navlink-merch inactive-header-link'>
                        <Link to="/shop" style={{color: '#A5A5A5'}}>Магазин</Link>
                    </div>
                    <div className='header-center-navlink-integration active-header'>
                        <Link to="/integrator" style={{color: '#4F4F4F'}}>Интеграторы</Link>
                    </div>
                    <div className='header-center-search-input'>
                        <Input size={'small'} fluid icon={{ name: 'search', link: true}}
                               className='header-center-search' placeholder='Поиск...' id="search" name="search"/>
                    </div>
                </div>
                <div className="header-right-menu">
                    <div className='header-right-center-container'>
                        <div className='api-create-button-container'>
                            <NavLink to='/profile/api?page=add' ><Button fluid className='api-create-button' style={{background: '#F39847'}}><span className='api-create-button-text'>Добавить API</span></Button></NavLink>
                        </div>
                    </div>
                    <div className='header-right-navlink'>
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
                                this.state.imageUrl ? (
                                    <div className="profile-header-avatar">
                                        <Image src={this.state.imageUrl + "/40/40"} size='small' circular verticalAlign='middle'/>
                                    </div>
                                ) : (
                                    <Icon link name='user circle' />
                                )
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
                                                <NavLink to="/"><span className="portal-item portal-item-main">Главная страница</span></NavLink>
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
        );
    }
}

class ShopHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            imageUrl: this.props.currentUser ? this.props.currentUser.imageUrl : ''
        };
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    componentDidMount() {

    }

    render() {
        const { open } = this.state;
        return (
            <div className="header-authenticated">
                <div className='header-left-logo active-logo'>
                    <Link to="/">YourAPI</Link>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-navlink-merch active-header'>
                        <Link to="/shop" style={{color: '#4F4F4F'}}>Магазин</Link>
                    </div>
                    <div className='header-center-navlink-integration inactive-header-link'>
                        <Link to="/integrator" style={{color: '#A5A5A5'}}>Интеграторы</Link>
                    </div>
                    <div className='header-center-search-input'>
                        <Input size={'small'} fluid icon={{ name: 'search', link: true}}
                               className='header-center-search' placeholder='Поиск...' id="search" name="search"/>
                    </div>
                </div>
                <div className="header-right-menu">
                    <div className='header-right-center-container'>
                        <div className='api-create-button-container'>
                            <NavLink to='/profile/api?page=add' ><Button fluid className='api-create-button' style={{background: '#F39847'}}><span className='api-create-button-text'>Добавить API</span></Button></NavLink>
                        </div>
                    </div>
                    <div className='header-right-navlink'>
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
                                this.state.imageUrl ? (
                                    <div className="profile-header-avatar">
                                        <Image src={this.state.imageUrl + "/40/40"} size='small' circular verticalAlign='middle'/>
                                    </div>
                                ) : (
                                    <Icon link name='user circle' />
                                )
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
                                                <NavLink to="/"><span className="portal-item portal-item-main">Главная страница</span></NavLink>
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
        );
    }
}

class ShopCategoryHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            imageUrl: this.props.currentUser ? this.props.currentUser.imageUrl : ''
        };
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    componentDidMount() {

    }

    render() {
        const { open } = this.state;
        return (
            <div className="header-authenticated">
                <div className='header-left-logo active-logo'>
                    <Link to="/">YourAPI</Link>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-navlink-merch active-header no-border-header-link'>
                        <Link to="/shop" style={{color: '#4F4F4F'}}>Магазин</Link>
                    </div>
                    <div className='header-center-navlink-integration inactive-header-link'>
                        <Link to="/integrator" style={{color: '#A5A5A5'}}>Интеграторы</Link>
                    </div>
                    <div className='header-center-search-input'>
                        <Input size={'small'} fluid icon={{ name: 'search', link: true}}
                               className='header-center-search' placeholder='Поиск...' id="search" name="search"/>
                    </div>
                </div>
                <div className="header-right-menu">
                    <div className='header-right-center-container'>
                        <div className='api-create-button-container'>
                            <NavLink to='/profile/api?page=add' ><Button fluid className='api-create-button' style={{background: '#F39847'}}><span className='api-create-button-text'>Добавить API</span></Button></NavLink>
                        </div>
                    </div>
                    <div className='header-right-navlink'>
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
                                this.state.imageUrl ? (
                                    <div className="profile-header-avatar">
                                        <Image src={this.state.imageUrl + "/40/40"} size='small' circular verticalAlign='middle'/>
                                    </div>
                                ) : (
                                    <Icon link name='user circle' />
                                )
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
                                                <NavLink to="/"><span className="portal-item portal-item-main">Главная страница</span></NavLink>
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
        );
    }
}
export default withRouter(AppHeader);
