import React, {Component} from 'react';
import './Integrators.css';
import {Link, NavLink} from "react-router-dom";
import {Breadcrumb, Dropdown, Icon, Image, Input, TextArea, Form, Divider, Segment, Portal, List, Button, Checkbox, Table} from "semantic-ui-react";
import {loadUser} from "../util/APIUtils";

class Integrators extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        //this.setState({user: this.props.currentUser})
        // this.loadUser(handle);
    }


    loadUser(handle) {
        this.setState({
            loading: true
        });
        let data = {
            "id": handle
        };
        loadUser(data)
            .then(response => {
                this.setState({
                    user: response.response,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
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

        return (
            <div className="profile-main">
                <div className="profile-main-container">
                    <div className="container-breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Section as={NavLink} to={'/'} link>Главная</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right chevron'/>
                            <Breadcrumb.Section as={NavLink} to={'/profile'} link>Личный кабинет</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right arrow'/>
                            <Breadcrumb.Section active>Настройка профиля</Breadcrumb.Section>
                        </Breadcrumb>
                    </div>
                </div>
            </div>
        )
    }
}

export default Integrators;