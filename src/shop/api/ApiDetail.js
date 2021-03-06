import React, {Component} from 'react';
import './ApiDetail.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Button, Icon, Image} from "semantic-ui-react";
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
import LoadingIndicator from '../../common/LoadingIndicator';
import {apiProjectGet} from "../../util/APIUtils";
import Alert from "react-s-alert";
import grid from "../../img/grid-img.png";

class ApiDetail extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            api: {
                loading: false,
                id: 1,
                name: '',
                dealer: '',
                category: '',
                terms: '',
                image: '',
                description: '',
                updated: '',
                approved: false
            }
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
        this.renderSwitchHeader = this.renderSwitchHeader.bind(this);
        this.getLink4CategoryFilter = this.getLink4CategoryFilter.bind(this);
        this.getLink4Description = this.getLink4Description.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            loading: true
        });
        const params = queryString.parse(this.props.location.search);
        let id = params.id !== 'undefined' ? params.id : '1';
        apiProjectGet(id)
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        id: response.response.id,
                        name: response.response.fullName,
                        description: response.response.description,
                        category: response.response.category,
                        terms: response.response.terms,
                        image: response.response.image,
                        approved: response.response.approved,
                        dealer: response.response.username.username,
                        updated: response.response.updated,
                        loading: false
                    })
                }
            }).catch(error => {
            Alert.error('???????????? ?????????????? ???? ?????????????????? ??????????????' || (error && error.message));
            this.setState({
                loading: false
            });
        });
        this.setState({
            loading: true
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

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };

    renderSwitchBody() {
        const pagingArray = ['review', 'version', 'methods', 'price', 'questions', 'documentation'];
        const params = queryString.parse(this.props.location.search);
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
                return <ApiDetailMethodsBody {...this.props} />
        }
    }

    renderSwitchHeader() {
        const pagingArray = ['review', 'version', 'methods', 'price', 'questions', 'documentation'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'methods';
        switch (paging) {
            case 'review':
                return <ApiDetailReviewHeader {...this.props} />;
            case 'version':
                return <ApiDetailVersionHeader {...this.props} />;
            case 'price':
                return <ApiDetailPriceHeader {...this.props} />;
            case 'questions':
                return <ApiDetailQuestionsHeader {...this.props} />;
            case 'documentation':
                return <ApiDetailDocumentationHeader {...this.props} />;
            default:
                return <ApiDetailMethodsHeader {...this.props} />
        }
    }

    getLink4Description(category){
        switch (category) {
            case '????????????':
                return '/shop/category/data/api?id=';
            case '??????????????':
                return '/shop/category/finance/api?id=';
            case '??????????????????':
                return '/shop/category/mobile/api?id=';
            case '??????????':
                return '/shop/category/map/api?id=';
            case '??????????????':
                return '/shop/category/adv/api?id=';
            case '???????????????????? ????????':
                return '/shop/category/social/api?id=';
            case '????????????????????????????':
                return '/shop/category/health/api?id=';
            case '??????????':
                return '/shop/category/sport/api?id=';
            case 'Web':
                return '/shop/category/web/api?id=';
            default:
                return '/shop/category/other/api?id=';
        }
    }

    getLink4CategoryFilter(category){
        switch (category) {
            case '????????????':
                return '/shop/category/data';
            case '??????????????':
                return '/shop/category/finance';
            case '??????????????????':
                return '/shop/category/mobile';
            case '??????????':
                return '/shop/category/map';
            case '??????????????':
                return '/shop/category/adv';
            case '???????????????????? ????????':
                return '/shop/category/social';
            case '????????????????????????????':
                return '/shop/category/health';
            case '??????????':
                return '/shop/category/sport';
            case 'Web':
                return '/shop/category/web';
            default:
                return '/shop/category/other';
        }
    }


    render() {
        if (this.state.loading) {
            return <LoadingIndicator/>
        }
        const host = window.location.origin.toString();
        return (
            <div className="api-detail-main">
                <div className="api-detail-container-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Section as={NavLink} to={'/'} link><span
                            className='text-disabled-color'>??????????????</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={'/shop'} link><span
                            className='text-disabled-color'>??????????????</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={this.getLink4CategoryFilter(this.state.category)} link><span
                            className='text-disabled-color'>{this.state.category}</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={this.getLink4Description(this.state.category) + this.state.id} link><span
                            className='text-disabled-color'>{this.state.name}</span></Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div className="api-detail-main-container">
                    <div className="api-detail-left-container">
                        <div className='api-detail-inner-filter-container'>
                            <div className='api-detail-inner-header-container'>
                                <div className="api-header-logo-picture">
                                    {
                                        this.state.image ? (
                                           <Image src={this.state.image ? host + "/api-data/image/" + this.state.image + "/77/77" : grid}/>
                                        ) : (
                                            <div className="api-detail-text-avatar">
                                                <span>{this.state.name && this.state.name[0]}</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="grid-labels">
                                    <Icon style={{paddingLeft: '16px', color: '#A5A5A5'}} link name='bookmark outline'/>
                                    <Icon style={{paddingLeft: '16px', color: '#A5A5A5'}} link name='share alternate'/>
                                    <Icon style={{paddingLeft: '32px', color: '#A5A5A5'}} link name='info circle'/>
                                </div>
                            </div>
                            <div className='api-detail-title'>{this.state.name}</div>
                            <div className='api-detail-dealer'>???? <NavLink to='#'>{this.state.dealer}</NavLink>
                            </div>
                            <div className="api-detail-rating">
                                <Icon link name='star' style={{color: '#F39847'}}/>
                                <label style={{color: '#F39847'}}>4,9</label>
                                <label style={{color: '#A5A5A5', paddingLeft: 4}}>({this.state.id})</label>
                            </div>
                            <div className='api-detail-add-button'>
                                <Button className='api-detail-create-button' style={{background: '#2F80ED'}}>
                                    <span className='api-detail-create-button-text'>????????????????????</span>
                                </Button>
                            </div>
                            <div className='api-detail-inner-body-container'>
                                <div className='api-left-form-elements'>
                                    ??????????????????
                                    <NavLink to={this.getLink4CategoryFilter(this.state.category)} className='description-body-link description-api-links-color-blue'>{this.state.category}</NavLink>
                                </div>
                                <div className='api-left-form-elements'>
                                    ????????????
                                    <span className='description-body-link'>16.1</span>
                                </div>
                                <div className='api-left-form-elements'>
                                    ?????????????????? ????????????????????
                                    <span className='description-body-link'>{new Date(this.state.updated).toLocaleDateString()}</span>
                                </div>
                                <div className='api-left-form-elements'>
                                    ????????
                                    <span className='description-body-link'>??????????????, ????????????????????</span><NavLink to='#'
                                                                                                               className='description-body-link description-api-links-color-blue'>??
                                    ?????? +3</NavLink>
                                </div>
                                <div className='api-left-form-elements description-api-links-padder'>
                                    ???????????????? ????????????
                                    <span className='description-body-link'>230mS</span>
                                </div>
                                <div className='api-left-form-elements'>
                                    ????????????????????????
                                    <span className='description-body-link'>100%</span>
                                </div>
                                <div
                                    className='api-left-form-elements description-api-description-lighter description-api-description-wrapper'>
                                    {this.state.description}<NavLink to='#' className='description-body-link description-api-links-color-blue'>...??????</NavLink>
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