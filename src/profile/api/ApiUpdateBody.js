import React, {Component} from 'react';
import './Api.css';
import {withRouter} from "react-router-dom";
import queryString from "query-string";
import ApiUpdateOverviewHeader from "./update/header/ApiUpdateOverviewHeader";
import ApiUpdateMainHeader from "./update/header/ApiUpdateMainHeader";
import ApiUpdateOverviewBody from "./update/body/ApiUpdateOverviewBody";
import ApiUpdateEndpointsHeader from "./update/header/ApiUpdateEndpointsHeader";
import ApiUpdatePriceHeader from "./update/header/ApiUpdatePriceHeader";
import ApiUpdateDocsHeader from "./update/header/ApiUpdateDocsHeader";
import ApiUpdateAnnouncementsHeader from "./update/header/ApiUpdateAnnouncementsHeader";

class ApiUpdateBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            api: {

            }
        };
        this.reload = this.reload.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.renderSwitchHeader = this.renderSwitchHeader.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
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

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    renderSwitchHeader() {
        const pagingArray = ['overview', 'settings', 'endpoints', 'price', 'docs', 'announcements'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.definition !== 'undefined' && this.handleCheck(pagingArray, params.definition)) ? params.definition : 'overview';
        switch (paging) {
            case 'overview':
                return <ApiUpdateOverviewHeader naming={this.props.naming} {...this.props}/>;
            case 'settings':
                return <ApiUpdateMainHeader naming={this.props.naming} {...this.props}/>;
            case 'endpoints':
                return <ApiUpdateEndpointsHeader naming={this.props.naming} {...this.props}/>;
            case 'price':
                return <ApiUpdatePriceHeader naming={this.props.naming} {...this.props}/>;
            case 'docs':
                return <ApiUpdateDocsHeader naming={this.props.naming} {...this.props}/>;
            case 'announcements':
                return <ApiUpdateAnnouncementsHeader naming={this.props.naming} {...this.props}/>;
            default:
                return <ApiUpdateOverviewHeader naming={this.props.naming} {...this.props}/>
        }
    }

    renderSwitchBody() {
        const pagingArray = ['overview', 'settings', 'endpoints', 'price', 'docs', 'announcements'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.definition !== 'undefined' && this.handleCheck(pagingArray, params.definition)) ? params.definition : 'overview';
        switch (paging) {
            default:
                return <ApiUpdateOverviewBody naming={this.props.naming} {...this.props}/>
        }
    }

    render() {

        return (
            <div className='api-body-main'>
                <div className='update-api-detail-form-header-container'>
                    {this.renderSwitchHeader()}
                </div>
                <div className='api-detail-form-body-container'>
                    {this.renderSwitchBody()}
                </div>
            </div>

        )
    }
}

export default withRouter(ApiUpdateBody);