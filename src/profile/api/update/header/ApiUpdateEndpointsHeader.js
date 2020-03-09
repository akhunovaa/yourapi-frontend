import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './ApiDetailHeader.css';

class ApiUpdateEndpointsHeader extends Component {

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
            <div className='update-header-links-list'>
                <div className='update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=overview'} className='update-inactive-header-link'>Описание</NavLink>
                </div>
                <div className='update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=settings'} className='update-inactive-header-link'>Основные</NavLink>
                </div>
                <div className='update-header-links-methods-documentation update-header-links-font update-active-header-container'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=endpoints'} className='update-active-header-link'>Endpoint'ы</NavLink>
                </div>
                <div className='update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=price'} className='update-inactive-header-link'>Цены</NavLink>
                </div>
                <div className='update-header-links-methods update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=docs'} className='update-inactive-header-link'>Документация</NavLink>
                </div>
                <div className='update-header-links-methods-description update-header-links-font'>
                    <NavLink to={'/profile/api?page=update&name=' + this.props.naming + '&definition=announcements'} className='update-inactive-header-link'>Оповещения</NavLink>
                </div>
            </div>
        )
    }
}

export default ApiUpdateEndpointsHeader;