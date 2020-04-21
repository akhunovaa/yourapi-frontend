import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Button, Dropdown, Form, Icon, Input, Popup, TextArea} from "semantic-ui-react";
import {ShopLoadingIndicator} from "../../../common/LoadingIndicator";
import queryString from "query-string";
import ApiDetailMethodsResponseExampleHeader from "./header/ApiDetailMethodsResponseExampleHeader";
import ApiDetailMethodsSchemeHeader from "./header/ApiDetailMethodsSchemeHeader";
import ApiDetailMethodsResponseExampleBody from "./ApiDetailMethodsResponseExampleBody";
import ApiDetailMethodsSchemeBody from "./ApiDetailMethodsSchemeBody";
import {withRouter} from "react-router";
import {apiTestRequestSend} from "../../../util/APIUtils";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {HashLink as Link} from 'react-router-hash-link';

class ApiDetailMethodsOperation extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            host: {
                url: ''
            },
            value: '',
            codeValue: 'var unirest = require("unirest");\n' +
                '\n' +
                'var req = unirest("GET", "https://1-test-api.p.yourapi.ru/api/spelling/AutoComplete");\n' +
                '\n' +
                'req.query({\n' +
                '\t"text": "do"\n' +
                '});\n' +
                '\n' +
                'req.headers({\n' +
                '\t"x-yourapi-host": "1-test-api.p.yourapi.ru",\n' +
                '\t"x-yourapi-key": "d84d4c60c9msh148bf271be3d9f5p10d2',
            copied: false,
            codeCopied: false,
            project: 'Мой API',
            keyValue: '',
            idNumber: '123456',
            language: '(Node.js) Unirest',
            params: '',
            pathVariable: ''
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.renderSwitchHeader = this.renderSwitchHeader.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
        this.apiTest = this.apiTest.bind(this);
        this.getInitialState = this.getInitialState.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onCodeChange = this.onCodeChange.bind(this);
        this.onCodeCopy = this.onCodeCopy.bind(this);
        this.onCopy = this.onCopy.bind(this);
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

    getInitialState() {
        return {value: '', copied: false, keyValue: ''};
    };

    onChange({target: {value}}) {
        this.setState({value, copied: false});
    };

    onCodeChange({target: {value}}) {
        this.setState({value, codeCopied: false});
    };

    onCodeCopy() {
        this.setState({codeCopied: true});
        const timer = setTimeout(() => this.setState({codeCopied: false}), 3000);
        return () => clearTimeout(timer);
    };

    onCopy() {
        this.setState({copied: true});
        const timer = setTimeout(() => this.setState({copied: false}), 3000);
        return () => clearTimeout(timer);
    };

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleParameterInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;
        this.setState({[inputName]: inputValue});
    };

    jsonPrettify = (json) => {
        if (typeof json === 'object' && json !== null) {
            return JSON.stringify(json, undefined, 4);
        }
    };


    apiTest(operation) {
        const {handlePageRestrict, host} = this.props;
        const {keyValue} = this.state;

        if (operation.path === undefined){
            return
        }
        const pathName = (operation.path.includes('{') || operation.path.includes('}')) ? '' : operation.path;

        if (host) {
            let uri = host.url + pathName;
            for (const arrayElement of operation.parameters) {
                if (arrayElement.input === 'path') {
                    const pathVariable = this.state[arrayElement.name] ? this.state[arrayElement.name] : '';
                    uri += '/' + pathVariable
                }
            }
            let parameterCharValue = '';
            for (const arrayElement of operation.parameters) {
                if (arrayElement.input === 'query') {
                    const queryVariableValue = this.state[arrayElement.name] ? this.state[arrayElement.name] : '';
                    const queryVariableName = arrayElement.name;
                    if(queryVariableValue !== ''){
                        const concatenatedParam = queryVariableName + '=' + queryVariableValue;
                        parameterCharValue === '' ? parameterCharValue += '?' + concatenatedParam : parameterCharValue += '&' + concatenatedParam;
                    }
                }
            }
            const fulledUrl = uri + parameterCharValue;
            handlePageRestrict();
            apiTestRequestSend(fulledUrl, keyValue, host.url)
                .then(response => {
                    const data = this.jsonPrettify(response);
                    this.setState({
                        value: data
                    });
                    handlePageRestrict();
                }).catch(error => {
                handlePageRestrict();
                const data = this.jsonPrettify(error);
                this.setState({
                    value: data
                })
            });
        } else {
            this.setState({
                value: ''
            })
        }
    }

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});

    handleKeyDropdownChange = (e, {key, name, value}) => {
        this.setState({keyValue: value});
    };

    handleCheck(array, val) {
        return array.some(item => item.path === val);
    }

    getFromArray = (array, val) => {
        let obj = undefined;
        array.map((item) => {
            if (item.path === val) {
                obj = item;
            }
        });
        return obj;
    };

    handleClose = () => {
        this.setState({open: false})
    };

    jsonPrettify = (json) => {
        if (typeof json === 'object' && json !== null) {
            return JSON.stringify(json, undefined, 4);
        }
    };


    renderSwitchHeader() {
        const operations = this.props.operations ? this.props.operations : [];

        const operationNameArray = [];
        for (let i = 0; i < operations.length; i++) {
            operationNameArray.push(operations[i].path);
        }

        const params = queryString.parse(this.props.location.search);
        let operationNaming = (params.operation !== 'undefined' && this.handleCheck(operationNameArray, params.operation)) ? params.operation : '/';

        const link = this.props.link + operationNaming;

        const pagingArray = ['example', 'scheme'];
        const paging = (params.code !== 'undefined' && this.handleCheck(pagingArray, params.code)) ? params.code : 'example';

        switch (paging) {
            case 'example':
                return <ApiDetailMethodsResponseExampleHeader link={link} text={this.state.value}
                                                              copied={this.state.copied}
                                                              onCopy={this.onCopy} {...this.props} />;
            case 'scheme':
                return <ApiDetailMethodsSchemeHeader link={link} text={this.state.value} copied={this.state.copied}
                                                     onCopy={this.onCopy} {...this.props} />;
            default:
                return <ApiDetailMethodsResponseExampleHeader link={link} text={this.state.value}
                                                              copied={this.state.copied}
                                                              onCopy={this.onCopy} {...this.props} />
        }
    }

    renderSwitchBody() {
        const pagingArray = ['example', 'scheme'];
        const params = queryString.parse(this.props.location.search);
        const paging = (params.code !== 'undefined' && this.handleCheck(pagingArray, params.code)) ? params.code : 'example';
        switch (paging) {
            case 'example':
                return <ApiDetailMethodsResponseExampleBody key={paging} onChange={this.onChange}
                                                            value={this.state.value} {...this.props} />;
            case 'scheme':
                return <ApiDetailMethodsSchemeBody onChange={this.onChange} {...this.props} />;
            default:
                return <ApiDetailMethodsResponseExampleBody key={paging} onChange={this.onChange}
                                                            value={this.state.value} {...this.props} />
        }
    }

    render() {

        const {host, loadingParent} = this.props;
        const {keyValue, secretKeyOptions, loading} = this.state;

        if (loading || loadingParent) {
            return <ShopLoadingIndicator/>
        }

        const helpPopupStyle = {
            borderRadius: 0,
            opacity: 0.7,
            padding: '2em',
        };

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

        if (loading || loadingParent) {
            return <ShopLoadingIndicator/>
        }

        const operations = this.props.operations ? this.props.operations : [];

        const operationNameArray = [];
        for (let i = 0; i < operations.length; i++) {
            operationNameArray.push(operations[i]);
        }

        const params = queryString.parse(this.props.location.search);
        const operation = (params.operation !== undefined && this.handleCheck(operationNameArray, params.operation)) ? this.getFromArray(operationNameArray, params.operation) : [];

        return (
            <div className='detail-methods-main-columns'>
                <div className='detail-methods-property-container'>
                    <div className='detail-methods-title'>
                        <Icon name='cog' className=''/>
                        <span>Свойства</span>
                    </div>
                    <div className='detail-methods-title-label'>
                        <span>Выбранной операции</span>
                    </div>
                    <div className='detail-methods-properties-title'>
                        <span>{operation.path}</span>
                    </div>
                    <div className='detail-methods-properties-title'>
                        <span>Описание:</span>
                    </div>
                    <span className='detail-methods-parameters-label'>{operation.description ? operation.description : 'описание отсутствует'}</span>
                    <div className="detail-methods-parameters">
                        <div className="detail-methods-parameters">
                            <label className='detail-methods-parameters-label'>Хост</label>
                            <div style={{paddingTop: 6}}/>
                            <Input size={'small'} fluid icon={{name: 'check', color: 'green', size: 'large'}}
                                   placeholder='Хост' id="host"
                                   name="host" value={host ? host.url : 'https://1-test.p.yourapi.ru'}/>
                        </div>
                        <div style={{paddingTop: 6}}/>
                        <label className='detail-methods-parameters-label'>Секретный ключ</label>
                        <div style={{paddingTop: 6}}/>
                        <Dropdown compact onChange={this.handleKeyDropdownChange} placeholder='Ключ' selection
                                  noResultsMessage='Ключи не найдены'
                                  id="key" name="key" loading={loading || loadingParent}
                                  disabled={secretKeyOptions.length <= 0}
                                  className="form-input detail-methods-parameters-input chevron-down"
                                  options={secretKeyOptions} value={keyValue}/>
                    </div>
                    <div className="detail-methods-parameters">
                        <label className='detail-methods-parameters-label'>X-YourAPI-Key</label>
                        <div style={{paddingTop: 6}}/>
                        <Input size={'small'} fluid icon={{name: 'check', color: 'green', size: 'large'}}
                               placeholder='Ключ' id="keyValue" name="keyValue" disabled={secretKeyOptions.length <= 0}
                               value={keyValue}/>
                    </div>
                    <div className="detail-methods-parameters">
                        <div className='detail-methods-properties-title'>
                            <span>Параметры:</span>
                        </div>
                        {operation.parameters ? operation.parameters.sort(({input: previous}, {input: current}) => {
                            if (previous === 'path') {
                                return -1;
                            }
                        }).map((item, index) => {
                            return (
                                <>
                                    <div key={index} className="detail-methods-parameters">
                                        <label className='detail-methods-parameters-label'>{item.name}</label>
                                        { item.required ? (<label className='detail-methods-parameters-label-required'>*</label>) : (<></>)}
                                        <div style={{paddingTop: 6}}/>
                                        <Input size={'small'} fluid placeholder={item.name} id={item.name} name={item.name} onChange={this.handleParameterInputChange}/>
                                    </div>
                                </>)
                        }) : (<div/>)}
                    </div>
                    <div className='detail-methods-test-button-container'>
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
                            (<Popup
                                    trigger={
                                        <Button fluid basic className='detail-methods-test-button'
                                                style={{background: '#2F80EFD'}}
                                                onClick={() => this.apiTest(operation)}>
                                            <span className='detail-methods-test-button-text'>Тестировать</span>
                                        </Button>}
                                    header='Тестировать'
                                    content={'Нажмите для отправки тестового запроса'}
                                    on='hover' inverted style={helpPopupStyle} position='bottom center' wide
                                    size={'tiny'}
                                />
                            )}

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
                        <CopyToClipboard text={this.state.codeValue} onCopy={this.onCodeCopy}>
                            {this.state.codeCopied ?
                                <Icon className='code-paste fadeInLeft animated3' name='paste' link size='large'/> :
                                <Icon className='code-copy blue-hover' name='copy outline' link size='large'/>}
                        </CopyToClipboard>

                        {/*<Icon style={{paddingLeft: 12, color: '#A5A5A5'}} className='blue-hover' name='copy outline' link size='large'/>*/}
                    </div>
                    <div className="detail-methods-code-fragment-textarea">
                        <Form style={{paddingTop: '6px'}}>
                                    <TextArea onChange={this.onCodeChange} placeholder=''
                                              style={{minHeight: 306, maxHeight: 306, minWidth: 270}} id="code"
                                              name="code" value={this.state.codeValue}/>
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