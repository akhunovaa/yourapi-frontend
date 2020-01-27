import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Button, Dropdown, Form, Icon, Input, List, TextArea} from "semantic-ui-react";
import ApiDetailMethodsResponseExampleHeader from "./header/ApiDetailMethodsResponseExampleHeader";
import ApiDetailMethodsSchemeHeader from "./header/ApiDetailMethodsSchemeHeader";
import ApiDetailMethodsResponseExampleBody from "./ApiDetailMethodsResponseExampleBody";
import ApiDetailMethodsSchemeBody from "./ApiDetailMethodsSchemeBody";
import queryString from "query-string";

class ApiDetailMethodsBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            hidden: {
                p1: false,
                fixtures: true,
                v1: true,
                countries: true,
                leagues: true,
                teams: true
            },
            arrow: {
                p1: 'chevron up',
                fixtures: 'chevron down',
                v1: 'chevron down',
                countries: 'chevron down',
                leagues: 'chevron down',
                teams: 'chevron down'
            },
            project: 'Мой API',
            host: 'api-football-v.1p.yourapi...',
            key: 'dsjghse9gus9pgoj4;ow5...',
            idNumber: '123456',
            language: '(Node.js) Unirest',
            code: 'var unirest = require("unirest");\n' +
                '\n' +
                'var req = unirest("GET", "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/spelling/AutoComplete");\n' +
                '\n' +
                'req.query({\n' +
                '\t"text": "do"\n' +
                '});\n' +
                '\n' +
                'req.headers({\n' +
                '\t"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",\n' +
                '\t"x-rapidapi-key": "d84d4c60c9msh148bf271be3d9f5p10d2'
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.toggle = this.toggle.bind(this);
        this.renderSwitchHeader = this.renderSwitchHeader.bind(this);
        this.renderSwitchBody = this.renderSwitchBody.bind(this);
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
        const params = queryString.parse(this.props.location.search);
        const paging = (params.code !== 'undefined' && this.handleCheck(pagingArray, params.code)) ? params.code : 'example';
        switch (paging) {
            case 'example':
                return <ApiDetailMethodsResponseExampleBody {...this.props} />;
            case 'scheme':
                return <ApiDetailMethodsSchemeBody {...this.props} />;
            default:
                return <ApiDetailMethodsResponseExampleBody {...this.props} />
        }
    }


    render() {
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
        return (
            <div>
                <div className='detail-methods-body'>
                    <div className='detail-methods-main-columns'>
                        <div className='detail-methods-endpoints-container'>
                            <div className='detail-methods-title'>
                                <Icon name='list' className=''/>
                                <span>Endpoints</span>
                            </div>
                            <div className='detail-methods-title-label'>
                                <span>Выберите операцию, доступную для API</span>
                            </div>
                            <div className='detail-methods-search'>
                                <Input size={'small'} fluid icon={{name: 'search', link: true}}
                                       placeholder='Поиск...' id="search"
                                       name="search"/>
                            </div>
                            <div className='detail-methods-filter-text'>
                                <List verticalAlign='middle'>
                                    <List.Item>
                                        <div className='detail-methods-filter-element'>
                                            <List.Content floated='right'>
                                                <div className='detail-methods-filter-element-header'>
                                                    <Icon link id='p1' name={this.state.arrow.p1}
                                                          onClick={this.toggle}/>
                                                </div>
                                            </List.Content>
                                            <List.Content>
                                                <div className='detail-methods-filter-element-header'>
                                                    <span className='detail-methods-filter-text-title'>Фильтр</span>
                                                    <span
                                                        className='detail-methods-filter-text-title-main'>Операции</span>
                                                </div>
                                            </List.Content>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.p1}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span style={{color: '#219653'}}>GET</span>
                                                        <span> predictions</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content-padded'
                                                       hidden={this.state.hidden.p1}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span style={{color: '#219653'}}>GET</span>
                                                        <span> timezone</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className='detail-methods-filter-element-second'>
                                            <List.Content floated='left' style={{marginRight: 5}}>
                                                <div className='detail-methods-filter-element-header'>
                                                    <Icon link id='fixtures' name={this.state.arrow.fixtures}
                                                          onClick={this.toggle} style={{paddingRight: 0}}/>
                                                </div>
                                            </List.Content>
                                            <List.Content>
                                                <div className='detail-methods-filter-element-header'>
                                                    <span className='detail-methods-filter-text-title'>Fixtures</span>
                                                </div>
                                            </List.Content>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.fixtures}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>Adjustable fixture</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.fixtures}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>Grinding fixtures</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.fixtures}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>Assembly fixture</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className='detail-methods-filter-element-second'>
                                            <List.Content floated='left' style={{marginRight: 5}}>
                                                <div className='detail-methods-filter-element-header'>
                                                    <Icon link id='teams' name={this.state.arrow.teams}
                                                          onClick={this.toggle} style={{paddingRight: 0}}/>
                                                </div>
                                            </List.Content>
                                            <List.Content>
                                                <div className='detail-methods-filter-element-header'>
                                                    <span className='detail-methods-filter-text-title'>Teams</span>
                                                </div>
                                            </List.Content>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.teams}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>Рубин</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.teams}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>Манчестер</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.teams}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>Ливерпуль</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className='detail-methods-filter-element-second'>
                                            <List.Content floated='left' style={{marginRight: 5}}>
                                                <div className='detail-methods-filter-element-header'>
                                                    <Icon link id='v1' name={this.state.arrow.v1}
                                                          onClick={this.toggle} style={{paddingRight: 0}}/>
                                                </div>
                                            </List.Content>
                                            <List.Content>
                                                <div className='detail-methods-filter-element-header'>
                                                    <span className='detail-methods-filter-text-title'>V1</span>
                                                </div>
                                            </List.Content>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.v1}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>1.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.v1}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>2.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.v1}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>3.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className='detail-methods-filter-element-second'>
                                            <List.Content floated='left' style={{marginRight: 5}}>
                                                <div className='detail-methods-filter-element-header'>
                                                    <Icon link id='countries' name={this.state.arrow.countries}
                                                          onClick={this.toggle} style={{paddingRight: 0}}/>
                                                </div>
                                            </List.Content>
                                            <List.Content>
                                                <div className='detail-methods-filter-element-header'>
                                                    <span
                                                        className='detail-methods-filter-text-title'>Countries&Seasons</span>
                                                </div>
                                            </List.Content>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.countries}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>1.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.countries}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>2.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.countries}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>3.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                        </div>
                                    </List.Item>
                                    <List.Item>
                                        <div className='detail-methods-filter-element-second'>
                                            <List.Content floated='left' style={{marginRight: 5}}>
                                                <div className='detail-methods-filter-element-header'>
                                                    <Icon link id='leagues' name={this.state.arrow.leagues}
                                                          onClick={this.toggle} style={{paddingRight: 0}}/>
                                                </div>
                                            </List.Content>
                                            <List.Content>
                                                <div className='detail-methods-filter-element-header'>
                                                    <span className='detail-methods-filter-text-title'>Leagues</span>
                                                </div>
                                            </List.Content>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.leagues}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>1.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.leagues}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>2.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                            <List.List className='detail-methods-element-body-content'
                                                       hidden={this.state.hidden.leagues}>
                                                <List.Content className='detail-methods-element-body'>
                                                    <div className='detail-methods-element-body-paragraph'>
                                                        <span>3.0</span>
                                                    </div>
                                                </List.Content>
                                            </List.List>
                                        </div>
                                    </List.Item>
                                </List>
                            </div>
                        </div>
                        <div className='detail-methods-property-container'>
                            <div className='detail-methods-title'>
                                <Icon name='cog' className=''/>
                                <span>Свойства</span>
                            </div>
                            <div className='detail-methods-title-label'>
                                <span>Выбранной операции</span>
                            </div>
                            <div className='detail-methods-properties-title'>
                                <span>Описание</span>
                            </div>
                            <div className='detail-methods-properties-text'>
                                <span>Получите несколько прогнозов для одной команды</span>
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
                                       name="host" defaultValue={this.state.host}/>
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
                                <Button basic className='detail-methods-test-button' style={{background: '#2F80EFD'}}>
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
                </div>
            </div>
        )
    }
}

export default ApiDetailMethodsBody;
