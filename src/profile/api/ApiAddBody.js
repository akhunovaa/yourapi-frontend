import React, {Component} from 'react';
import './Api.css';
import {Button, Divider, Dropdown, Form, Icon, Input, TextArea} from "semantic-ui-react";
import {withRouter} from "react-router-dom";
import queryString from "query-string";

class ApiAddBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            api:{
                name: 'Sportspage Feeds',
                info: 'Результаты в реальном времени, расписание и коэффициенты ставок для лиг США',
                category: 'Новости'
            },
            apiName: ''
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
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

    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    handleCheck(array, val) {
        return array.some(item => item === val);
    }


    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const page = this.props.paging;
        const apiCategoryOptions = [
            {
                category: 'Спорт',
                text: 'Спорт',
                value: 'Спорт'
            },
            {
                category: 'Порно',
                text: 'Порно',
                value: 'Порно'
            },
            {
                category: 'Новости',
                text: 'Новости',
                value: 'Новости'
            }
        ];
        return (
              <div className='api-body-main'>
                  <div className="api-add-container">
                      <div className="api-add-container-title">
                          <span>Добавить API</span>
                      </div>
                      <div className="api-add-container-inputs">
                          <div className="api-add-container-input api-add-container-input-top">
                              <label>Название (обязательно)</label>
                              <Input fluid onChange={this.handleInputChange} defaultValue={this.state.api.name}
                                     className="form-input" id="apiName"
                                     name="apiName" required placeholder='Название API'/>
                          </div>
                          <div className="api-add-container-input api-add-container-input-element">
                              <div className="api-add-container-input-textarea">
                                  <label style={{paddingBottom: '6px'}}>Краткое описание</label>
                                  <Form style={{paddingTop: '6px'}}>
                                      <TextArea onChange={this.handleInputChange} placeholder='Краткое описание создаваемого API' style={{minHeight: 64, maxHeight: 64, minWidth: 352 }}  id="info" name="info" defaultValue={this.state.api.info}/>
                                  </Form>
                                  <label className='helper-message'>70-80 символов</label>
                              </div>
                          </div>
                          <div className="api-add-container-input api-add-container-input-element">
                              <label style={{paddingBottom: '6px'}}>Категория</label>
                              <Dropdown onChange={this.handleDropdownChange} placeholder='Категория' fluid search
                                        selection id="category" name="category" noResultsMessage="Москва - лучший город"
                                        className="form-input" options={apiCategoryOptions}
                                        defaultValue={this.state.api.category}/>
                          </div>

                          <div className="api-add-container-input api-add-container-segment-element">
                              <div className='api-upload-container'>
                                  <div className='api-upload-container-inner-elements'>
                                      <Icon className='api-upload-icon' link name='cloud download' size='big'/>
                                      <span className='api-upload-text' >Перетащите сюда файл API</span><br/>
                                      <span className='api-upload-text' style={{marginLeft: 36}} >или <a href='#' style={{color: '#2F80ED'}}>загрузите</a> с компьютера</span>
                                  </div>

                              </div>
                          </div>
                      </div>
                  </div>
                  <Divider style={{marginTop: '20px',  marginBottom: 0}}/>
                  <div className="api-info-buttons">
                      <div className='apply-button-container'>
                          <Button fluid className="apply-button" style={{width: 112, height:32}}><span className='command-approve-buttons-text'>Добавить</span></Button>
                      </div>
                      <div className='cancel-button-container api-info-cancel-button'>
                          <Button fluid className="cancel-button"  style={{width: 112, height:32}}><span className='command-approve-buttons-text'>Отмена</span></Button>
                      </div>
                  </div>
              </div>

        )
    }
}
export default withRouter(ApiAddBody);