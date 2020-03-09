import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './ApiDetailHeader.css';

class ApiUpdateOverviewHeader extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {

        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };


    render() {
        return (
            <div className='header-links-list'>
                <div className='header-links-methods header-links-font active-header-container'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=overview'} className='active-header-link'>Описание</NavLink>
                </div>
                <div className='header-links-methods header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=settings'} className='inactive-header-link'>Основные настройки</NavLink>
                </div>
                <div className='header-links-methods-documentation header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=endpoints'} className='inactive-header-link'>Настройка путей</NavLink>
                </div>
                <div className='header-links-methods header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=price'} className='inactive-header-link'>Цены</NavLink>
                </div>
                <div className='header-links-methods header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=docs'} className='inactive-header-link'>Отзывы</NavLink>
                </div>
                <div className='header-links-methods-description header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=announcements'} className='inactive-header-link'>Вопросы и обсуждения</NavLink>
                </div>
            </div>
        )
    }
}

export default ApiUpdateOverviewHeader;