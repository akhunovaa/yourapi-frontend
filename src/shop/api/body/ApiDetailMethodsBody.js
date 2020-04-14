import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Icon, Input, List} from "semantic-ui-react";
import LoadingIndicator from "../../../common/LoadingIndicator";
import ApiDetailMethodsOperation from "./ApiDetailMethodsOperation";
import ApiRestrictedOperation from "./ApiRestrictedOperation";
import queryString from "query-string";
import {withRouter} from "react-router";
import classNames from "classnames/bind";
import {NavLink} from "react-router-dom";

class ApiDetailMethodsBody extends Component {

    _isMounted = false;
    path = '';

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            selectedPath: '',
            info: null,
            response: '',
            operations: [],
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
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.toggle = this.toggle.bind(this);
        this.selected = this.selected.bind(this);
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


    selected(event) {
        let elem = event.target;
        this.path = elem.id;
    }


    render() {

        const {authenticated, link, handleSliderChange} = this.props;
        const {loading} = this.state;

        if (loading) {
            return <LoadingIndicator/>
        }

        const operations = this.props.operations ? this.props.operations : [];

        const operationNameArray = [];
        for (let i = 0; i < operations.length; i++) {
            operationNameArray.push(operations[i].path);
        }

        const params = queryString.parse(this.props.location.search);
        let operationNaming = (params.operation !== 'undefined' && this.handleCheck(operationNameArray, params.operation)) ? params.operation : '/';

        let linkx = link + "&operation=";
        const HttpMethods = ({items}, {index}) => (
            <>
                {
                    items.map(item => (
                        <List.List key={index + item.path} className='detail-methods-element-body-content'
                                   hidden={this.state.hidden.p1}>
                            <List.Content className='detail-methods-element-body'>
                                <NavLink to={linkx + item.path}>
                                    <div
                                        className={classNames({'detail-methods-element-body-paragraph-selected': (operationNaming === item.path)}, 'detail-methods-element-body-paragraph')}
                                        id={item.path}>
                                        <span id={item.path} style={{color: '#219653'}}>{item.method}</span><span
                                        id={item.path}>{item.path}</span>
                                    </div>
                                </NavLink>
                            </List.Content>
                        </List.List>
                    ))}
            </>
        );

        return (
                <div className='detail-methods-body'>
                    {authenticated ? (
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
                                                <HttpMethods items={operations}/>
                                            </div>
                                        </List.Item>
                                    </List>
                                </div>
                            </div>
                            <ApiDetailMethodsOperation link={link} operations={operations} {...this.props}/>
                        </div>
                    ) : (
                        <ApiRestrictedOperation handleSliderChange={handleSliderChange}/>
                    )}
                </div>
        )
    }
}

export default withRouter(ApiDetailMethodsBody);
