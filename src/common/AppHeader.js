import React, {Component} from 'react';
import './AppHeader.css';
import {Link, NavLink, Route, Switch, withRouter} from "react-router-dom";
import {Button, Dropdown, Icon} from "semantic-ui-react";
import ProfileHeader from "../header/ProfileHeader";
import UserProfileHeader from "../header/UserProfileHeader";
import AdministrationHeader from "../header/AdministrationHeader";
import ApiHeader from "../header/ApiHeader";
import HeaderUserPortal from "../header/HeaderUserPortal";
import HeaderNotAuthenticatedUserPortal from "../header/HeaderNotAuthenticatedUserPortal";
import SearchBox from "./SearchBox";
// import Login from "../app/App";
// import OAuth2RedirectHandler from "../login/oauth2/OAuth2RedirectHandler";
// import Api from "../profile/api/Api";
import PrivateRoute from '../common/PrivateRoute';
import HelpHeader from "../header/HelpHeader";
import LoadingIndicator from '../common/LoadingIndicator';

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        // this.renderSwitch = this.renderSwitch.bind(this);
    }

    // renderSwitch(path) {
    //     switch (path) {
    //         case '/':
    //             return <HomeHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/integrator':
    //             return <IntegratorHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop':
    //             return <ShopHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/profile':
    //             return <ProfileHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/profile/administration':
    //             return <AdministrationHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/profile/api':
    //             return <ApiHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/data':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/finance':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/mobile':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/map':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/adv':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/social':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/health':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/sport':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/web':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         case '/shop/category/other':
    //             return <ShopCategoryHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //         default:
    //             return <HomeHeader currentUser={this.props.currentUser} onLogout={this.props.onLogout}/>;
    //     }
    // }

    render() {
        const {onLogout, authenticated, currentUser, handleSliderChange} = this.props;
        return (
            <div style={{maxHeight: '64px'}}>
                <Switch>
                    <Route exact path="/"
                           render={(props) => <HomeHeader handleSliderChange={handleSliderChange}
                                                          authenticated={authenticated} currentUser={currentUser}
                                                          onLogout={onLogout} {...props} />}/>
                    <Route path="/help"
                           render={(props) => <HelpHeader handleSliderChange={handleSliderChange}
                                                          authenticated={authenticated} currentUser={currentUser}
                                                          onLogout={onLogout} {...props} />}/>
                    <Route exact path="/integrator"
                           render={(props) => <IntegratorHeader authenticated={authenticated} currentUser={currentUser}
                                                                onLogout={onLogout} {...props} />}/>
                    <Route exact path="/shop"
                           render={(props) => <ShopHeader handleSliderChange={handleSliderChange} authenticated={authenticated} currentUser={currentUser}
                                                          onLogout={onLogout} {...props} />}/>
                    <Route exact path="/shop/category/:category?"
                           render={(props) => <ShopHeader handleSliderChange={handleSliderChange} authenticated={authenticated} currentUser={currentUser}
                                                          onLogout={onLogout} {...props} />}/>
                    <Route exact path="/shop/category/:category?/api/:id?"
                           render={(props) => <ShopHeader handleSliderChange={handleSliderChange} authenticated={authenticated} currentUser={currentUser}
                                                          onLogout={onLogout} {...props} />}/>

                    <PrivateRoute exact path="/profile" authenticated={authenticated} currentUser={currentUser}
                                  component={ProfileHeader} onLogout={onLogout}/>
                    <PrivateRoute exact path="/profile/api" authenticated={authenticated} currentUser={currentUser}
                                  component={ApiHeader} onLogout={onLogout}/>
                    <PrivateRoute exact path="/profile/administration" authenticated={authenticated}
                                  currentUser={currentUser} component={AdministrationHeader} onLogout={onLogout}/>

                    {authenticated ? (
                        <PrivateRoute exact path="/profile/:id?" authenticated={authenticated} currentUser={currentUser}
                                      component={UserProfileHeader} onLogout={onLogout}/>
                    ) : (
                        <Route exact path="/profile/:id?"
                               render={(props) => <HomeHeader handleSliderChange={handleSliderChange}
                                                              authenticated={authenticated} currentUser={currentUser}
                                                              component={HomeHeader}
                                                              onLogout={onLogout} {...props} />}/>
                    )}

                </Switch>
                {/*{this.props.authenticated ? (*/}
                {/*this.renderSwitch(path)*/}
                {/*) : (*/}
                {/*<div className="header">*/}

                {/*</div>*/}
                {/*)}*/}
            </div>
        )
    }
}

