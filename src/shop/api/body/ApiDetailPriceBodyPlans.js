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
                <div className='individual-plan-element-container selected-container'>
                    <div className='individual-plan-element-inner-container'>
                        <div className='individual-plan-header'>
                            <span>FREE</span>
                        </div>
                        <div className='individual-plan-header-label'>
                            <span>Тестирование YourAPI</span>
                        </div>
                        <div className='individual-plan-body'>
                            <div className='individual-plan-price'>
                                <span>0 Р</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>1000 запросов за пакет</span>
                            </div>
                            <div className='individual-plan-description'>
                                <span>За последующие 0р</span>
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
            </Slider>
        )
    }
}

export default ApiDetailPriceBodyPlans;
