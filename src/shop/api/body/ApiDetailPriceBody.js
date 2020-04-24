import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Button, Dimmer, Icon, List, Loader} from "semantic-ui-react";
import queryString from "query-string";
import ApiDetailPriceBodyPlans from "./ApiDetailPriceBodyPlans";
import {withRouter} from "react-router";
import ApiRestrictedOperation from "./ApiRestrictedOperation";

class ApiDetailPriceBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        const pagingArray = ['rur', 'usd'];
        const params = queryString.parse(this.props.location.search);
        const currency = (params.currency !== 'undefined' && this.handleCheck(pagingArray, params.currency)) ? params.currency : 'rur';
        this.state = {
            hidden: {
                currency: true,
            },
            arrow: {
                currency: 'chevron down'
            },
            blockMethodsState: false,
            selectedCurrency: currency === 'rur' ? 'Рубли (RUB)' : 'US Dollar (USD)'
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.toggle = this.toggle.bind(this);
        this.toggleCurrency = this.toggleCurrency.bind(this);
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

    toggle(event) {
        const target = event.target;
        const inputName = target.id;
        let hidden = this.state.hidden;
        let arrows = this.state.arrow;
        const open = hidden[inputName];
        hidden[inputName] = !open;
        arrows[inputName] = open ? 'chevron up' : 'chevron down';
        this.setState({
            hidden: hidden,
            arrow: arrows
        });
    }

    toggleCurrency(event) {
        const target = event.target;
        const inputName = target.name;
        let currencyName;
        switch (inputName) {
            case 'rur':
                currencyName = 'Рубли (RUB)';
                break;
            default:
                currencyName = 'US Dollar (USD)';
                break;

        }
        this.setState({
            selectedCurrency: currencyName
        });
        const input = target.id;
        let hidden = this.state.hidden;
        let arrows = this.state.arrow;
        const open = hidden[input];
        hidden[input] = !open;
        arrows[input] = open ? 'chevron up' : 'chevron down';
        this.setState({
            hidden: hidden,
            arrow: arrows
        });
    }


    render() {

        const {authenticated, userApplicationSecret, handleSliderChange} = this.props;
        const {blockMethodsState} = this.state;

        return (
            <div className='detail-price-body'>
                <Dimmer.Dimmable dimmed={blockMethodsState} blurring>
                    <Dimmer active={blockMethodsState} inverted verticalAlign='top'>
                        <Loader indeterminate inline className='restrict-operation-loader'>Выполнение
                            запроса...</Loader>
                    </Dimmer>
                    {authenticated ? (<>
                            <div className='detail-price-body-header'>
                                <div className='detail-price-body-currency'>
                                    <List verticalAlign='middle'>
                                        <List.Item>
                                            <List.Content floated='right'>
                                                <div className='detail-price-body-currency-chevron'>
                                                    <Icon link id='currency' name={this.state.arrow.currency}
                                                          onClick={this.toggle}/>
                                                </div>
                                            </List.Content>
                                            <List.Content>
                                                <div className='detail-price-body-currency-text'>
                                                    <span className='detail-price-body-currency-text-title'>Валюта</span>
                                                    <span
                                                        className='detail-price-body-currency-text-title-main'>{this.state.selectedCurrency}</span>
                                                </div>
                                            </List.Content>
                                        </List.Item>
                                    </List>
                                </div>
                                <div className='detail-price-body-individual-plan-button-container'>
                                    {/*<Button basic fluid className='detail-price-body-individual-plan-button'>*/}
                                    {/*<span className='detail-price-body-individual-plan-button-text'>Заказать индивидуальный план</span>*/}
                                    {/*</Button>*/}
                                </div>
                            </div>
                            <div className='detail-price-body-main'>
                                <div className='detail-price-body-main-plans'>
                                    <ApiDetailPriceBodyPlans {...this.props} />
                                </div>
                                <div className='detail-price-body-main-plan-scopes'>

                                    <div className='detail-price-body-main-plan-faq'>
                                        <div className='detail-price-body-main-plan-faq-header'>
                                            <span>Часто задаваемые вопросы</span>
                                        </div>
                                        <div className='detail-price-body-main-plan-faq-subheader'>
                                            <span>Безопасна ли моя оплата?</span>
                                        </div>
                                        <div className='detail-price-body-main-plan-faq-subheader-label'>
                                            <span>Кредитные карты обрабатываются через PCI-совместимого банковского партнера</span>
                                        </div>
                                        <div className='detail-price-body-main-plan-faq-subheader subheader-padded'>
                                            <span>Что делать, если я превышаю пределы моего плана?</span>
                                        </div>
                                        <div className='detail-price-body-main-plan-faq-subheader-label'>
                                            <span>В зависимости от выбранного варианта вашего плана, вы либо будете отстранены, либо будете платить за перерасход</span>
                                        </div>
                                        <div className='detail-price-body-main-plan-faq-subheader subheader-padded'>
                                            <span>Когда мне будет выставлен счет?</span>
                                        </div>
                                        <div className='detail-price-body-main-plan-faq-subheader-label'>
                                            <span>Мы списываем средства с вашей кредитной карты при подписке на тарифный план API и в следующий расчетный  период - 5 число каждого месца</span>
                                        </div>
                                    </div>

                                    <div className='individual-plan-support-message'>
                                        <a href={"mailto:support@yourapi.ru"} rel="noopener noreferrer" target='_blank'>
                                            <Button basic className='individual-plan-support-message-button'>
                                                <span className='individual-plan-support-message-button-text'>Связаться со службой поддержки</span>
                                            </Button>
                                        </a>
                                    </div>

                                </div>
                            </div>
                        </>) :
                        (
                            <ApiRestrictedOperation handleSliderChange={handleSliderChange}/>
                        )
                    }
                </Dimmer.Dimmable>
            </div>
        )
    }
}

export default withRouter(ApiDetailPriceBody);
