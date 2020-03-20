import React, {Component} from 'react';
import './Api.css';
import {loadUser} from "../../util/APIUtils";
import {withRouter} from "react-router";
import ApiBreadCrumb from "./ApiBreadCrumb";
import ApiAddBody from "./ApiAddBody";
import ApiUpdateBody from "./ApiUpdateBody";
import ApiTreeSet from "./ApiTreeSet";
import queryString from "query-string";
import {NavLink} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import {apiProjectListGet} from "../../util/APIUtils";
import Alert from "react-s-alert";
import LoadingIndicator from '../../common/LoadingIndicator';

class Api extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            user: {},
            open: false,
            page: '',
            //projects: [{"id":25,"name":"25.Best-Test-API","fullName":"Best Test API","description":"This is a first API for a BIG start!","category":"Данные","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat@ya.ru"}},{"id":26,"name":"26.Second-Test-API","fullName":"Second Test API","description":"This is a second API for a BIG start!","category":"Спорт","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat@ya.ru"}}]
            projects: []
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
        this.renderSwitchHeader = this.renderSwitchHeader.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.projects.length > 0) return;
        this.setState({
            loading: true
        });
        apiProjectListGet()
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        projects : response.response
                    })
                }
            }).catch(error => {
            Alert.error('Ошибка получения списка проектов' || (error && error.message));
        });
        this.setState({
            loading: false
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
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

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    handleNamingCheck(array, val) {
        return array.some(item => item.name === val);
    }

    renderSwitchBody() {
        const pagingArray = ['add', 'update'];
        const params = queryString.parse(this.props.location.search);
        const naming = (params.name !== 'undefined' && this.handleNamingCheck(this.state.projects, params.name)) ? params.name : 'undefined';
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'add';
        switch(paging) {
            case 'update':
                if (naming !== 'undefined') {
                    return <ApiUpdateBody projects={this.state.projects} naming={naming}/>;
                }else {
                    return <ApiAddBody projects={this.state.projects} paging={paging}/>;
                }
            case 'add':
                return <ApiAddBody projects={this.state.projects} paging={paging}/>;
            default:
                return <ApiAddBody projects={this.state.projects} paging={paging}/>;
        }
    }

    renderSwitchHeader() {
        const pagingArray = ['add', 'update'];
        const params = queryString.parse(this.props.location.search);
        const naming = (params.name !== 'undefined' && this.handleNamingCheck(this.state.projects, params.name)) ? params.name : 'undefined';
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'add';
        switch(paging) {
            case 'update':
                return <ApiBreadCrumb paging='update' naming={naming} {...this.props}/>
            case 'add':
                return <ApiBreadCrumb paging='add' {...this.props}/>
            default:
                return <ApiBreadCrumb paging='update' naming={naming} {...this.props}/>
        }
    }
    render() {

        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        return (
            <div className='api-main'>
                <div className='left-side-api-body'>
                    <div className='left-side-api-body-header'>
                        <div className='left-side-api-body-main-container'>
                            <div className='header-api-command-element header-api-command-element-padding-top'>
                                <Icon className='api-command-operation-icon' name='chart line' link size='large'/>
                                <NavLink to="/profile/api?page=panel"><span className='api-command-operation-text'>Панель управления</span></NavLink>
                            </div>
                            <div className='header-api-command-element header-api-command-element-padding-bottom'>
                                <Icon className='api-command-operation-icon active-api-command' name='plus square' link size='large'/>
                                <NavLink to="/profile/api?page=add"><span className='api-command-operation-text active-api-command'>Добавить API</span></NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='left-side-api-body-main-container'>
                        <ApiTreeSet projects={this.state.projects}/>
                    </div>
                </div>
                <div className='right-side-api'>
                    <div className="api-breadcrumb">
                        {this.renderSwitchHeader()}
                    </div>
                    <div className="api-body">
                        {this.renderSwitchBody()}
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Api);