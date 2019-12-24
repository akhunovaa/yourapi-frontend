import React, {Component} from 'react';
import './Api.css';
import {loadUser} from "../../util/APIUtils";
import {withRouter} from "react-router";
import ApiBreadCrumb from "./ApiBreadCrumb";
import ApiAddBody from "./ApiAddBody";
import queryString from "query-string";

class Api extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            open: false,
            page: ''
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
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



    renderSwitchBody() {
        const pagingArray = ['add'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'add';
        switch(paging) {
            default:
                return <ApiAddBody paging={paging}/>;
        }
    }
    render() {
        return (
            <div className='api-main'>
                <div className='left-side-api-body'>
                    <div className='left-side-api-body-header'>
                        <div className='left-side-api-body-main-container'>

                        </div>
                    </div>
                    <div className='left-side-api-body-main-container'>

                    </div>
                </div>
                <div className='right-side-api'>
                    <div className="api-breadcrumb">
                        <ApiBreadCrumb paging='add' {...this.props}/>
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