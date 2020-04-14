import React, {Component} from 'react';
import './ApiDetailBody.css';
import LoadingIndicator from "../../../common/LoadingIndicator";
import {NavLink} from "react-router-dom";
import {Button} from "semantic-ui-react";

class ApiRestrictedOperation extends Component {

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
            this.setState({loading: false});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload = () =>{
        window.location.reload();
    };


    render() {

        const {loading} = this.state;
        const {handleSliderChange} = this.props;

        if (loading) {
            return <LoadingIndicator/>
        }

        return (
            <div className='restricted-button-container'>
                <div className='restricted-login-button-label'>
                    <span>Этот раздел могут просматривать только авторизованные пользователи</span>
                </div>
                <div className='restricted-login-button-container'>
                    <Button onClick={handleSliderChange} className='restricted-login-button' style={{background: '#F39847'}}><span className='restricted-login-button-text'>Войти</span></Button>
                </div>
            </div>
        )
    }
}

export default ApiRestrictedOperation;