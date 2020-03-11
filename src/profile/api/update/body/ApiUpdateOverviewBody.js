import React, {Component} from 'react';
import './ApiDetailsBody.css';
import {Button, Divider, Dropdown, Form, Input, TextArea} from "semantic-ui-react";

class ApiUpdateOverviewBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            apiName: 'Тест',
            apiDescription: 'Описание',
            category: 'Финансы',
            terms: 'Особые условия',
            formUpdateDisabled: true
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


    render() {
        const apiCategoryOptions = [
            {
                name: 'Спорт',
                text: 'Спорт',
                value: 'Спорт'
            },
            {
                name: 'Новости',
                text: 'Новости',
                value: 'Новости'
            },
            {
                name: 'Данные',
                text: 'Данные',
                value: 'Данные'
            },
            {
                name: 'Финансы',
                text: 'Финансы',
                value: 'Финансы'
            },
            {
                name: 'Мобильные',
                text: 'Мобильные',
                value: 'Мобильные'
            },
            {
                name: 'Порно',
                text: 'Порно',
                value: 'Порно'
            },
            {
                name: 'Карты',
                text: 'Карты',
                value: 'Карты'
            },
            {
                name: 'Реклама',
                text: 'Реклама',
                value: 'Реклама'
            },
            {
                name: 'Социальные сети',
                text: 'Социальные сети',
                value: 'Социальные сети'
            },
            {
                name: 'Здравохранение',
                text: 'Здравохранение',
                value: 'Здравохранение'
            },
            {
                name: 'Web',
                text: 'Web',
                value: 'Web'
            },
            {
                name: 'Другое',
                text: 'Другое',
                value: 'Другое'
            }
        ];
        return (
            <div className='detail-overview-body'>
                <h1 className="title"><span>Описание API</span></h1>
                <form>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left'}}>Наименование API</label>
                        <Input onChange={this.handleInputChange} defaultValue={this.props.naming}
                               className="form-input" id="apiName" disabled={this.state.formUpdateDisabled}
                               name="apiName" required placeholder='Наименование API'/>
                    </div>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Описание</label>
                        <Form>
                                        <TextArea className='detail-overview-api-name-textarea' onChange={this.handleInputChange} placeholder='Расскажите о своем API'
                                                  id="apiDescription" disabled={this.state.formUpdateDisabled}
                                                  name="apiDescription" defaultValue={this.state.apiDescription}/>
                        </Form>
                    </div>
                    <div className="api-add-container-input api-add-container-input-element">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Описание</label>
                        <Dropdown onChange={this.handleDropdownChange} placeholder='Категория' fluid search
                                  selection id="category" name="category" noResultsMessage="Москва - лучший город"
                                  className="form-input" options={apiCategoryOptions} disabled={this.state.formUpdateDisabled}
                                  defaultValue={this.state.category}/>
                    </div>
                    <div className="detail-overview-api-name-input">
                        <label style={{textAlign: 'left', paddingBottom: 6}}>Условия использования</label>
                        <Form>
                                        <TextArea className='detail-overview-api-name-textarea' onChange={this.handleInputChange} placeholder='Опишите условия по использованию'
                                                  id="terms" disabled={this.state.formUpdateDisabled}
                                                  name="terms" defaultValue={this.state.terms}/>
                        </Form>
                    </div>

                    <div className="api-update-buttons">
                        <div className='apply-button-container'>
                            <Button fluid className="apply-button" style={{width: 112, height: 32, background: '#2F80ED'}}><span
                                className='command-approve-buttons-text'>Сохранить</span></Button>
                        </div>
                        <div className='cancel-button-container api-info-cancel-button'>
                            <Button fluid className="cancel-button" style={{background: '#A5A5A5', width: 112, height: 32}}>
                                <span className='command-approve-buttons-text'>Отмена</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

        )
    }
}

export default ApiUpdateOverviewBody;
