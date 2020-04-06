import React, {Component} from 'react';
import './Help.css';
import {NavLink} from "react-router-dom";

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
        this.setState({loading: false})
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    render() {

        return (
            <div className="help-main">
                <div className="help-header-picture" unselectable='on'>
                    <div className='header-text'>
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
                </div>
                <div className="help-body-container">
                    <div className="help-inner-body-container">
                        <div className="help-inner-left-container">
                            <div className='help-body-element'>
                                <NavLink to='/help/faq' className='help-header-elements-label-link'><span className='help-header-label help-link'>FAQ</span></NavLink>
                                <span className='help-header-body'>Здесь мы соберем самые распространенные вопросы о продукте</span>
                            </div>
                            <div className='help-body-element help-body-element-padded'>
                                <NavLink to='/help/shop' className='help-header-elements-label-link'><span className='help-header-label help-link'>Магазин API</span></NavLink>
                                <NavLink to='/help/shop/about' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>О Магазине</span></NavLink>
                                <NavLink to='/help/shop/filter' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Настройка фильтрации</span></NavLink>
                                <NavLink to='/help/shop/connection' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Подключение API</span></NavLink>
                            </div>
                            <div className='help-body-element help-body-element-padded-second'>
                                <NavLink to='/help/account' className='help-header-label-link'><span className='help-header-label'>Личный кабинет</span></NavLink>
                                <NavLink to='/help/account/setup' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Настройка профиля</span></NavLink>
                                <NavLink to='/help/account/loader' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Загрузка API</span></NavLink>
                                <NavLink to='/help/account/work' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Работа c API</span></NavLink>
                                <NavLink to='/help/account/administration' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Администрирование</span></NavLink>
                            </div>
                        </div>
                        <div className="help-inner-right-container">
                            <div className='help-body-element'>
                                <NavLink to='/help/profile' className='help-header-elements-label-link'><span className='help-header-label help-link'>Учетная запись</span></NavLink>
                                <NavLink to='/help/profile/registration' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Регистрация</span></NavLink>
                                <NavLink to='/help/profile/login' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Авторизация и выход</span></NavLink>
                            </div>
                            <div className='help-body-element help-body-element-padded'>
                                <NavLink to='/help/integrator' className='help-header-elements-label-link'><span className='help-header-label help-link'>Интеграторы</span></NavLink>
                                <NavLink to='/help/integrator/about' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Об интеграторах</span></NavLink>
                                <NavLink to='/help/integrator/work' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Работа с интеграторами</span></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help;