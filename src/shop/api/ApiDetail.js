import React, {Component} from 'react';
import './ApiDetail.css';
import {NavLink, Redirect} from "react-router-dom";
import {Breadcrumb, Button, Icon, Menu, Popup, Segment, Sidebar} from "semantic-ui-react";
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
import {apiProjectGet, bookmarkAdd, bookmarkRemove, requestUserSecretList} from "../../util/APIUtils";
import {getLink4Category, getLink4Description} from "../../util/ElementsDataUtils";
import Alert from "react-s-alert";
import LazyApiDetailImage from '../../util/LazyApiDetailImage';
import AuthContainerWrapper from "../../home/AuthContainerWrapper";
import ApiDetailCustomInfoPopup from "./ApiDetailCustomInfoPopup";
import ApiDetailSharePopup from "./ApiDetailSharePopup";
import LoadingIndicator from "../../common/LoadingIndicator";
import {Helmet} from "react-helmet";

class ApiDetail extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
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
            operations: '',
            uuid: '',
            bookmarkText: '',
            userApplicationSecret: []
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
        const {id} = this.props.match.params;
        let uuid = params.uuid != null ? params.uuid : id;
        if (this._isMounted) {
            const {authenticated} = this.props;

            apiProjectGet(uuid)
                .then(response => {
                    this.setState({
                        id: response.response.id,
                        uuid: response.response.uuid,
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
                        operations: response.response.operations,
                        bookmarked: response.response.bookmarked,
                        pageTitle: 'YourAPI | ' + response.response.fullName,
                        error: false
                    });
                }).catch(error => {
                Alert.error('Ошибка: запрашиваемый проект недоступен или не создан' || (error && error.message));
                this.setState({loading: false, error: true})
            });

            if (authenticated) {
                requestUserSecretList()
                    .then(response => {
                        this.setState({
                            loading: false,
                            userApplicationSecret: response.response
                        });
                    }).catch(error => {
                    Alert.error('Ошибка запроса для списка ключей' || (error && error.message));
                    this.setState({loading: false})
                });
            } else {
                this.setState({loading: false})
            }
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

    handleChange = (e, {id, name}) => {
        const {authenticated} = this.props;

        const bookmarked = name === 'bookmark' ? 'bookmark' : 'bookmark outline';
        this.setState({
            bookmarkText: name
        });

        if (!authenticated) {
            this.setState({
                bookmarkText: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
            });
            return;
        }

        if (bookmarked === 'bookmark') {
            bookmarkRemove(id)
                .then(response => {
                    this.setState({
                        bookmarkText: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
                    })
                }).catch(error => {
                Alert.error('Ошибка при удалении для Bookmark' || (error && error.message));
            });
        } else {
            bookmarkAdd(id)
                .then(response => {
                    this.setState({
                        bookmarkText: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
                    })
                }).catch(error => {
                Alert.error('Ошибка при добавлении для Bookmark' || (error && error.message));
            });
        }

    };


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

        const {host, operations, userApplicationSecret, loading, pageTitle, uuid} = this.state;

        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'methods';
        switch (paging) {
            case 'review':
                return <ApiDetailReviewBody pageTitle={pageTitle}/>;
            case 'version':
                return <ApiDetailVersionBody pageTitle={pageTitle}/>;
            case 'price':
                return <ApiDetailPriceBody pageTitle={pageTitle} authenticated={authenticated}
                                           userApplicationSecret={userApplicationSecret}
                                           handleSliderChange={handleSliderChange} uuid={uuid}/>;
            case 'questions':
                return <ApiDetailQuestionsBody pageTitle={pageTitle}/>;
            case 'documentation':
                return <ApiDetailDocumentationBody pageTitle={pageTitle}/>;
            default:
                return <ApiDetailMethodsBody pageTitle={pageTitle} authenticated={authenticated}
                                             link={link4Description + "&page=methods"}
                                             host={host} operations={operations} loading={loading}
                                             handleSliderChange={handleSliderChange}
                                             userApplicationSecret={userApplicationSecret}/>
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

        const {loading, name, dealer, category, updated, description, image, id, bookmarkText, uuid, info, operations, bookmarked, error} = this.state;
        const {visible, authenticated, handleSliderChange} = this.props;

        if (error) {
            return <Redirect to={{
                pathname: "/shop",
                state: {from: this.props.location}
            }}/>
        }

        if (loading) {
            return <LoadingIndicator/>
        }


        //const host = window.location.origin.toString();
        const host = "https://yourapi.ru";
        const profile = dealer.nickname && !dealer.nickname.includes('.', ',') ? dealer.nickname : 'id' + dealer.id;
        const profileLink = '/profile' + '/' + profile;
        const link = getLink4Category(category);
        const link4Description = getLink4Description(category) + uuid;
        const styles = {
            infoPopup: {
                borderRadius: 0,
                opacity: 0.7,
                // padding: '2em'
            }
        };

        const seo = {
            title: "YourAPI | " + name,
            type: "website",
            siteName: 'yourapi.ru',
            description: description,
            url: link4Description,
            image: image ? host + "/api-data/image/" + image + "/600/600.jpg" : "https://yourapi.ru/img/yourapi_img.jpg",
            site: "@yourapi_ru",
            domain: "yourapi.ru",
            card: "summary"
        };

        return (
            <div>
                <Helmet
                    title={seo.title}
                    defer
                    meta={[
                        {name: "description", property: "og:description", content: seo.description},
                        {property: "og:title", content: seo.title},
                        {property: "og:description", content: seo.description},
                        {property: "og:type", content: seo.type},
                        {property: "og:site_name", content: seo.siteName},
                        {property: "og:url", content: seo.url},
                        {property: "og:image", content: seo.image},
                        {property: "twitter:image", content: seo.image},
                        {property: "twitter:image:alt", content: seo.description},
                        {property: "twitter:title", content: seo.title},
                        {property: "twitter:description", content: seo.description},
                        {property: "twitter:site", content: seo.site},
                        {property: "twitter:domain", content: seo.domain},
                        {property: "twitter:card", content: seo.card}
                    ]}
                />
                <Sidebar.Pushable as={Segment} className='login-sidebar-pushable'>
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        direction='right'
                        vertical
                        visible={visible}
                        onHide={() => handleSliderChange()}
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
                                                                src={host + "/api-data/image/" + image + "/77/77.jpg"}
                                                                alt={name}/>
                                                        ) : (
                                                            <div className={image ? '' : 'api-detail-text-avatar'}>
                                                                <span>{name && name[0]}</span>
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                <div className="grid-labels">
                                                    <Icon style={{
                                                        color: bookmarked ? bookmarkText !== 'bookmark outline' ? '#2F80ED' : '' : bookmarkText === 'bookmark' ? '#2F80ED' : '',
                                                        paddingRight: 20
                                                    }} link onClick={this.handleChange} id={uuid}
                                                          className='grid-labels-icon'
                                                          name={bookmarked ? bookmarkText !== 'bookmark outline' ? 'bookmark' : 'bookmark outline' : bookmarkText === 'bookmark' ? 'bookmark' : 'bookmark outline'}/>

                                                    <Popup
                                                        trigger={<Icon className='grid-labels-icon' link
                                                                       name='share alternate'
                                                                       style={{paddingRight: 20}}/>}
                                                        content={<ApiDetailSharePopup url={link4Description} name={name}
                                                                                      description={description}
                                                                                      category={category}
                                                                                      dealer={dealer} image={image}
                                                                                      host={host}/>}
                                                        on='focus' inverted position='bottom center'
                                                    />
                                                    <Popup
                                                        trigger={<Icon className='grid-labels-icon' link
                                                                       name='info circle'/>}
                                                        content={<ApiDetailCustomInfoPopup description={description}
                                                                                           info={info} image={image}
                                                                                           host={host} name={name}
                                                                                           category={category}
                                                                                           link={link} updated={updated}
                                                                                           operations={operations}/>}
                                                        header={name}
                                                        on='focus' inverted position='bottom center'
                                                    />
                                                </div>
                                            </div>
                                            <div className='api-detail-title'>{name}</div>
                                            <div className='api-detail-dealer'>от <NavLink
                                                to={profileLink}>{dealer.nickname ? dealer.nickname : dealer.name}</NavLink>
                                            </div>
                                            <div className="api-detail-rating">
                                                <Icon link name='star' style={{color: '#F39847'}}/>
                                                <label style={{color: '#F39847'}}>4,9</label>
                                                <label
                                                    style={{color: '#A5A5A5', paddingLeft: 4}}>({this.state.id})</label>
                                            </div>
                                            <div className='api-subscription-apply-container'>
                                                <NavLink to={link4Description + '&page=price'}>
                                                    <Button style={{background: '#2F80ED'}}
                                                            className='api-subscription-apply'>
                                                        <span className='api-detail-create-button-text'>Оформить подписку</span>
                                                    </Button>
                                                </NavLink>
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
            </div>

        )
    }
}

export default ApiDetail;