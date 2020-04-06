import React, {Component} from 'react';
import './Help.css';

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
                                <span className='help-header-label'>FAQ</span>
                                <span className='help-header-body'>Здесь мы соберем самые распространенные вопросы о продукте</span><br/>
                            </div>
                            <div className='help-body-element help-body-element-padded'>
                                <span className='help-header-label'>Магазин API</span>
                                <span className='help-header-body-links'>О Магазине</span>
                                <span className='help-header-body-links'>Настройка фильтрации</span>
                                <span className='help-header-body-links'>Подключение API</span>
                            </div>
                            <div className='help-body-element help-body-element-padded-second'>
                                <span className='help-header-label'>Личный кабинет</span>
                                <span className='help-header-body-links'>Настройка профиля</span>
                                <span className='help-header-body-links'>Загрузка API</span>
                                <span className='help-header-body-links'>Администрирование</span>
                            </div>
                        </div>
                        <div className="help-inner-right-container">
                            <div className='help-body-element'>
                                <span className='help-header-label'>Учетная запись</span>
                                <span className='help-header-body-links'>Регистрация</span>
                                <span className='help-header-body-links'>Авторизация и выход</span>
                            </div>
                            <div className='help-body-element help-body-element-padded'>
                                <span className='help-header-label'>Интеграторы</span>
                                <span className='help-header-body-links'>Об интеграторах</span>
                                <span className='help-header-body-links'>Работа с интеграторами</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Help;