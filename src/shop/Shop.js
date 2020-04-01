import React, {Component} from 'react';
import './Shop.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Icon} from "semantic-ui-react";
import {apiFullListGet} from "../util/APIUtils";
import Slider from '@material-ui/core/Slider';
import ShopBody from "./ShopBody";
import Alert from "react-s-alert";
import {categoryLoadingIndicator} from "../common/LoadingIndicator";

class Shop extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            apiList: [],
            responseScale: [0, 1000],
            responseStableScale: [0, 100]
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.valuetext = this.valuetext.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            apiFullListGet()
                .then(response => {

                    this.setState({
                        loading: false,
                        apiList: response.response
                    });

                }).catch(error => {
                Alert.error('Ошибка запросе на получение проекта' || (error && error.message));
                if (this._isMounted) {
                    this.setState({loading: false})
                }
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

    handleOpen = () => {
        this.setState({open: true})
    };

    valuetext(value) {
        return `${value}mS`;
    }

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

    handleClose = () => {
        this.setState({open: false})
    };

    render() {

        const projects = this.state.apiList ? this.state.apiList : [];

        return (
            <div className="shop-main">
                <div className="shop-container-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Section as={NavLink} to={'/'} link><span
                            className='text-disabled-color'>Главная</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={'/shop'} link><span
                            className='text-disabled-color'>Магазин</span></Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div className="shop-main-container">
                    <div className="shop-left-container">
                        <div className='shop-inner-filter-container'>
                            <div className='shop-filter-title'>Фильтры</div>
                            <div className='shop-filter-rating'>Рейтинг</div>
                            <div className='shop-filter-rating-stars'>
                                <Icon link name='star outline' className='star'/>
                                <Icon link name='star outline' className='star'/>
                                <Icon link name='star outline' className='star'/>
                                <Icon link name='star outline' className='star'/>
                                <Icon link name='star outline' className='star'/>
                            </div>
                            <div className='shop-filter-response-time'>Скорость отдачи</div>
                            <div className='shop-filter-response-time-label'>
                                <span className='left-label'>{this.state.responseScale[0] + 'mS'}</span>
                                <span className='right-label'>{this.state.responseScale[1] + 'mS'}</span>
                            </div>
                            <div className='shop-filter-response-time-line'>
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
                            <div className='shop-filter-response-time'>Стабильность</div>
                            <div className='shop-filter-response-time-label'>
                                <span className='left-label'>{this.state.responseStableScale[0] + '%'}</span>
                                <span className='right-label'>{this.state.responseStableScale[1] + '%'}</span>
                            </div>
                            <div className='shop-filter-response-time-line'>
                                <Slider
                                    className='shop-filter-response-time-line-slider'
                                    value={this.state.responseStableScale}
                                    onChange={this.handleStableSliderChange}
                                    valueLabelDisplay="off"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={100}
                                />
                            </div>
                            <div className='shop-filter-response-time'>Категории</div>
                            <div className='category-labels'>
                                <div className='category-label'>
                                    <Icon color='red' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/data'>Данные</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[0])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='orange' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/finance'>Финансы</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[1])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='yellow' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/mobile'>Мобильные</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[2])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='green' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/map'>Карты</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[3])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='olive' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/adv'>Реклама</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[4])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='blue' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/social'>Социальные сети</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[5])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='purple' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/health'>Здравохранение</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[6])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='teal' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/sport'>Спорт</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[7])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='violet' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/web'>Web</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[8])}</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='grey' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/other'>Другое</NavLink>
                                    <span
                                        className='right-label'>{categoryLoadingIndicator(this.state.loading, projects[9])}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ShopBody loading={this.state.loading} apiList={this.state.apiList} {...this.props}/>
                </div>
            </div>
        )
    }
}

export default Shop;