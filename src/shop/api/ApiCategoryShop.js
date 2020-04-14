import React, {Component} from 'react';
import './ApiCategoryShop.css';
import {NavLink, Redirect} from "react-router-dom";
import {Breadcrumb, Grid, Icon, Menu, Segment, Sidebar} from "semantic-ui-react";
import Slider from '@material-ui/core/Slider';
import {apiFullCriteriaListGet} from "../../util/APIUtils";
import Alert from "react-s-alert";
import {CategoryShopLoadingIndicator} from "../../common/LoadingIndicator";
import {
    getCategoryName,
    getClassName4Color,
    getIconColor,
    getLink4Category,
    getLink4Description
} from "../../util/ElementsDataUtils";
import LazyMiniImage from '../../util/LazyMiniImage';
import AuthContainerWrapper from "../../home/AuthContainerWrapper";


class ApiCategoryShop extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        const {category} = this.props.match.params;
        this.state = {
            loading: true,
            categoryName: category,
            permittedCategory: ['data', 'finance', 'mobile', 'map', 'adv', 'social', 'health', 'sport', 'web', 'other'],
            responseScale: [0, 1000],
            responseStableScale: [0, 100]
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        const criteria = this.state.categoryName;
        if (this._isMounted) {
            apiFullCriteriaListGet(criteria)
                .then(response => {

                    this.setState({
                        loading: false,
                        apiList: response.response
                    });

                }).catch(error => {
                Alert.error('Ошибка запросе на получение проекта' || (error && error.message));
                this.setState({loading: false})
            });
        }
    }

    handleChange = (e, {id, name}) => {
        this.setState({[id]: name})
    };

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

    handleSliderChange = (event, newValue) => {
        this.setState({
            responseScale: newValue
        });
    };

    handleStableSliderChange = (event, newValue) => {
        this.setState({
            responseStableScale: newValue
        });
    };


    render() {

        if (!this.handleCheck(this.state.permittedCategory, this.state.categoryName)) {
            return <Redirect
                to={{
                    pathname: "/shop/category/data",
                    state: {from: this.props.location}
                }}/>;
        }

        const projects = this.state.apiList ? this.state.apiList : [];

        const host = window.location.origin.toString();
        const hasFirstRow = projects[0] && projects[0].size > 0 ? projects[0] && projects[0].size > 0 : projects[1] && projects[1].size > 0;
        const {visible, authenticated} = this.props;

        const Projects = ({items}) => (
            <>
                {
                    items.map(item => (
                        <Grid.Column key={item.id + item.name} className="body-data">
                            <Segment className='api-element-container'>
                                <div className="api-element-data">
                                    <div className="cell-header">
                                        <div className="grid-logo">
                                            {
                                                item.image ? (
                                                    <NavLink
                                                        to={getLink4Description(item.category) + item.id}>
                                                        <LazyMiniImage
                                                            src={host + "/api-data/image/" + item.image + "/32/32"}/>
                                                    </NavLink>
                                                ) : (
                                                    <div className="home-api-text-avatar">
                                                        <NavLink
                                                            to={getLink4Description(item.category) + item.id}><span>{item.fullName && item.fullName[0]}</span></NavLink>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="grid-labels">
                                            <Icon link name='star' style={{color: '#F39847'}}/>
                                            <label style={{color: '#F39847'}}>{item.id}</label>
                                            <Icon style={{
                                                paddingLeft: '16px',
                                                color: this.state[item.id + item.name] === 'bookmark outline' ? '#2F80ED' : '#A5A5A5'
                                            }} link onClick={this.handleChange} id={item.id + item.name}
                                                  name={this.state[item.id + item.name] === 'bookmark outline' ? 'bookmark' : 'bookmark outline'}/>
                                        </div>
                                    </div>
                                    <div className="cell-grid-body">
                                        <div className="cell-grid-body-text">
                                            <NavLink to={getLink4Description(item.category) + item.id}
                                                     className='cell-grid-body-text'>{item.fullName}</NavLink><br/>
                                        </div>
                                        <div className="cell-grid-body-label">
                                            <label>от {item.username.nickname ? item.username.nickname : item.username.name}</label>
                                        </div>
                                        <div className="cell-grid-body-description">
                                            <label>{item.description}</label>
                                        </div>
                                        <div className="api-element-footer">
                                            <div className={getClassName4Color(item.category)}>
                                                <Icon color={getIconColor(item.category)} name='dot circle'
                                                      size='small'/>
                                                <NavLink to={getLink4Category(item.category)}
                                                         className={getClassName4Color(item.category)}>{item.category}</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Segment>
                        </Grid.Column>
                    ))}
            </>
        );

        const link = '/shop/category/' + this.state.categoryName;
        const category = this.state.categoryName;

        const responseScaleOne = this.state.responseScale[0];
        const responseScaleTwo = this.state.responseScale[1];

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
                        <div className="api-shop-main">
                            <div className="api-shop-container-breadcrumb">
                                <Breadcrumb>
                                    <Breadcrumb.Section as={NavLink} to={'/'} link><span
                                        className='text-disabled-color'>Главная</span></Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right chevron'/>
                                    <Breadcrumb.Section as={NavLink} to={'/shop'} link><span
                                        className='text-disabled-color'>Магазин</span></Breadcrumb.Section>
                                    <Breadcrumb.Divider icon='right chevron'/>
                                    <Breadcrumb.Section as={NavLink} to={link} link><span
                                        className='text-disabled-color'>{getCategoryName(category)}</span></Breadcrumb.Section>
                                </Breadcrumb>
                            </div>
                            <div className="api-shop-main-container">
                                <div className="api-shop-left-container">
                                    <div className='api-shop-inner-filter-container'>
                                        <div className='api-shop-filter-title'>Фильтры</div>
                                        <div className='api-shop-filter-rating'>Рейтинг</div>
                                        <div className='api-shop-filter-rating-stars'>
                                            <Icon link name='star outline' className='star'/>
                                            <Icon link name='star outline' className='star'/>
                                            <Icon link name='star outline' className='star'/>
                                            <Icon link name='star outline' className='star'/>
                                            <Icon link name='star outline' className='star'/>
                                        </div>
                                        <div className='api-shop-filter-response-time'>Скорость отдачи</div>
                                        <div className='api-shop-filter-response-time-label'>
                                            <span className='left-label'>{responseScaleOne + 'mS'}</span>
                                            <span className='right-label'>{responseScaleTwo + 'mS'}</span>
                                        </div>
                                        <div className='api-shop-filter-response-time-line'>
                                            <Slider
                                                className='shop-filter-response-time-line-slider'
                                                value={this.state.responseScale}
                                                onChange={this.handleSliderChange}
                                                valueLabelDisplay="off"
                                                aria-labelledby="range-slider"
                                                min={0}
                                                max={1000}
                                            />
                                        </div>
                                        <div className='api-shop-filter-response-time'>Стабильность</div>
                                        <div className='api-shop-filter-response-time-label'>
                                            <span
                                                className='left-label'>{this.state.responseStableScale[0] + '%'}</span>
                                            <span
                                                className='right-label'>{this.state.responseStableScale[1] + '%'}</span>
                                        </div>
                                        <div className='api-shop-filter-response-time-line'>
                                            <Slider
                                                className='api-shop-filter-response-time-line-slider'
                                                value={this.state.responseStableScale}
                                                onChange={this.handleStableSliderChange}
                                                valueLabelDisplay="off"
                                                aria-labelledby="range-slider"
                                                min={0}
                                                max={100}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="api-shop-form-container">
                                    {this.state.loading ? (<CategoryShopLoadingIndicator/>) : (
                                        projects[0] && projects[0].size > 0 ?
                                            (
                                                <div id={projects[0].data_name}>
                                                    <div
                                                        className='api-element-container-header'>
                                            <span
                                                className='main-form-header'>{projects[0] ? projects[0].data_name : ''}</span>
                                                    </div>
                                                    <Grid columns='3'>
                                                        <Projects items={projects[0] ? projects[0].list : []}/>
                                                    </Grid>
                                                </div>
                                            )
                                            :
                                            (<div unselectable='on' className='api-category-shop-empty'>
                                                Данные отсутствуют
                                            </div>)
                                    )}
                                </div>
                            </div>
                        </div>
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        )
    }
}

export default ApiCategoryShop;