class HomeHeader extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {loading: true};
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({
                loading: false
            });
        }
    }

    componentWillMount() {
        this._isMounted = false;
    }


    handleOpenSearchOpen = () => {
        let element = document.getElementById('searchInput');
        let childNodes = element.parentNode.childNodes;
        for (let item of childNodes) {
            let classes = item.classList;
            if (classes.contains('clicked')) {
                // setTimeout(function () {
                //     item.classList.remove('clicked');
                // }, 100);
                item.classList.remove('clicked');
            }
        }
        if (element.classList.contains('clicked')) {
            setTimeout(function () {
                element.classList.remove('clicked');
            }, 50);
        } else {
            element.classList.add('clicked');
        }
    };


    render() {
        const {loading} = this.state;
        const {currentUser, onLogout, authenticated, handleSliderChange} = this.props;

        if (loading) {
            return <LoadingIndicator/>
        }
        return (
            <div className="header-authenticated">
                <div className='header-left-logo'>
                    <Link to="/"><b style={{color: 'white'}}>YourAPI</b></Link>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-navlink-merch'>
                        <Link to="/shop"><b style={{color: '#A5A5A5'}}>Магазин</b></Link>
                    </div>
                    {/*<div className='header-center-navlink-integration'>*/}
                    {/*<Link to="/integrator"><b style={{color: '#A5A5A5'}}>Интеграторы</b></Link>*/}
                    {/*</div>*/}
                    <div className='header-center-search-input'>
                        <SearchBox onClick={this.handleOpenSearchOpen}/>
                    </div>
                </div>
                <div className="header-right-menu">
                    <div className='header-right-navlink'>
                        <Dropdown text='RU' closeOnChange>
                            <Dropdown.Menu>
                                <Dropdown.Item text='RU' description='Русский'/>
                                <Dropdown.Item text='EN' description='English'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='header-right-navlink-bell'>
                        <Icon link size={'large'} name='bell outline'/>
                    </div>
                    <div className='header-right-navlink-bookmark'>
                        <Icon link size={'large'} name='bookmark outline'/>
                    </div>
                    <div className='header-right-navlink-profile'>
                        {authenticated ? (
                            <HeaderUserPortal currentUser={currentUser} onLogout={onLogout}/>) : (
                            <HeaderNotAuthenticatedUserPortal handleSliderChange={handleSliderChange}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

class IntegratorHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {currentUser, onLogout, authenticated} = this.props;

        return (
            <div className="header-authenticated">
                <div className='header-left-logo active-logo'>
                    <Link to="/">YourAPI</Link>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-navlink-merch inactive-header-link'>
                        <Link to="/shop" style={{color: '#A5A5A5'}}>Магазин</Link>
                    </div>
                    {/*<div className='header-center-navlink-integration active-header'>*/}
                    {/*<Link to="/integrator" style={{color: '#4F4F4F'}}>Интеграторы</Link>*/}
                    {/*</div>*/}
                    <div className='header-center-search-input'>
                        <SearchBox onClick={this.handleOpenSearchOpen}/>
                    </div>
                </div>
                <div className="header-right-menu">
                    <div className='header-right-center-container'>
                        <div className='api-create-button-container'>
                            <NavLink to='/profile/api?page=add'><Button fluid className='api-create-button'
                                                                        style={{background: '#F39847'}}><span
                                className='api-create-button-text'>Добавить API</span></Button></NavLink>
                        </div>
                    </div>
                    <div className='header-right-navlink'>
                        <Dropdown text='RU' closeOnChange>
                            <Dropdown.Menu>
                                <Dropdown.Item text='RU' description='Русский'/>
                                <Dropdown.Item text='EN' description='English'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='header-right-navlink-bell'>
                        <Icon link size={'large'} name='bell outline'/>
                    </div>
                    <div className='header-right-navlink-bookmark'>
                        <Icon link size={'large'} name='bookmark outline'/>
                    </div>
                    <div className='header-right-navlink-profile'>
                        {authenticated ? (
                            <HeaderUserPortal currentUser={currentUser} onLogout={onLogout} {...this.props}/>) : (
                            <HeaderNotAuthenticatedUserPortal {...this.props}/>)}
                    </div>
                </div>

            </div>
        );
    }
}

class ShopHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {currentUser, onLogout, authenticated, handleSliderChange} = this.props;

        return (
            <div className="header-authenticated">
                <div className='header-left-logo active-logo'>
                    <Link to="/">YourAPI</Link>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-navlink-merch active-header'>
                        <Link to="/shop" style={{color: '#4F4F4F'}}>Магазин</Link>
                    </div>
                    {/*<div className='header-center-navlink-integration inactive-header-link'>*/}
                    {/*<Link to="/integrator" style={{color: '#A5A5A5'}}>Интеграторы</Link>*/}
                    {/*</div>*/}
                    <div className='header-center-search-input'>
                        <SearchBox onClick={this.handleOpenSearchOpen}/>
                    </div>
                </div>
                <div className="header-right-menu">
                    <div className='header-right-center-container'>
                        <div className='api-create-button-container'>
                            <NavLink to='/profile/api?page=add'><Button fluid className='api-create-button'
                                                                        style={{background: '#F39847'}}><span
                                className='api-create-button-text'>Добавить API</span></Button></NavLink>
                        </div>
                    </div>
                    <div className='header-right-navlink'>
                        <Dropdown text='RU' closeOnChange>
                            <Dropdown.Menu>
                                <Dropdown.Item text='RU' description='Русский'/>
                                <Dropdown.Item text='EN' description='English'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='header-right-navlink-bell'>
                        <Icon link size={'large'} name='bell outline'/>
                    </div>
                    <div className='header-right-navlink-bookmark'>
                        <Icon link size={'large'} name='bookmark outline'/>
                    </div>
                    <div className='header-right-navlink-profile'>
                        {authenticated ? (
                            <HeaderUserPortal currentUser={currentUser} onLogout={onLogout}/>) : (
                            <HeaderNotAuthenticatedUserPortal handleSliderChange={handleSliderChange}/>)}
                    </div>
                </div>
            </div>
        );
    }
}

class ShopCategoryHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {currentUser, onLogout, authenticated} = this.props;

        return (
            <div className="header-authenticated">
                <div className='header-left-logo active-logo'>
                    <Link to="/">YourAPI</Link>
                </div>
                <div className='header-center-container'>
                    <div className='header-center-navlink-merch active-header no-border-header-link'>
                        <Link to="/shop" style={{color: '#4F4F4F'}}>Магазин</Link>
                    </div>
                    {/*<div className='header-center-navlink-integration inactive-header-link'>*/}
                    {/*<Link to="/integrator" style={{color: '#A5A5A5'}}>Интеграторы</Link>*/}
                    {/*</div>*/}
                    <div className='header-center-search-input'>
                        <SearchBox onClick={this.handleOpenSearchOpen}/>
                    </div>
                </div>
                <div className="header-right-menu">
                    <div className='header-right-center-container'>
                        <div className='api-create-button-container'>
                            <NavLink to='/profile/api?page=add'><Button fluid className='api-create-button'
                                                                        style={{background: '#F39847'}}><span
                                className='api-create-button-text'>Добавить API</span></Button></NavLink>
                        </div>
                    </div>
                    <div className='header-right-navlink'>
                        <Dropdown text='RU' closeOnChange>
                            <Dropdown.Menu>
                                <Dropdown.Item text='RU' description='Русский'/>
                                <Dropdown.Item text='EN' description='English'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className='header-right-navlink-bell'>
                        <Icon link size={'large'} name='bell outline'/>
                    </div>
                    <div className='header-right-navlink-bookmark'>
                        <Icon link size={'large'} name='bookmark outline'/>
                    </div>
                    <div className='header-right-navlink-profile'>
                        {authenticated ? (
                            <HeaderUserPortal currentUser={currentUser} onLogout={onLogout} {...this.props}/>) : (
                            <HeaderNotAuthenticatedUserPortal {...this.props}/>)}
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(AppHeader);
