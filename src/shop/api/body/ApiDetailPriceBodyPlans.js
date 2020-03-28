import React, {Component} from 'react';
import './ApiDetailBody.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import PlanNextArrow from "./arrows/PlanNextArrow";
import PlanPrevArrow from "./arrows/PlanPrevArrow";
import {Button} from "semantic-ui-react";

class ApiDetailPriceBodyPlans extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
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
        if (array === undefined) {
            return false
        }
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        let settings = {
            className: "individual-plan-slider",
            infinite: true,
            speed: 800,
            arrows: true,
            slidesToShow: 4,
            variableWidth: true,
            autoplaySpeed: 100,
            pauseOnHover: true,
            adaptiveHeight: true,
            prevArrow: <PlanPrevArrow />,
            nextArrow: <PlanNextArrow />
        };

        return (
            <Slider {...settings}>
                <div className='individual-plan-element-container'>
                    <div className='individual-plan-element-inner-container'>
                        <div className='individual-plan-header'>
                            <span>Базовый</span>
                        </div>
                        <div className='individual-plan-header-label'>
                            <span>Для индивидуальных пользователей</span>
                        </div>
                        <div className='individual-plan-body'>
                            <div className='individual-plan-price'>
                                <span>Бесплатно</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>NNN запросов в день</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>За последующие +50р</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>30 запросов в минуту</span>
                            </div>
                        </div>
                        <div className='individual-plan-description-footer'>
                            <Button basic fluid className='individual-plan-description-select-button'>
                                <span className='detail-price-body-individual-plan-button-text'>Выбрать</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='individual-plan-element-container selected-container'>
                    <div className='individual-plan-element-inner-container'>
                        <div className='individual-plan-header'>
                            <span>Профессионал</span>
                        </div>
                        <div className='individual-plan-header-label'>
                            <span>Для индивидуальных пользователей</span>
                        </div>
                        <div className='individual-plan-body'>
                            <div className='individual-plan-price'>
                                <span>1200 Р</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>NNN запросов в день</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>За последующие +50р</span>
                            </div>
                        </div>
                        <div className='individual-plan-description-footer padded-footer'>
                            <Button basic fluid
                                    className='individual-plan-description-select-button selected-container-button'>
                                <span
                                    className='detail-price-body-individual-plan-button-text selected-span-text'>Выбрать</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='individual-plan-element-container'>
                    <div className='individual-plan-element-inner-container'>
                        <div className='individual-plan-header'>
                            <span>Компания</span>
                        </div>
                        <div className='individual-plan-header-label'>
                            <span>Для индивидуальных пользователей</span>
                        </div>
                        <div className='individual-plan-body'>
                            <div className='individual-plan-price'>
                                <span>1900 Р</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>NNN запросов в день</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>За последующие +50р</span>
                            </div>
                        </div>
                        <div className='individual-plan-description-footer padded-footer'>
                            <Button basic fluid className='individual-plan-description-select-button'>
                                <span className='detail-price-body-individual-plan-button-text'>Выбрать</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='individual-plan-element-container'>
                    <div className='individual-plan-element-inner-container'>
                        <div className='individual-plan-header'>
                            <span>Разовые платежи</span>
                        </div>
                        <div className='individual-plan-header-label'>
                            <span>Для индивидуальных пользователей</span>
                        </div>
                        <div className='individual-plan-body'>
                            <div className='individual-plan-price'>
                                <span>1 Р</span>
                            </div>
                        </div>
                        <div className='individual-plan-description-footer padded-footer doubling-padded-footer'>
                            <Button basic fluid className='individual-plan-description-select-button'>
                                <span className='detail-price-body-individual-plan-button-text'>Выбрать</span>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className='individual-plan-element-container'>
                    <div className='individual-plan-element-inner-container'>
                        <div className='individual-plan-header'>
                            <span>Новичок</span>
                        </div>
                        <div className='individual-plan-header-label'>
                            <span>Для индивидуальных пользователей</span>
                        </div>
                        <div className='individual-plan-body'>
                            <div className='individual-plan-price'>
                                <span>100 Р</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>5 запросов в день</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>За последующие +10р</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>30 запросов в минуту</span>
                            </div>
                        </div>
                        <div className='individual-plan-description-footer'>
                            <Button basic fluid className='individual-plan-description-select-button'>
                                <span className='detail-price-body-individual-plan-button-text'>Выбрать</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </Slider>
        )
    }
}

export default ApiDetailPriceBodyPlans;
