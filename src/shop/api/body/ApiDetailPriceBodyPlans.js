import React, {Component} from 'react';
import './ApiDetailBody.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from "react-slick";
import PlanNextArrow from "./arrows/PlanNextArrow";
import PlanPrevArrow from "./arrows/PlanPrevArrow";
import {Button, Dropdown, Header, Modal, Popup} from "semantic-ui-react";
import {apiSubscribtionSubmit} from "../../../util/APIUtils";
import Alert from "react-s-alert";
import {HashLink as Link} from "react-router-hash-link";

class ApiDetailPriceBodyPlans extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            secretKeyOptions: [],
            keyValue: '',
            open: false
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        const {userApplicationSecret} = this.props;
        if (this._isMounted) {
            const secretKeyOptions = [];
            for (let i = 0; i < userApplicationSecret.length; i++) {
                const data = {
                    text: userApplicationSecret[i].name,
                    value: userApplicationSecret[i].value
                };
                secretKeyOptions.push(data);
                this.setState({keyValue: userApplicationSecret[i].value});
            }
            this.setState({loading: false, secretKeyOptions: secretKeyOptions});
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    show = () => {
        this.setState({open: true});
}
    close = () => this.setState({open: false});

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleKeyDropdownChange = (e, {key, name, value}) => {
        this.setState({keyValue: value});
    };

    handleSubscriptionSubmit = (event) => {
        event.preventDefault();
        const {handlePageRestrict, uuid} = this.props;
        const {keyValue} = this.state;

        const subscriptiptionData = Object.assign({}, {
            'api': uuid,
            'api_key': keyValue,
            'subscription': 'FREE'
        });

        console.log(subscriptiptionData)
        handlePageRestrict();
        apiSubscribtionSubmit(subscriptiptionData)
            .then(response => {
                this.close();
                if (response.error) {
                    Alert.warning(response.error + '. Необходимо заново авторизоваться');
                } else if (response.success === false) {
                    Alert.warning(response.message);
                }else {
                    Alert.success('Подписка успешно оформлена');
                }
                handlePageRestrict();
            }).catch(error => {
            this.close();
            handlePageRestrict();
            Alert.error('Что-то пошло не так! Попробуйте заново.' || (error && error.message));
        });
    };


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
        const {secretKeyOptions, keyValue, open} = this.state;
        const {pageTitle} = this.props;

        const settings = {
            className: "individual-plan-slider",
            infinite: true,
            speed: 800,
            arrows: true,
            slidesToShow: 4,
            variableWidth: true,
            autoplaySpeed: 100,
            pauseOnHover: true,
            adaptiveHeight: true,
            prevArrow: <PlanPrevArrow/>,
            nextArrow: <PlanNextArrow/>
        };

        const styles = {
            SaveButton: {
                height: 32,
                background: '#2F80ED'
            },
            CancelButton: {
                height: 32,
                backgroundColor: '#A5A5A5'
            }
        };

        const helpPopupStyle = {
            borderRadius: 0,
            opacity: 0.7,
            padding: '2em',
        };


        return (
            <>
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
                                    <span>0 рублей</span>
                                </div>
                                <div className='individual-plan-description'>
                                    <span>1000 запросов за пакет</span>
                                </div>
                                <div className='individual-plan-description'>
                                    <span>За последующие 0 рублей</span>
                                </div>
                            </div>
                            <div className='individual-plan-description-footer padded-footer'>
                                {secretKeyOptions.length <= 0 ?
                                    (<Link to='/profile#secret'>
                                        <Popup
                                            trigger={<Button fluid className='secret-key-create-button'
                                                             style={{background: '#F39847'}}>
                                                <span className='secret-key-create-button-text'>Создать ключи</span>
                                            </Button>}
                                            header='X-YourAPI-Key'
                                            content={'Для создания ключей нажмите на кнопку'}
                                            on='hover' inverted style={helpPopupStyle} position='bottom center' wide
                                            size={'tiny'}
                                        />
                                    </Link>) :
                                    (
                                        <Button basic fluid onClick={this.show}
                                                className='individual-plan-description-select-button selected-container-button'>
                                            <span className='detail-price-body-individual-plan-button-text selected-span-text'>Выбрать</span>
                                        </Button>
                                    )}
                            </div>
                        </div>
                    </div>
                </Slider>

                <Modal size={'tiny'} dimmer="blurring" open={open} onClose={this.close}>
                    <Modal.Header><span
                        className='subscription-plan-select-header'>{pageTitle}</span></Modal.Header>
                    <Modal.Content>
                        <Modal.Description>
                            <Header>
                                <span className='subscription-plan-select-header'>Выберите ключ для подписки:</span>
                            </Header>
                            <Dropdown compact onChange={this.handleKeyDropdownChange} placeholder='Ключ'
                                      selection
                                      noResultsMessage='Ключи не найдены'
                                      id="key" name="key"
                                      disabled={secretKeyOptions.length <= 0}
                                      className="form-input detail-methods-parameters-input chevron-down"
                                      options={secretKeyOptions} value={keyValue}/>
                            <div style={{paddingTop: 10}}/>
                            <label className='detail-methods-parameters-label'>Ключ необходим для привязки
                                вашего аккаунта к выбарнному API</label>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>

                        <Button className="cancel-button" style={styles.CancelButton} onClick={this.close}>
                            <span className='command-approve-buttons-text'>Отмена</span>
                        </Button>

                        <Button className="apply-button" style={styles.SaveButton}
                                onClick={this.handleSubscriptionSubmit}>
                            <span className='command-approve-buttons-text'>Применить</span>
                        </Button>


                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

export default ApiDetailPriceBodyPlans;
