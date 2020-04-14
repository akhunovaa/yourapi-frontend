import React, {Component} from 'react';
import './ApiDetail.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Button, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import ApiDetailReviewHeader from "./header/ApiDetailReviewHeader";
import ApiDetailVersionHeader from "./header/ApiDetailVersionHeader";
import ApiDetailPriceHeader from "./header/ApiDetailPriceHeader";
import ApiDetailQuestionsHeader from "./header/ApiDetailQuestionsHeader";
import ApiDetailDocumentationHeader from "./header/ApiDetailDocumentationHeader";
import ApiDetailMethodsHeader from "./header/ApiDetailMethodsHeader";
import ApiDetailReviewBody from "./body/ApiDetailReviewBody";
import ApiDetailVersionBody from "./body/ApiDetailVersionBody";
import ApiDetailMethodsBody from "./body/ApiDetailMethodsBody";
import queryString from "query-string";
import ApiDetailPriceBody from "./body/ApiDetailPriceBody";
import ApiDetailQuestionsBody from "./body/ApiDetailQuestionsBody";
import ApiDetailDocumentationBody from "./body/ApiDetailDocumentationBody";
import {apiProjectGet} from "../../util/APIUtils";
import {getLink4Category, getLink4Description} from "../../util/ElementsDataUtils";
import Alert from "react-s-alert";
import LazyApiDetailImage from '../../util/LazyApiDetailImage';
import AuthContainerWrapper from "../../home/AuthContainerWrapper";

