import React, {Component} from 'react';
import './Api.css';
import {Route, withRouter} from "react-router-dom";
import queryString from "query-string";
import ApiUpdateOverviewHeader from "./update/header/ApiUpdateOverviewHeader";
import ApiUpdateMainHeader from "./update/header/ApiUpdateMainHeader";
import ApiUpdateEndpointsHeader from "./update/header/ApiUpdateEndpointsHeader";
import ApiUpdatePriceHeader from "./update/header/ApiUpdatePriceHeader";
import ApiUpdateDocsHeader from "./update/header/ApiUpdateDocsHeader";
import ApiUpdateAnnouncementsHeader from "./update/header/ApiUpdateAnnouncementsHeader";
import ApiUpdateAnnouncementsBody from "./update/body/ApiUpdateAnnouncementsBody";
import ApiUpdateMainBody from "./update/body/ApiUpdateMainBody";
import ApiUpdateEndpointsBody from "./update/body/ApiUpdateEndpointsBody";
import ApiUpdatePriceBody from "./update/body/ApiUpdatePriceBody";
import ApiUpdateDocsBody from "./update/body/ApiUpdateDocsBody";
import ApiUpdateOverviewBody from "./update/body/ApiUpdateOverviewBody";

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
        this.iterateApiProjectList = this.iterateApiProjectList.bind(this);
        this.getCategoryLink = this.getCategoryLink.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.forceUpdate()
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
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    iterateApiProjectList(array, val) {
        for (const arrayElement of array) {
            if(arrayElement.name === val){
                return arrayElement;
            }
        }
    }

    getCategoryLink(category, id){
        switch (category) {
            case 'Данные':
                return '/shop/category/data/api?id=' + id;
            case 'Финансы':
                return '/shop/category/finance/api?id=' + id;
            case 'Мобильные':
                return '/shop/category/mobile/api?id=' + id;
            case 'Карты':
                return '/shop/category/map/api?id=' + id;
            case 'Реклама':
                return '/shop/category/adv/api?id=' + id;
            case 'Социальные сети':
                return '/shop/category/social/api?id=' + id;
            case 'Здравохранение':
                return '/shop/category/health/api?id=' + id;
            case 'Спорт':
                return '/shop/category/sport/api?id=' + id;
            case 'Web':
                return '/shop/category/web/api?id=' + id;
            default:
                return '/shop/category/other/api?id=' + id;
        }
    }

    renderSwitchHeader() {
        const pagingArray = ['overview', 'settings', 'endpoints', 'price', 'docs', 'announcements'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.definition !== 'undefined' && this.handleCheck(pagingArray, params.definition)) ? params.definition : 'overview';
        const apiProject = this.iterateApiProjectList(this.props.projects, this.props.naming);
        const {category} = apiProject;
        const {id} = apiProject;
        const externalLink = this.getCategoryLink(category, id);
        switch (paging) {
            case 'overview':
                return <ApiUpdateOverviewHeader naming={this.props.naming} externalLink={externalLink} {...this.props}/>;
            case 'settings':
                return <ApiUpdateMainHeader naming={this.props.naming} externalLink={externalLink} {...this.props}/>;
            case 'endpoints':
                return <ApiUpdateEndpointsHeader naming={this.props.naming} externalLink={externalLink} {...this.props}/>;
            case 'price':
                return <ApiUpdatePriceHeader naming={this.props.naming} externalLink={externalLink} {...this.props}/>;
            case 'docs':
                return <ApiUpdateDocsHeader naming={this.props.naming} externalLink={externalLink} {...this.props}/>;
            case 'announcements':
                return <ApiUpdateAnnouncementsHeader naming={this.props.naming} externalLink={externalLink} {...this.props}/>;
            default:
                return <ApiUpdateOverviewHeader naming={this.props.naming} externalLink={externalLink} {...this.props}/>
        }
    }

    renderSwitchBody() {
        const pagingArray = ['overview', 'settings', 'endpoints', 'price', 'docs', 'announcements'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.definition !== 'undefined' && this.handleCheck(pagingArray, params.definition)) ? params.definition : 'overview';
        const apiProject = this.iterateApiProjectList(this.props.projects, this.props.naming);
        switch (paging) {
            case 'overview':
                return <ApiUpdateOverviewBody key={apiProject.id} naming={this.props.naming} projects={this.props.projects} apiProject={apiProject} {...this.props}/>;
            case 'settings':
                return <ApiUpdateMainBody naming={this.props.naming} {...this.props}/>;
            case 'endpoints':
                return <ApiUpdateEndpointsBody naming={this.props.naming} {...this.props}/>;
            case 'price':
                return <ApiUpdatePriceBody naming={this.props.naming} {...this.props}/>;
            case 'docs':
                return <ApiUpdateDocsBody naming={this.props.naming} {...this.props}/>;
            case 'announcements':
                return <ApiUpdateAnnouncementsBody naming={this.props.naming} {...this.props}/>;
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