import React, {Component} from 'react';
import './Shop.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Icon} from "semantic-ui-react";
import {loadUser} from "../util/APIUtils";
import Slider from '@material-ui/core/Slider';
import {Table} from "semantic-ui-react/dist/commonjs/collections/Table";


class Shop extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            responseScale: [0, 1000],
            responseStableScale: [0, 100]
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.valuetext = this.valuetext.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        //this.setState({user: this.props.currentUser})
        // this.loadUser(handle);
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


    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

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
                                    <NavLink to='#'>Данные</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='orange' name='dot circle' size='small'/>
                                    <NavLink to='#'>Финансы</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='yellow' name='dot circle' size='small'/>
                                    <NavLink to='#'>Мобильные</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='green' name='dot circle' size='small'/>
                                    <NavLink to='#'>Карты</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='olive' name='dot circle' size='small'/>
                                    <NavLink to='#'>Реклама</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='blue' name='dot circle' size='small'/>
                                    <NavLink to='#'>Социальные сети</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='purple' name='dot circle' size='small'/>
                                    <NavLink to='#'>Здравохранение</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='teal' name='dot circle' size='small'/>
                                    <NavLink to='#'>Спорт</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='violet' name='dot circle' size='small'/>
                                    <NavLink to='#'>Web</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='grey' name='dot circle' size='small'/>
                                    <NavLink to='#'>Другое</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="shop-form-container">

                    </div>
                </div>
            </div>
        )
    }
}

export default Shop;