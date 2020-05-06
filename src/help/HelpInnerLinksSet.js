import React, {Component} from 'react';
import './Help.css';
import {NavLink} from "react-router-dom";

class HelpInnerLinksSet extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            this.setState({loading: false})
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {

        const {active} = this.props;
        return (
            <div className='help-left-container-page-links-body'>
                <div className='help-links-element'>
                    <NavLink to='/help/faq' className='help-header-label-link'><span className={active === 'faq' ? 'help-header-label help-link help-sub-link-enabled-header' : 'help-header-label help-sub-link-restricted-header'}>FAQ</span></NavLink>
                    {/*<div className='help-header-elements-label-link-disabled'>*/}
                        {/*<span className='help-header-label help-link-disabled'>FAQ</span>*/}
                    {/*</div>*/}
                </div>
                <div className='help-body-element help-link-element-padded'>
                    {/*<NavLink to='/help/profile/registration' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>Учетная запись</span></NavLink>*/}
                    {/*<NavLink to='/help/profile/registration' className='help-header-link-set first-link-padded'><span className={page === 'registration' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Регистрация</span></NavLink>*/}
                    {/*<NavLink to='/help/profile/login' className='help-header-link-set'><span className={page === 'login' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Авторизация и выход</span></NavLink>*/}

                    <div style={{cursor: "no-drop"}} className='help-header-elements-label-link'>
                        <span className='help-header-label help-link-disabled'>Учетная запись</span>
                    </div>
                    <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                        <span className='help-header-body-links help-sub-link-disabled'>Регистрация</span>
                    </div>
                    <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                        <span className='help-header-body-links help-sub-link-disabled'>Авторизация и выход</span>
                    </div>
                </div>
                <div className='help-body-element help-link-element-padded'>
                    {/*<NavLink to='/help/shop/about' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>Магазин API</span></NavLink>*/}
                    {/*<NavLink to='/help/shop/about' className='help-header-link-set first-link-padded'><span className={page === 'about' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>О Магазине</span></NavLink>*/}
                    {/*<NavLink to='/help/shop/filter' className='help-header-link-set'><span className={page === 'filter' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Настрока фильтрации</span></NavLink>*/}
                    {/*<NavLink to='/help/shop/connection' className='help-header-link-set'><span className={page === 'connection' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Подключение API</span></NavLink>*/}

                    <div style={{cursor: "no-drop"}} className='help-header-elements-label-link'>
                        <span className='help-header-label help-link-disabled'>Магазин API</span>
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
                <div className='help-body-element help-link-element-padded'>
                    {/*<NavLink to='/help/integrator/info' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>Интеграторы</span></NavLink>*/}
                    {/*<NavLink to='/help/integrator/info' className='help-header-link-set first-link-padded'><span className={page === 'info' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Об интеграторах</span></NavLink>*/}
                    {/*<NavLink to='/help/integrator/work' className='help-header-link-set'><span className={page === 'work' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Работа с интеграторами</span></NavLink>*/}

                    <div style={{cursor: "no-drop"}} className='help-header-elements-label-link'>
                        <span className='help-header-label help-link-disabled'>Интеграторы</span>
                    </div>
                    <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                        <span className='help-header-body-links help-sub-link-disabled'>Об интеграторах</span>
                    </div>
                    <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                        <span className='help-header-body-links help-sub-link-disabled'>Работа с интеграторами</span>
                    </div>
                </div>
                <div className='help-body-element help-link-element-padded'>
                    {/*<NavLink to='/help/account/setup' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>Личный кабинет</span></NavLink>*/}
                    {/*<NavLink to='/help/account/setup' className='help-header-link-set first-link-padded'><span className={page === 'setup' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Настройка профиля</span></NavLink>*/}
                    {/*<NavLink to='/help/account/upload' className='help-header-link-set'><span className={page === 'upload' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Загрузка API</span></NavLink>*/}
                    {/*<NavLink to='/help/account/api' className='help-header-link-set'><span className={page === 'api' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Работа c API</span></NavLink>*/}
                    {/*<NavLink to='/help/account/administration' className='help-header-link-set'><span className={page === 'administration' ? 'help-header-link-set help-sub-link-active': 'help-header-link-set help-sub-link'}>Администрирование</span></NavLink>*/}

                    <NavLink to='/help/account' className='help-header-label-link'><span className='help-header-label'>Личный кабинет</span></NavLink>
                    {/*<NavLink to='/help/account/setup' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Настройка профиля</span></NavLink>*/}
                    <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                        <span className='help-header-body-links help-sub-link-disabled blue-hover'>Настройка профиля</span>
                    </div>
                    <NavLink to='/help/account/loader' className='help-header-body-links'><span className={active === 'uploader' ? 'help-header-body-links help-sub-link-enabled' : 'help-header-body-links help-sub-link-restricted'}>Загрузка API</span></NavLink>
                    <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                        <span className='help-header-body-links help-sub-link-disabled'>Работа c API</span>
                    </div>
                    <div style={{cursor: "no-drop"}} className='help-header-body-links'>
                        <span className='help-header-body-links help-sub-link-disabled'>Администрирование</span>
                    </div>
                    {/*<NavLink to='/help/account/work' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Работа c API</span></NavLink>*/}
                    {/*<NavLink to='/help/account/administration' className='help-header-body-links'><span className='help-header-body-links help-sub-link'>Администрирование</span></NavLink>*/}
                </div>
            </div>
        )
    }
}

export default HelpInnerLinksSet;