import React, {Component} from 'react';
import './Administration.css';
import {Button, Icon} from "semantic-ui-react";
import {loadUser} from "../../util/APIUtils";
import CommandsTreeSet from './CommandsTreeSet';
import CommandAdministration from './CommandAdministration';
import AdministrationCommandBody from './AdministrationCommandBody';
import AdministrationCompanyBody from './AdministrationCompanyBody';
import queryString from "query-string";
import {withRouter} from "react-router";
import ProfileHeader from "../../common/AppHeader";

class Administration extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            command: {
                name: '',
                page: ''
            },
            open: false,
            page: ''
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.renderSwitch = this.renderSwitch.bind(this);
        this.handleOnCompanyNameChange = this.handleOnCompanyNameChange.bind(this);
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

    renderSwitch(path) {
        switch(path) {
            case 'Урал':
                return <AdministrationCompanyBody onLogout={this.props.onLogout}/>;
            default:
                return <AdministrationCommandBody onLogout={this.props.onLogout}/>;
        }
    }


    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    handleOnCompanyNameChange(value) {
        if (!this._isMounted) {
            return;
        }
        this.setState({
            command: {
                name: value
            }
        });
    };

    render() {
        const namingArray = ['Волга', 'Урал'];
        const pagingArray = ['about', 'members'];
        const params = queryString.parse(this.props.location.search);
        let naming = (params.company !== 'undefined' && this.handleCheck(namingArray, params.company)) ? params.company : 'Волга';
        let paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'about';
        if (this.state.command.name !== naming) {
            this.handleOnCompanyNameChange(naming);
        }
        return (
            <div className="administration-main">
                <div className='left-side-administration-body'>
                    <div className='left-side-administration-body-header'>
                        <div className='left-side-administration-body-header-button'>
                            <Button icon fluid labelPosition='left' style={{background: '#F39847'}}> <Icon
                                name='plus square'/><span
                                className='command-approve-buttons-text command-create-button'>Создать команду</span></Button>
                        </div>
                    </div>
                    <div className='left-side-administration-body-main-container'>
                        <CommandsTreeSet {...this.props}/>
                    </div>
                </div>
                <div className='right-side-administration'>
                    <div className="administration-breadcrumb">
                        <CommandAdministration {...this.props}/>
                    </div>
                    <div className="administration-body">
                        {this.renderSwitch(this.state.command.name)}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Administration);