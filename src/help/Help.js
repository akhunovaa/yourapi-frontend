import React, {Component} from 'react';
import './Help.css';
import {NavLink} from "react-router-dom";
import {Menu, Segment, Sidebar} from "semantic-ui-react";
import AuthContainerWrapper from "../home/AuthContainerWrapper";
import {Helmet} from "react-helmet";

class Help extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };

        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({loading: false});
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    render() {

        const {visible, authenticated} = this.props;

        const seo = {
            title: "YourAPI | Справка",
            type: "website",
            siteName: 'yourapi.ru',
            description: "Marketplace IT решений. Find here your own IT decision! Your Marketplace. Artificial. Programmable. Intelligence.",
            url: "https://yourapi.ru/help/",
            image: "https://yourapi.ru/img/yourapi_img.jpg",
            site: "@yourapi_ru",
            domain: "yourapi.ru",
            card: "summary"
        };

        return (
            <div className="help-main">
                <Helmet
                    title={seo.title}
                    defer
                    meta={[
                        {name: "description", property: "og:description", content: seo.description},
                        {property: "og:title", content: seo.title},
                        {property: "og:description", content: seo.description},
                        {property: "og:type", content: seo.type},
                        {property: "og:site_name", content: seo.siteName},
                        {property: "og:url", content: seo.url},
                        {property: "og:image", content: seo.image},
                        {property: "twitter:image", content: seo.image},
                        {property: "twitter:image:alt", content: seo.description},
                        {property: "twitter:title", content: seo.title},
                        {property: "twitter:description", content: seo.description},
                        {property: "twitter:site", content: seo.site},
                        {property: "twitter:domain", content: seo.domain},
                        {property: "twitter:card", content: seo.card}
                    ]}
                />
                <Sidebar.Pushable as={Segment} className='login-sidebar-pushable'>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        direction='right'
                        vertical
                        visible={visible}
                        className='login-slider-pushable'>
                        {authenticated ? (<div/>) : (
                            <AuthContainerWrapper authenticated={authenticated} {...this.props}/>)}
                    </Sidebar>
                    <Sidebar.Pusher dimmed={visible}>
                        <Segment className='login-sidebar-pushable'>
                            <div className="help-header-picture" unselectable='on'>
                                <div className="help-header-picture-inner">
                                    <div className='header-text-left'>
                                        <div className="header-slogan" unselectable='on'>
                                            <span>Здесь можно узнать о том,</span><br/>
                                            <span>как пользоваться нашим продуктом.</span><br/>
                                            <br/>
                                            <br/>
                                        </div>
                                        <div className="header-slogan" unselectable='on'>
                                            <span>Сейчас мы находимся в стадии разработки,</span><br/>
                                            <span>поэтому информация будет пополняться</span><br/>
                                            <span>по мере реализации :)</span><br/>
                                        </div>
                                    </div>
                                    <div className='header-text-right' hidden>
                                        <div className="header-slogan-right" unselectable='on'>
                                            <span>Здесь можно узнать о том,</span><br/>
                                            <span>как пользоваться нашим продуктом.</span><br/>
                                            <br/>
                                            <br/>
                                        </div>
                                        <div className="header-slogan-right">
                                            <span>Сейчас мы находимся в стадии разработки,</span><br/>
                                            <span>поэтому информация будет пополняться</span><br/>
                                            <span>по мере реализации :)</span><br/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="help-body-container">
                                <div className="help-inner-body-container">
                                    <div className="help-inner-left-container">
                                        <div className='help-body-element'>
                                            <NavLink to='/help/faq' className='help-header-elements-label-link'><span className='help-header-label help-link'>FAQ</span></NavLink>
                                            <span className='help-header-body'>Здесь мы соберем самые распространенные вопросы о продукте</span>
                                            {/*<div style={{cursor: "no-drop"}}*/}
                                                 {/*className='help-header-elements-label-link-disabled'>*/}
                                                {/*<span className='help-header-label help-link-disabled'>FAQ</span>*/}
                                                {/*<span className='help-header-body'>Здесь мы соберем самые распространенные вопросы о продукте</span>*/}
                                            {/*</div>*/}
                                        </div>
                                        <div className='help-body-element help-body-element-padded'>
                                            {/*<NavLink to='/help/shop' className='help-header-elements-label-link'><span className='help-header-label help-link'>Магазин API</span></NavLink>*/}
                                            {/*<NavLink to='/help/shop/about' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>О Магазине</span></NavLink>*/}
                                            {/*<NavLink to='/help/shop/filter' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Настройка фильтрации</span></NavLink>*/}
                                            {/*<NavLink to='/help/shop/connection' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Подключение API</span></NavLink>*/}
                                            <div style={{cursor: "no-drop"}}
                                                 className='help-header-elements-label-link'>
                                                <span
                                                    className='help-header-label help-link-disabled'>Магазин API</span>
                                            </div>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span className='help-header-body-links help-sub-link-disabled'>О Магазине</span>
                                            </div>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span className='help-header-body-links help-sub-link-disabled'>Настройка фильтрации</span>
                                            </div>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span className='help-header-body-links help-sub-link-disabled'>Подключение API</span>
                                            </div>
                                        </div>
                                        <div className='help-body-element help-body-element-padded-second'>
                                            <NavLink to='/help/account' className='help-header-label-link blue-hover'><span className='help-header-label'>Личный кабинет</span></NavLink>
                                            {/*<NavLink to='/help/account/setup' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Настройка профиля</span></NavLink>*/}
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span className='help-header-body-links help-sub-link-disabled'>Настройка профиля</span>
                                            </div>
                                            <NavLink to='/help/account/loader' className='help-header-body-links'><span
                                                className='help-header-body-links help-sub-link'>Загрузка API</span></NavLink>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span className='help-header-body-links help-sub-link-disabled'>Работа c API</span>
                                            </div>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span
                                                    className='help-header-body-links help-sub-link-disabled'>Администрирование</span>
                                            </div>
                                            {/*<NavLink to='/help/account/work' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Работа c API</span></NavLink>*/}
                                            {/*<NavLink to='/help/account/administration' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Администрирование</span></NavLink>*/}
                                        </div>
                                    </div>
                                    <div className="help-inner-right-container">
                                        <div className='help-body-element'>
                                            {/*<NavLink to='/help/profile' className='help-header-elements-label-link'><span*/}
                                            {/*className='help-header-label help-link'>Учетная запись</span></NavLink>*/}
                                            {/*<NavLink to='/help/profile/registration' className='help-header-body-links'><span*/}
                                            {/*className='help-header-body-links help-sub-link'>Регистрация</span></NavLink>*/}
                                            {/*<NavLink to='/help/profile/login' className='help-header-body-links'><span*/}
                                            {/*className='help-header-body-links help-sub-link'>Авторизация и выход</span></NavLink>*/}
                                            <div style={{cursor: "no-drop"}}
                                                 className='help-header-elements-label-link'>
                                                <span
                                                    className='help-header-label help-link-disabled'>Учетная запись</span>
                                            </div>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span
                                                    className='help-header-body-links help-sub-link-disabled'>Регистрация</span>
                                            </div>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span className='help-header-body-links help-sub-link-disabled'>Авторизация и выход</span>
                                            </div>
                                        </div>
                                        <div className='help-body-element help-body-element-padded'>
                                            {/*<NavLink to='/help/integrator' className='help-header-elements-label-link'><span className='help-header-label help-link'>Интеграторы</span></NavLink>*/}
                                            {/*<NavLink to='/help/integrator/about' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Об интеграторах</span></NavLink>*/}
                                            {/*<NavLink to='/help/integrator/work' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Работа с интеграторами</span></NavLink>*/}
                                            <div style={{cursor: "no-drop"}}
                                                 className='help-header-elements-label-link'>
                                                <span
                                                    className='help-header-label help-link-disabled'>Интеграторы</span>
                                            </div>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span className='help-header-body-links help-sub-link-disabled'>Об интеграторах</span>
                                            </div>
                                            <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                                                <span className='help-header-body-links help-sub-link-disabled'>Работа с интеграторами</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </div>
        )
    }
}

export default Help;