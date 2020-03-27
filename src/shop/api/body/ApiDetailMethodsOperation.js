import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Button, Dropdown, Form, Icon, Input, TextArea} from "semantic-ui-react";
import LoadingIndicator from "../../../common/LoadingIndicator";
import queryString from "query-string";
import ApiDetailMethodsResponseExampleHeader from "./header/ApiDetailMethodsResponseExampleHeader";
import ApiDetailMethodsSchemeHeader from "./header/ApiDetailMethodsSchemeHeader";
import ApiDetailMethodsResponseExampleBody from "./ApiDetailMethodsResponseExampleBody";
import ApiDetailMethodsSchemeBody from "./ApiDetailMethodsSchemeBody";
import {withRouter} from "react-router";
import {apiTestRequestSend} from "../../../util/APIUtils";

class ApiDetailMethodsOperation extends Component {

    _isMounted = false;
    path = '';

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            host: {
                url: ''
            },
            response: '',
            project: 'Мой API',
            key: 'dsjghse9gus9pgoj4;ow5...',
            idNumber: '123456',
            language: '(Node.js) Unirest',
            code: 'var unirest = require("unirest");\n' +
        '\n' +
        'var req = unirest("GET", "https://1-test-api.p.yourapi.ru/api/spelling/AutoComplete");\n' +
        '\n' +
        'req.query({\n' +
        '\t"text": "do"\n' +
        '});\n' +
        '\n' +
        'req.headers({\n' +
        '\t"x-yourapi-host": "1-test-api.p.yourapi.ru",\n' +
        '\t"x-yourapi-key": "d84d4c60c9msh148bf271be3d9f5p10d2'
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.renderSwitchHeader = this.renderSwitchHeader.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
        this.apiTest = this.apiTest.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        if (this._isMounted) {
            this.setState({loading: false});
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

    apiTest() {
        const operations = this.props.operations ? this.props.operations : [];

        const operationNameArray = [];
        for (let i = 0; i < operations.length; i++) {
            operationNameArray.push(operations[i].path);
        }

        const params = queryString.parse(this.props.location.search);
        let operationNaming = (params.operation !== 'undefined' && this.handleCheck(operationNameArray, params.operation)) ? params.operation : '/';

        const {host} = this.props;
        if (host) {
            let url = host.url + operationNaming;
            apiTestRequestSend(url)
                .then(response => {
                    this.setState({
                        response: response
                    })
                }).catch(error => {
                this.setState({
                    response: error
                })
            });
        } else {
            this.setState({
                response: ''
            })
        }
    }

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    handleClose = () => {
        this.setState({open: false})
    };

    jsonPrettify = (json) => {
        if (typeof json === 'object' && json !== null) {
            return JSON.stringify(json, undefined, 4);
        }
    };


    renderSwitchHeader() {
        const pagingArray = ['example', 'scheme'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.code !== 'undefined' && this.handleCheck(pagingArray, params.code)) ? params.code : 'example';
        switch (paging) {
            case 'example':
                return <ApiDetailMethodsResponseExampleHeader {...this.props} />;
            case 'scheme':
                return <ApiDetailMethodsSchemeHeader {...this.props} />;
            default:
                return <ApiDetailMethodsResponseExampleHeader {...this.props} />
        }
    }

    renderSwitchBody() {
        const pagingArray = ['example', 'scheme'];
        const responseValue = this.state.response;
        const params = queryString.parse(this.props.location.search);
        const paging = (params.code !== 'undefined' && this.handleCheck(pagingArray, params.code)) ? params.code : 'example';
        switch (paging) {
            case 'example':
                return <ApiDetailMethodsResponseExampleBody key={paging} response={responseValue} {...this.props} />;
            case 'scheme':
                return <ApiDetailMethodsSchemeBody {...this.props} />;
            default:
                return <ApiDetailMethodsResponseExampleBody key={paging} response={responseValue} {...this.props} />
        }
    }

    render() {

        const {host} = this.props;

        const projectOptions = [
            {
                language: 'Мой API',
                text: 'Мой API',
                value: 'Мой API'
            },
            {
                language: 'Тестовый API',
                text: 'Тестовый API',
                value: 'Тестовый API'
            }
        ];

        const languageOptions = [
            {
                language: '(Node.js) Unirest',
                text: '(Node.js) Unirest',
                value: '(Node.js) Unirest'
            },
            {
                language: 'Python 3.8.1',
                text: 'Python 3.8.1',
                value: 'Python 3.8.1'
            },
            {
                language: 'Python 2.7.17',
                text: 'Python 2.7.17',
                value: 'Python 2.7.17'
            },
            {
                language: 'Go (Golang) 1.13',
                text: 'Go (Golang) 1.13',
                value: 'Go (Golang) 1.13'
            }
        ];

        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        const operations = this.props.operations ? this.props.operations : [];

        const operationNameArray = [];
        for (let i = 0; i < operations.length; i++) {
            operationNameArray.push(operations[i].path);
        }

        const params = queryString.parse(this.props.location.search);
        let operationNaming = (params.operation !== 'undefined' && this.handleCheck(operationNameArray, params.operation)) ? params.operation : '/';

        return (
            <div className='detail-methods-main-columns'>
                <div className='detail-methods-property-container'>
                    <div className='detail-methods-title'>
                        <Icon name='cog' className=''/>
                        <span>Свойства </span>
                    </div>
                    <div className='detail-methods-title-label'>
                        <span>Выбранной операции</span>
                    </div>
                    <div className='detail-methods-properties-title'>
                        <span>Описание</span>
                    </div>
                    <div className='detail-methods-properties-title'>
                        <span>{operationNaming}</span>
                    </div>
                    <div className='detail-methods-properties-title'>
                        <span>Параметры</span>
                    </div>
                    <div className="detail-methods-parameters">
                        <label className='detail-methods-parameters-label'>Проект</label>
                        <div style={{paddingTop: 6}}/>
                        <Dropdown onChange={this.handleDropdownChange} placeholder='Проект' fluid selection
                                  id="project" name="project"
                                  className="form-input detail-methods-parameters-input chevron-down"
                                  options={projectOptions} defaultValue={this.state.project}/>
                    </div>
                    <div className="detail-methods-parameters">
                        <label className='detail-methods-parameters-label'>Хост (обязательное поле)</label>
                        <div style={{paddingTop: 6}}/>
                        <Input size={'small'} fluid icon={{name: 'check', color: 'green', size: 'large'}}
                               placeholder='Хост' id="host"
                               name="host" value={host ? host.url : 'https://1-test.p.yourapi.ru'}/>
                    </div>
                    <div className="detail-methods-parameters">
                        <label className='detail-methods-parameters-label'>Ключ (обязательное поле)</label>
                        <div style={{paddingTop: 6}}/>
                        <Input size={'small'} fluid icon={{name: 'check', color: 'green', size: 'large'}}
                               placeholder='Ключ' id="key"
                               name="key" defaultValue={this.state.key}/>
                    </div>
                    <div className="detail-methods-parameters">
                        <label className='detail-methods-parameters-label'>Номер ID (обязательное поле)</label>
                        <div style={{paddingTop: 6}}/>
                        <Input size={'small'} fluid icon={{name: 'check', color: 'green', size: 'large'}}
                               placeholder='Номер ID' id="idNumber"
                               name="idNumber" defaultValue={this.state.idNumber}/>
                    </div>
                    <div className='detail-methods-test-button-container'>
                        <Button basic className='detail-methods-test-button' style={{background: '#2F80EFD'}}
                                onClick={this.apiTest}>
                            <span className='detail-methods-test-button-text'>Тестировать</span>
                        </Button>
                    </div>
                </div>
                <div className='detail-methods-code-fragment-container'>
                    <div className='detail-methods-title'>
                        <Icon name='code' className=''/>
                        <span>Фрагмент кода</span>
                    </div>
                    <div className='detail-methods-title-label'>
                        <span>Выбранной операции</span>
                    </div>
                    <div className="detail-methods-code-fragment">
                        <label className='detail-methods-parameters-label'>Язык</label>
                        <div style={{paddingTop: 6}}/>
                        <Dropdown onChange={this.handleDropdownChange} placeholder='Язык' selection
                                  id="language" name="language"
                                  className="form-input detail-methods-parameters-input detail-methods-parameters-input-margin chevron-down"
                                  options={languageOptions} defaultValue={this.state.language}/>
                        <Button basic className='detail-methods-code-sdk'><Icon name='dropbox' color='black'
                                                                                size='large'/><span
                            className='detail-methods-code-sdk-text'>SDK</span></Button>
                        <Icon style={{paddingLeft: 12, color: '#A5A5A5'}} name='copy outline' link
                              size='large'/>
                    </div>
                    <div className="detail-methods-code-fragment-textarea">
                        <Form style={{paddingTop: '6px'}}>
                                    <TextArea onChange={this.handleInputChange} placeholder=''
                                              style={{minHeight: 306, maxHeight: 306, minWidth: 270}} id="code"
                                              name="code" defaultValue={this.state.code}/>
                        </Form>
                    </div>
                    {this.renderSwitchHeader()}
                    {this.renderSwitchBody()}
                </div>
            </div>
        )
    }
}

export default withRouter(ApiDetailMethodsOperation);