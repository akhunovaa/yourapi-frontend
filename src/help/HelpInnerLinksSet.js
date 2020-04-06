import React, {Component} from 'react';
import './Help.css';
import {NavLink} from "react-router-dom";

class HelpInnerLinksSet extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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

    handleCheck(array, val) {
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    render() {

        return (
            <div className='help-left-container-page-links-body'>
                <div className='help-links-element'>
                    <NavLink to='/help/faq' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>FAQ</span></NavLink>
                </div>
                <div className='help-body-element help-link-element-padded'>
                    <NavLink to='/help/profile' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>Учетная запись</span></NavLink>
                    <NavLink to='/help/profile/registration' className='help-header-link-set'><span className='help-header-link-set help-link'>Регистрация</span></NavLink>
                    <NavLink to='/help/profile/login' className='help-header-link-set'><span className='help-header-link-set help-link'>Авторизация и выход</span></NavLink>
                </div>
                <div className='help-body-element help-link-element-padded'>
                    <NavLink to='/help/shop' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>Магазин API</span></NavLink>
                    <NavLink to='/help/shop/about' className='help-header-link-set'><span className='help-header-link-set help-link'>О Магазине</span></NavLink>
                    <NavLink to='/help/shop/filter' className='help-header-link-set'><span className='help-header-link-set help-link'>Настрока фильтрации</span></NavLink>
                    <NavLink to='/help/shop/connection' className='help-header-link-set'><span className='help-header-link-set help-link'>Подключение API</span></NavLink>
                </div>
                <div className='help-body-element help-link-element-padded'>
                    <NavLink to='/help/integrator' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>Интеграторы</span></NavLink>
                    <NavLink to='/help/integrator/about' className='help-header-link-set'><span className='help-header-link-set help-link'>Об интеграторах</span></NavLink>
                    <NavLink to='/help/integrator/work' className='help-header-link-set'><span className='help-header-link-set help-link'>Работа с интеграторами</span></NavLink>
                </div>
                <div className='help-body-element help-link-element-padded'>
                    <NavLink to='/help/account' className='help-header-elements-label-link'><span className='help-header-elements-label help-link'>Личный кабинет</span></NavLink>
                    <NavLink to='/help/account/setup' className='help-header-link-set'><span className='help-header-link-set help-link'>Настройка профиля</span></NavLink>
                    <NavLink to='/help/account/loader' className='help-header-link-set'><span className='help-header-link-set help-link'>Загрузка API</span></NavLink>
                    <NavLink to='/help/account/administration' className='help-header-link-set'><span className='help-header-link-set help-link'>Администрирование</span></NavLink>
                </div>
            </div>
        )
    }
}

export default HelpInnerLinksSet;