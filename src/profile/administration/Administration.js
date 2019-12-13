import React, {Component} from 'react';
import './Administration.css';
import {Link, NavLink} from "react-router-dom";
import {Breadcrumb, Dropdown, Icon, Image, Input, TextArea, Form, Divider, Segment, Portal, List, Button, Checkbox, Table} from "semantic-ui-react";
import {loadUser} from "../../util/APIUtils";

class Administration extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {

            },
            open: false
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        const {handle} = this.props.match.params;
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


    handleOnPhoneChange(value) {
        console.log(value)
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
            <div className="administration-main">
                <div className='left-side-administration-body'>
                    <div className='left-side-administration-body-header'>
                        <div className='left-side-administration-body-header-button'>
                            <Button icon fluid labelPosition='left' style={{background: '#F39847'}}> <Icon name='plus square'/><span className='command-approve-buttons-text command-create-button'>Создать команду</span></Button>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Administration;