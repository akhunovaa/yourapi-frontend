import React, {Component} from 'react';
import './ApiDetail.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Button, Icon, Image} from "semantic-ui-react";
import headerLogo from "../../img/api-header-logo.png";
import ApiDetailReviewHeader from "./header/ApiDetailReviewHeader";
import ApiDetailVersionHeader from "./header/ApiDetailVersionHeader";
import ApiDetailMethodsHeader from "./header/ApiDetailMethodsHeader";
import ApiDetailReviewBody from "./body/ApiDetailReviewBody";
import ApiDetailVersionBody from "./body/ApiDetailVersionBody";
import queryString from "query-string";

class ApiDetail extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        const {category} = this.props.match.params;
        const {id} = this.props.match.params;
        this.state = {
            api: {
                id: id ? id : 1,
                name: this.props.api ? this.props.api.name : 'API-FOOTBALL',
                dealer: this.props.api ? this.props.api.dealer : 'apisports',
                category: {
                    name: this.props.api ? this.props.api.category.name : category,
                    description: this.props.api ? this.props.api.category.description : 'Данные',
                },
                description: this.props.api ? this.props.api.description : 'Коэффициенты перед матчем, события, составы команд. Это дескрипшн.' +
                    ' Коэффициенты перед матчем, события, составы команд, тренеры, игроки, лучшие бомбардиры, турнирная таблица, статистика, трансферы,прогнозы. Коэффициенты перед матчем, события, составы команд, тренеры, игроки'
            }
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
        this.renderSwitchHeader = this.renderSwitchHeader.bind(this);
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

    renderSwitchBody() {
        const pagingArray = ['review', 'version'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'review';
        switch(paging) {
            case 'version':
                return  <ApiDetailVersionBody {...this.props} />;
            default:
                return  <ApiDetailReviewBody {...this.props} />
        }
    }

    renderSwitchHeader() {
        const pagingArray = ['review', 'version', 'methods'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'review';
        switch(paging) {
            case 'methods':
                return  <ApiDetailMethodsHeader {...this.props} />;
            case 'version':
                return  <ApiDetailVersionHeader {...this.props} />;
            default:
                return  <ApiDetailReviewHeader {...this.props} />
        }
    }


    render() {
        const categoryLink = '/shop' + '/category' + '/' + this.state.api.category.name;
        const apiLink = '/shop' + '/category' + '/' + this.state.api.category.name + '/api' + '/' + this.state.api.id;
        return (
            <div className="api-detail-main">
                <div className="api-detail-container-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Section as={NavLink} to={'/'} link><span
                            className='text-disabled-color'>Главная</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={'/shop'} link><span
                            className='text-disabled-color'>Магазин</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={categoryLink} link><span
                            className='text-disabled-color'>{this.state.api.category.description}</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={apiLink} link><span
                            className='text-disabled-color'>{this.state.api.name}</span></Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div className="api-detail-main-container">
                    <div className="api-detail-left-container">
                        <div className='api-detail-inner-filter-container'>
                            <div className='api-detail-inner-header-container'>
                                <div className="api-header-logo-picture">
                                    <Image src={headerLogo}/>
                                </div>
                                <div className="grid-labels">
                                    <Icon style={{paddingLeft: '16px', color: '#A5A5A5'}} link name='bookmark outline'/>
                                    <Icon style={{paddingLeft: '16px', color: '#A5A5A5'}} link name='share alternate'/>
                                    <Icon style={{paddingLeft: '32px', color: '#A5A5A5'}} link name='info circle'/>
                                </div>
                            </div>
                            <div className='api-detail-title'>{this.state.api.name}</div>
                            <div className='api-detail-dealer'>от <NavLink to='#'>{this.state.api.dealer}</NavLink>
                            </div>
                            <div className="api-detail-rating">
                                <Icon link name='star' style={{color: '#F39847'}}/>
                                <label style={{color: '#F39847'}}>4,9</label>
                                <label style={{color: '#A5A5A5', paddingLeft: 4}}>(79)</label>
                            </div>
                            <div className='api-detail-add-button'>
                                <Button className='api-detail-create-button' style={{background: '#2F80ED'}}>
                                    <span className='api-detail-create-button-text'>Подключить</span>
                                </Button>
                            </div>
                            <div className='api-detail-inner-body-container'>
                                <div className='api-left-form-elements'>
                                   Категория
                                    <NavLink to={categoryLink} className='description-body-link description-api-links-color-blue'>{this.state.api.category.description}</NavLink>
                                </div>
                                <div className='api-left-form-elements'>
                                    Версия
                                    <span className='description-body-link'>16.1</span>
                                </div>
                                <div className='api-left-form-elements'>
                                    Последнее обновление
                                    <span className='description-body-link'>19.10.2019</span>
                                </div>
                                <div className='api-left-form-elements'>
                                    Язык
                                    <span className='description-body-link'>Русский, Английский</span><NavLink to='#' className='description-body-link description-api-links-color-blue'>и еще +3</NavLink>
                                </div>
                                <div className='api-left-form-elements description-api-links-padder'>
                                    Скорость отдачи
                                    <span className='description-body-link'>230mS</span>
                                </div>
                                <div className='api-left-form-elements'>
                                    Стабильность
                                    <span className='description-body-link'>100%</span>
                                </div>
                                <div className='api-left-form-elements description-api-description-lighter description-api-description-wrapper'>
                                    {this.state.api.description}<NavLink to='#' className='description-body-link description-api-links-color-blue'>...еще</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="api-detail-form-container">
                        <div className='api-detail-form-header-container'>
                            {this.renderSwitchHeader()}
                        </div>
                        <div className='api-detail-form-body-container'>
                            {this.renderSwitchBody()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApiDetail;