import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import './ApiDetailMethodsHeader.css';
import {Icon} from "semantic-ui-react";

class ApiDetailMethodsSchemeHeader extends Component {

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
            <div className='code-header-links-font'>
                <div className='code-header-links-methods code-header-links-font'>
                    <NavLink to='/shop/category/data/api?page=methods&code=example' className='inactive-header-link'>Пример ответа</NavLink>
                </div>
                <div className='code-header-links-methods code-header-links-font active-header-container'>
                    <NavLink to='/shop/category/data/api?page=methods&code=scheme' className='active-header-link'>Схема</NavLink>
                </div>
                <Icon style={{paddingLeft: 30, color: '#A5A5A5'}} name='copy outline' link
                      size='large'/>
            </div>
        )
    }
}

export default ApiDetailMethodsSchemeHeader;