class ApiDetail extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            id: 0,
            name: '',
            description: '',
            category: '',
            terms: '',
            image: '',
            approved: '',
            dealer: '',
            updated: '',
            info: '',
            host: '',
            operations: ''
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
        this.renderSwitchHeader = this.renderSwitchHeader.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        const params = queryString.parse(this.props.location.search);
        let id = params.id != null ? params.id : '1';
        if (this._isMounted) {
            apiProjectGet(id)
                .then(response => {
                    this.setState({
                        loading: false,
                        id: response.response.id,
                        name: response.response.fullName,
                        description: response.response.description,
                        category: response.response.category,
                        terms: response.response.terms,
                        image: response.response.image,
                        approved: response.response.approved,
                        dealer: response.response.username,
                        updated: response.response.updated,
                        info: response.response.info,
                        host: response.response.host,
                        operations: response.response.operations
                    });

                }).catch(error => {
                Alert.error('Ошибка запросе на получение проекта' || (error && error.message));
                this.setState({loading: false})
            });
        }
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

    renderSwitchBody(link4Description) {
        const pagingArray = ['review', 'version', 'methods', 'price', 'questions', 'documentation'];
        const params = queryString.parse(this.props.location.search);
        const {authenticated, handleSliderChange} = this.props;

        const {host, operations} = this.state;
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'methods';
        switch (paging) {
            case 'review':
                return <ApiDetailReviewBody {...this.props} />;
            case 'version':
                return <ApiDetailVersionBody {...this.props} />;
            case 'price':
                return <ApiDetailPriceBody {...this.props} />;
            case 'questions':
                return <ApiDetailQuestionsBody {...this.props} />;
            case 'documentation':
                return <ApiDetailDocumentationBody {...this.props} />;
            default:
                return <ApiDetailMethodsBody authenticated={authenticated} link={link4Description + "&page=methods"}
                                             host={host} operations={operations}
                                             handleSliderChange={handleSliderChange}/>
        }
    }

    renderSwitchHeader(link4Description) {
        const pagingArray = ['review', 'version', 'methods', 'price', 'questions', 'documentation'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'methods';
        switch (paging) {
            case 'review':
                return <ApiDetailReviewHeader link={link4Description} {...this.props} />;
            case 'version':
                return <ApiDetailVersionHeader link={link4Description} {...this.props} />;
            case 'price':
                return <ApiDetailPriceHeader link={link4Description} {...this.props} />;
            case 'questions':
                return <ApiDetailQuestionsHeader link={link4Description} {...this.props} />;
            case 'documentation':
                return <ApiDetailDocumentationHeader link={link4Description} {...this.props} />;
            default:
                return <ApiDetailMethodsHeader link={link4Description} {...this.props} />
        }
    }

    render() {

        const {loading, name, dealer, category, updated, description, image, id} = this.state;
        const host = window.location.origin.toString();
        const profile = dealer.nickname && !dealer.nickname.includes('.', ',') ? dealer.nickname : 'id' + dealer.id;
        const profileLink = '/profile' + '/' + profile;
        const link = getLink4Category(category);
        const link4Description = getLink4Description(category) + id;

        const {visible, authenticated, handleSliderChange} = this.props;

        return (
            <Sidebar.Pushable as={Segment} className='login-sidebar-pushable'>
                <Sidebar
                    as={Menu}
                    animation='overlay'
                    direction='right'
                    vertical
                    visible={visible}
                    className='login-slider-pushable'>
                    {authenticated ? (<div/>) : (
                        <AuthContainerWrapper authenticated={authenticated} {...this.props}/>)}
                </Sidebar>
                <Sidebar.Pusher dimmed={visible}>
                    <Segment className='login-sidebar-pushable'>
                        <div className="api-detail-main">
                            <div className="api-detail-container-breadcrumb">
                                <Breadcrumb>
                                    <Breadcrumb.Section as={NavLink} to={'/'} link><span
                                        className='text-disabled-color blue-hover'>Главная</span></Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right chevron'/>
                                    <Breadcrumb.Section as={NavLink} to={'/shop'} link><span
                                        className='text-disabled-color blue-hover'>Магазин</span></Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right chevron'/>
                                    <Breadcrumb.Section as={NavLink} to={link} link><span
                                        className='text-disabled-color blue-hover'>{category}</span></Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right chevron'/>
                                    <Breadcrumb.Section as={NavLink} to={link4Description} link><span
                                        className='text-disabled-color blue-hover'>{name}</span></Breadcrumb.Section>
                                </Breadcrumb>
                            </div>
                            <div className="api-detail-main-container">
                                <div className="api-detail-left-container">
                                    <div className='api-detail-inner-filter-container'>
                                        <div className='api-detail-inner-header-container'>
                                            <div className="api-header-logo-picture">
                                                {
                                                    image && !loading ? (
                                                        <LazyApiDetailImage
                                                            src={host + "/api-data/image/" + image + "/77/77"}
                                                            alt={name}/>
                                                    ) : (
                                                        <div className={image ? '' : 'api-detail-text-avatar'}>
                                                            <span>{name && name[0]}</span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="grid-labels">
                                                <Icon style={{paddingLeft: '16px', color: '#A5A5A5'}} link
                                                      name='bookmark outline'/>
                                                <Icon style={{paddingLeft: '16px', color: '#A5A5A5'}} link
                                                      name='share alternate'/>
                                                <Icon style={{paddingLeft: '32px', color: '#A5A5A5'}} link
                                                      name='info circle'/>
                                            </div>
                                        </div>
                                        <div className='api-detail-title'>{name}</div>
                                        <div className='api-detail-dealer'>от <NavLink
                                            to={profileLink}>{dealer.nickname ? dealer.nickname : dealer.name}</NavLink>
                                        </div>
                                        <div className="api-detail-rating">
                                            <Icon link name='star' style={{color: '#F39847'}}/>
                                            <label style={{color: '#F39847'}}>4,9</label>
                                            <label style={{color: '#A5A5A5', paddingLeft: 4}}>({this.state.id})</label>
                                        </div>
                                        <div className='api-detail-add-button'>
                                            <Button className='api-detail-create-button'
                                                    style={{background: '#2F80ED'}}>
                                                <span className='api-detail-create-button-text'>Подключить</span>
                                            </Button>
                                        </div>
                                        <div className='api-detail-inner-body-container'>
                                            <div className='api-left-form-elements'>
                                                Категория
                                                <NavLink to={link}
                                                         className='description-body-link description-api-links-color-blue'>{category}</NavLink>
                                            </div>
                                            <div className='api-left-form-elements'>
                                                Версия
                                                <span className='description-body-link'>16.1</span>
                                            </div>
                                            <div className='api-left-form-elements'>
                                                Последнее обновление
                                                <span
                                                    className='description-body-link'>{new Date(updated).toLocaleDateString()}</span>
                                            </div>
                                            <div className='api-left-form-elements'>
                                                Язык
                                                <span
                                                    className='description-body-link'>Русский, Английский</span><NavLink
                                                to='#'
                                                className='description-body-link description-api-links-color-blue'>и
                                                еще +3</NavLink>
                                            </div>
                                            <div className='api-left-form-elements description-api-links-padder'>
                                                Скорость отдачи
                                                <span className='description-body-link'>230mS</span>
                                            </div>
                                            <div className='api-left-form-elements'>
                                                Стабильность
                                                <span className='description-body-link'>100%</span>
                                            </div>
                                            <div
                                                className='api-left-form-elements description-api-description-lighter description-api-description-wrapper'>
                                                {description}
                                                {/*<NavLink to='#' className='description-body-link description-api-links-color-blue'>...еще</NavLink>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="api-detail-form-container">
                                    <div className='api-detail-form-header-container'>
                                        {this.renderSwitchHeader(link4Description)}
                                    </div>
                                    <div className='api-detail-form-body-container'>
                                        {this.renderSwitchBody(link4Description)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

export default ApiDetail;