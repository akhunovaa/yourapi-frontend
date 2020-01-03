import React, {Component} from 'react';
import './ApiCategoryShop.css';
import {NavLink, Redirect} from "react-router-dom";
import {Breadcrumb, Icon} from "semantic-ui-react";
import Slider from '@material-ui/core/Slider';
import ApiElementData from './ApiElementData';


class ApiCategoryShop extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        const {category} = this.props.match.params;
        this.state = {
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
        const link = '/shop/category/' + this.state.categoryName;
         let categoryValue;
         let color;
         let labelColor;
         switch (this.state.categoryName) {
             case 'data':
                 categoryValue = 'Данные';
                 color = 'red';
                 labelColor = 'red';
                 break;
             case 'finance':
                 categoryValue = 'Финансы';
                 color = 'orange';
                 labelColor = 'orange-label';
                 break;
             case 'mobile':
                 categoryValue = 'Мобильные';
                 color = 'yellow';
                 labelColor = 'yellow-label';
                 break;
             case 'map':
                 categoryValue = 'Карты';
                 color = 'green';
                 labelColor = 'green-label';
                 break;
             case 'adv':
                 categoryValue = 'Реклама';
                 color = 'olive';
                 labelColor = 'olive-label';
                 break;
             case 'social':
                 categoryValue = 'Социальные сети';
                 color = 'blue';
                 labelColor = 'blue-label';
                 break;
             case 'health':
                 categoryValue = 'Здравохранение';
                 color = 'purple';
                 labelColor = 'purple-label';
                 break;
             case 'sport':
                 categoryValue = 'Спорт';
                 color = 'teal';
                 labelColor = 'teal-label';
                 break;
             case 'web':
                 categoryValue = 'Web';
                 color = 'violet';
                 labelColor = 'violet-label';
                 break;
             case 'other':
                 categoryValue = 'Другое';
                 color = 'grey';
                 labelColor = 'grey-label';
                 break;
             default:
                 categoryValue = 'Данные';
                 color = 'red';
                 labelColor = 'red';
         }
        return (
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
                            className='text-disabled-color'>{categoryValue}</span></Breadcrumb.Section>
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
                                <span className='left-label'>{this.state.responseScale[0] + 'mS'}</span>
                                <span className='right-label'>{this.state.responseScale[1] + 'mS'}</span>
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
                                <span className='left-label'>{this.state.responseStableScale[0] + '%'}</span>
                                <span className='right-label'>{this.state.responseStableScale[1] + '%'}</span>
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
                            <div className='api-shop-filter-response-time'>Разделы</div>
                            <div className='category-labels'>
                                <div className='category-label'>
                                    <NavLink to='#'>Аналитика</NavLink>
                                    <span className='right-label'>15</span>
                                </div>
                                <div className='category-label'>
                                    <NavLink to='#'>Поиск</NavLink>
                                    <span className='right-label'>14</span>
                                </div>
                                <div className='category-label'>
                                    <NavLink to='#'>Формы</NavLink>
                                    <span className='right-label'>15</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="api-shop-form-container">
                        <ApiElementData name={categoryValue} color={color} link={link} labelColor={labelColor}/>
                        <ApiElementData name={categoryValue} color={color} link={link} labelColor={labelColor}/>
                        <ApiElementData name={categoryValue} color={color} link={link} labelColor={labelColor}/>
                        <ApiElementData name={categoryValue} color={color} link={link} labelColor={labelColor}/>
                        <ApiElementData name={categoryValue} color={color} link={link} labelColor={labelColor}/>
                        <ApiElementData name={categoryValue} color={color} link={link} labelColor={labelColor}/>
                        <div style={{paddingTop: 20}}>

                        </div>
                        <div className='footer-paging'>

                            <Icon className='footer-left-icon' fitted link name='arrow left'/>
                            <span className='footer-paging-label'>1-18 из 45</span>
                            <Icon className='footer-right-icon' fitted link name='arrow right'/>

                            <div style={{paddingTop: 20}}>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ApiCategoryShop;