import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Button, Dropdown, Form, Icon, Input, Popup} from "semantic-ui-react";
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
import {CodeBlock, tomorrow as codeTheme} from 'react-code-blocks'
import {
    getCLibCurlRequest,
    getCRestSharpRequest,
    getCUnirestRequest,
    getGoRequest,
    getJavaOkHttp,
    getJavaUnirest,
    getJSFetch,
    getJSJquery,
    getJSXMLHttpRequest,
    getNodeJSAxiosRequest,
    getNodeJSHttpRequest,
    getNodeJSRequest,
    getNodeJSUnirestRequest,
    getPHPCurlRequest,
    getPHPHttpV2Request,
    getPHPUnirestRequest,
    getPowershellRestRequest,
    getPythonHttpClientRequest,
    getPythonRequest,
    getPythonUnirestRequest,
    getRubyNetHttpRequest,
    getRubyUnirestRequest,
    getShellCurlRequest,
    getShellHTTPieRequest,
    getShellWgetRequest,
    getSwiftNSUrllSessionRequest
} from "../../../util/SDKExamplesDataUtil";

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
            codeValue: 'Java OkHttp',
            copied: false,
            codeCopied: false,
            codeLanguage: 'java',
            project: 'Мой API',
            keyValue: '',
            idNumber: '123456',
            language: 'Java OkHttp',
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
        const {userApplicationSecret, host} = this.props;
        if (this._isMounted) {
            const secretKeyOptions = [];
            for (let i = 0; i < userApplicationSecret.length; i++) {
                const data = {
                    text: userApplicationSecret[i].name,
                    value: userApplicationSecret[i].value
                };
                secretKeyOptions.push(data);
                const fulledUrl = host.url;
                const code = getJavaOkHttp(fulledUrl, host.url, userApplicationSecret[i].value);
                this.setState({keyValue: userApplicationSecret[i].value, code: code});
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
        this.buildCodeExample();
    };

    buildCodeExample = () => {
        const {codeValue} = this.state;
        const codeData = this.getCodeExampleData(codeValue);
        this.setState({codeData: codeData});
    };

    jsonPrettify = (json) => {
        if (typeof json === 'object' && json !== null) {
            return JSON.stringify(json, undefined, 4);
        }
    };


    apiTest(operation) {
        const {handlePageRestrict, host} = this.props;
        const {keyValue} = this.state;

        if (operation.path === undefined) {
            return
        }
        this.buildCodeExample();
        if (host) {
            const fulledUrl = this.getFullFormedUrlForTheRequest(operation);
            handlePageRestrict();
            apiTestRequestSend(fulledUrl, keyValue, host.url)
                .then(response => {
                    const data = this.jsonPrettify(response);
                    this.setState({
                        value: data
                    });
                    handlePageRestrict();
                }).catch(error => {
                console.log(error)
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

    handleKeyDropdownChange = (e, {key, name, value}) => {
        this.setState({keyValue: value});
       this.buildCodeExample();
    };

    handleDropdownChange = (e, {key, name, value}) => {
        const codeData = this.getCodeExampleData(value);
        this.setState({codeValue: value, codeData: codeData});
    };

    handleCheck(array, val) {
        return array.some(item => item.path === val);
    }

    getCodeExampleData = (code) => {
        const {host} = this.props;
        const operation = this.getRequestedOperation();
        const fulledUrl = this.getFullFormedUrlForTheRequest(operation);
        const {keyValue} = this.state;
        const key = keyValue ? keyValue : 'YOUR_SECRET_KEY';
        let codeData;
        switch (code) {
            case "Java OkHttp":
                this.setState({codeLanguage: 'java'});
                codeData = getJavaOkHttp(fulledUrl, host.url, key);
                break;
            case "Java Unirest":
                this.setState({codeLanguage: 'java'});
                codeData = getJavaUnirest(fulledUrl, host.url, key);
                break;
            case "C Libcurl":
                this.setState({codeLanguage: 'c'});
                codeData = getCLibCurlRequest(fulledUrl, host.url, key);
                break;
            case "C# RestSharp":
                this.setState({codeLanguage: 'csharp'});
                codeData = getCRestSharpRequest(fulledUrl, host.url, key);
                break;
            case "C# Unirest":
                this.setState({codeLanguage: 'csharp'});
                codeData = getCUnirestRequest(fulledUrl, host.url, key);
                break;
            case "Go NewRequest":
                this.setState({codeLanguage: 'go'});
                codeData = getGoRequest(fulledUrl, host.url, key);
                break;
            case "JavaScript jQuery":
                this.setState({codeLanguage: 'javascript'});
                codeData = getJSJquery(fulledUrl, host.url, key);
                break;
            case "JavaScript Fetch":
                this.setState({codeLanguage: 'jsx'});
                codeData = getJSFetch(fulledUrl, host.url, key);
                break;
            case "JavaScript XMLHttpRequest":
                this.setState({codeLanguage: 'jsx'});
                codeData = getJSXMLHttpRequest(fulledUrl, host.url, key);
                break;
            case "Node.js HTTP":
                this.setState({codeLanguage: 'javascript'});
                codeData = getNodeJSHttpRequest(fulledUrl, host.url, key);
                break;
            case "Node.js Request":
                this.setState({codeLanguage: 'javascript'});
                codeData = getNodeJSRequest(fulledUrl, host.url, key);
                break;
            case "Node.js Unirest":
                this.setState({codeLanguage: 'javascript'});
                codeData = getNodeJSUnirestRequest(fulledUrl, host.url, key);
                break;
            case "Node.js Axios":
                this.setState({codeLanguage: 'javascript'});
                codeData = getNodeJSAxiosRequest(fulledUrl, host.url, key);
                break;
            case "PHP cURL":
                this.setState({codeLanguage: 'php'});
                codeData = getPHPCurlRequest(fulledUrl, host.url, key);
                break;
            case "PHP HTTP v2":
                this.setState({codeLanguage: 'php'});
                codeData = getPHPHttpV2Request(fulledUrl, host.url, key);
                break;
            case "PHP Unirest":
                this.setState({codeLanguage: 'php'});
                codeData = getPHPUnirestRequest(fulledUrl, host.url, key);
                break;
            case "Powershell WebRequest":
                this.setState({codeLanguage: 'bash'});
                codeData = getPowershellRestRequest(fulledUrl, host.url, key);
                break;
            case "Powershell RestMethod":
                this.setState({codeLanguage: 'bash'});
                codeData = getPowershellRestRequest(fulledUrl, host.url, key);
                break;
            case "Python http.client":
                this.setState({codeLanguage: 'python'});
                codeData = getPythonHttpClientRequest(fulledUrl, host.url, key);
                break;
            case "Python Requests":
                this.setState({codeLanguage: 'python'});
                codeData = getPythonRequest(fulledUrl, host.url, key);
                break;
            case "Python Unirest":
                this.setState({codeLanguage: 'python'});
                codeData = getPythonUnirestRequest(fulledUrl, host.url, key);
                break;
            case "Ruby net::http":
                this.setState({codeLanguage: 'ruby'});
                codeData = getRubyNetHttpRequest(fulledUrl, host.url, key);
                break;
            case "Ruby Unirest":
                this.setState({codeLanguage: 'ruby'});
                codeData = getRubyUnirestRequest(fulledUrl, host.url, key);
                break;
            case "Shell cURL":
                this.setState({codeLanguage: 'bash'});
                codeData = getShellCurlRequest(fulledUrl, host.url, key);
                break;
            case "Shell HTTPie":
                this.setState({codeLanguage: 'bash'});
                codeData = getShellHTTPieRequest(fulledUrl, host.url, key);
                break;
            case "Shell Wget":
                this.setState({codeLanguage: 'bash'});
                codeData = getShellWgetRequest(fulledUrl, host.url, key);
                break;
            case "Swift NSURLSession":
                this.setState({codeLanguage: 'swift'});
                codeData = getSwiftNSUrllSessionRequest(fulledUrl, host.url, key);
                break;
        }
        return codeData;
    };

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

    getFullFormedUrlForTheRequest = (operation) => {
        const {host} = this.props;

        if (operation.path === undefined) {
            return
        }
        const pathName = (operation.path.includes('{') || operation.path.includes('}')) ? '' : operation.path;
        if (host) {
            let uri = pathName !== '/' ? host.url + pathName : host.url;
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
                    if (queryVariableValue !== '') {
                        const concatenatedParam = queryVariableName + '=' + queryVariableValue;
                        parameterCharValue === '' ? parameterCharValue += '?' + concatenatedParam : parameterCharValue += '&' + concatenatedParam;
                    }
                }
            }
            return uri + parameterCharValue;
        }
    };

    getRequestedOperation = () => {
        const operations = this.props.operations ? this.props.operations : [];
        const operationNameArray = [];
        for (let i = 0; i < operations.length; i++) {
            operationNameArray.push(operations[i]);
        }
        const params = queryString.parse(this.props.location.search);
        return (params.operation !== undefined && this.handleCheck(operationNameArray, params.operation)) ? this.getFromArray(operationNameArray, params.operation) : [];
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
        const {keyValue, secretKeyOptions, loading, codeLanguage, codeData, codeCopied, language} = this.state;
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
                language: 'Java OkHttp',
                text: 'Java OkHttp',
                value: 'Java OkHttp'
            },
            {
                language: 'Java Unirest',
                text: 'Java Unirest',
                value: 'Java Unirest'
            },
            {
                language: 'C Libcurl',
                text: 'C Libcurl',
                value: 'C Libcurl'
            },
            {
                language: 'C# RestSharp',
                text: 'C# RestSharp',
                value: 'C# RestSharp'
            },
            {
                language: 'C# Unirest',
                text: 'C# Unirest',
                value: 'C# Unirest'
            },
            {
                language: 'Go NewRequest',
                text: 'Go NewRequest',
                value: 'Go NewRequest'
            },
            {
                language: 'JavaScript jQuery',
                text: 'JavaScript jQuery',
                value: 'JavaScript jQuery'
            },
            {
                language: 'JavaScript Fetch',
                text: 'JavaScript Fetch',
                value: 'JavaScript Fetch'
            },
            {
                language: 'JavaScript XMLHttpRequest',
                text: 'JavaScript XMLHttpRequest',
                value: 'JavaScript XMLHttpRequest'
            },
            {
                language: 'Node.js HTTP',
                text: 'Node.js HTTP',
                value: 'Node.js HTTP'
            },
            {
                language: 'Node.js Request',
                text: 'Node.js Request',
                value: 'Node.js Request'
            },
            {
                language: 'Node.js Unirest',
                text: 'Node.js Unirest',
                value: 'Node.js Unirest'
            },
            {
                language: 'Node.js Axios',
                text: 'Node.js Axios',
                value: 'Node.js Axios'
            },
            {
                language: 'PHP cURL',
                text: 'PHP cURL',
                value: 'PHP cURL'
            },
            {
                language: 'PHP HTTP v2',
                text: 'PHP HTTP v2',
                value: 'PHP HTTP v2'
            },
            {
                language: 'PHP Unirest',
                text: 'PHP Unirest',
                value: 'PHP Unirest'
            },
            {
                language: 'Powershell WebRequest',
                text: 'Powershell WebRequest',
                value: 'Powershell WebRequest'
            },
            {
                language: 'Powershell RestMethod',
                text: 'Powershell RestMethod',
                value: 'Powershell RestMethod'
            },
            {
                language: 'Python http.client',
                text: 'Python http.client',
                value: 'Python http.client'
            },
            {
                language: 'Python Requests',
                text: 'Python Requests',
                value: 'Python Requests'
            },
            {
                language: 'Python Unirest',
                text: 'Python Unirest',
                value: 'Python Unirest'
            },
            {
                language: 'Ruby net::http',
                text: 'Ruby net::http',
                value: 'Ruby net::http'
            },
            {
                language: 'Ruby Unirest',
                text: 'Ruby Unirest',
                value: 'Ruby Unirest'
            },
            {
                language: 'Shell cURL',
                text: 'Shell cURL',
                value: 'Shell cURL'
            },
            {
                language: 'Shell HTTPie',
                text: 'Shell HTTPie',
                value: 'Shell HTTPie'
            },
            {
                language: 'Shell Wget',
                text: 'Shell Wget',
                value: 'Shell Wget'
            },
            {
                language: 'Swift NSURLSession',
                text: 'Swift NSURLSession',
                value: 'Swift NSURLSession'
            }
        ];

        if (loading || loadingParent) {
            return <ShopLoadingIndicator/>
        }

        const operation = this.getRequestedOperation();

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
                    <span
                        className='detail-methods-parameters-label'>{operation.description ? operation.description : 'описание отсутствует'}</span>
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
                                <div key={index + item.name} className="detail-methods-parameters">
                                    <label className='detail-methods-parameters-label'>{item.name}</label>
                                    {item.required ? (<label
                                        className='detail-methods-parameters-label-required'>*</label>) : (<></>)}
                                    <div style={{paddingTop: 6}}/>
                                    <Input size={'small'} fluid placeholder={item.name} id={item.name}
                                           name={item.name} onChange={this.handleParameterInputChange}/>
                                </div>)
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
                        <Dropdown onChange={this.handleDropdownChange} placeholder='Язык' selection search
                                  id="language" name="language"
                                  className="form-input detail-methods-parameters-input detail-methods-parameters-input-margin chevron-down"
                                  options={languageOptions} defaultValue={language}/>
                        <Button basic className='detail-methods-code-sdk'><Icon name='dropbox' color='black'
                                                                                size='large'/>
                            <span className='detail-methods-code-sdk-text'>SDK</span></Button>
                        <CopyToClipboard text={codeData !== undefined ? codeData : getJavaOkHttp(host.url, host.url, 'YOUR_SECRET_KEY')} onCopy={this.onCodeCopy}>
                            {codeCopied ?
                                <Icon className='code-paste fadeInLeft animated3' name='paste' link size='large'/> :
                                <Icon className='code-copy blue-hover' name='copy outline' link size='large'/>}
                        </CopyToClipboard>

                        {/*<Icon style={{paddingLeft: 12, color: '#A5A5A5'}} className='blue-hover' name='copy outline' link size='large'/>*/}
                    </div>
                    <div className="detail-methods-code-fragment-textarea">
                        <Form style={{paddingTop: '6px', whiteSpace: "pre-wrap"}}>

                            <CodeBlock
                                style={{minHeight: 306, maxHeight: 306, minWidth: 270}}
                                id="codeData"
                                name="codeData"
                                text={codeData === undefined ? getJavaOkHttp(host.url, host.url, 'YOUR_SECRET_KEY') : codeData}
                                language={codeLanguage}
                                showLineNumbers={false}
                                theme={codeTheme}
                                onChange={this.onCodeChange}
                            />

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