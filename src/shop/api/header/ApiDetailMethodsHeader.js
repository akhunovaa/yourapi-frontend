import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './ApiDetailHeader.css';

class ApiDetailMethodsHeader extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        const {category} = this.props.match.params;
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
                    <NavLink to='/shop/category/data/api?page=methods' className='active-header-link'>Методы</NavLink>
                </div>
                <div className='header-links-methods header-links-font'>
                    <NavLink to='/shop/category/data/api?page=version' className='inactive-header-link'>Версии</NavLink>
                </div>
                <div className='header-links-methods-documentation header-links-font'>
                    <NavLink to='/shop/category/data/api?page=documentation' className='inactive-header-link'>Документация</NavLink>
                </div>
                <div className='header-links-methods header-links-font'>
                    <NavLink to='/shop/category/data/api?page=price' className='inactive-header-link'>Цена</NavLink>
                </div>
                <div className='header-links-methods header-links-font'>
                    <NavLink to='/shop/category/data/api?page=review' className='inactive-header-link'>Отзывы</NavLink>
                </div>
                <div className='header-links-methods-description header-links-font'>
                    <NavLink to='/shop/category/data/api?page=questions' className='inactive-header-link'>Вопросы и обсуждения</NavLink>
                </div>
            </div>
        )
    }
}

export default ApiDetailMethodsHeader;