import React, {Component} from 'react';
import './Administration.css';
import {Button, Icon} from "semantic-ui-react";
import {loadUser} from "../../util/APIUtils";
import CommandsTreeSet from './CommandsTreeSet';
import CommandAdministration from './CommandAdministration';
import AdministrationBody from './AdministrationBody';

class Administration extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {

            },
            open: false,
            page: ''
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
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
                    <div className='left-side-administration-body-main-container'>
                        <CommandsTreeSet/>
                    </div>
                </div>
                <div className='right-side-administration'>
                    <div className="administration-breadcrumb">
                        <CommandAdministration/>
                    </div>
                    <div className="administration-body">
                        <AdministrationBody/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Administration;