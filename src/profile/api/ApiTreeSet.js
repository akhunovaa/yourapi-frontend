import React, {Component} from 'react';
import './Api.css';
import {Icon, List} from "semantic-ui-react";
import {NavLink, withRouter} from 'react-router-dom';
import queryString from "query-string";
import classNames from 'classnames/bind';

class ApiTreeSet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            hidden2: true,
            arrow: 'chevron down',
            arrow2: 'chevron down'
        };
        this.toggle = this.toggle.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    toggle() {
        const open = this.state.hidden;
        this.setState({hidden: !open, arrow: open ? 'chevron up' : 'chevron down'})
    }

    toggle2() {
        const open = this.state.hidden2;
        this.setState({hidden2: !open, arrow2: open ? 'chevron up' : 'chevron down'})
    }

    handleCheck(array, val) {
        return array.some(item => item === val);
    }

    render() {
        const namingArray = ['API-FOOTBALL', 'API-BASKETBALL'];
        const pagingArray = ['about', 'members', 'list', 'update'];
        const params = queryString.parse(this.props.location.search);
        let naming = (params.company !== 'undefined' && this.handleCheck(namingArray, params.company)) ? params.company : 'API-FOOTBALL';
        let page = (params.page !== 'undefined' && this.handleCheck(pagingArray, params.page)) ? params.page : 'update';

        return (
            <div className='api-command-toggle'>
                <List verticalAlign='middle'>
                    <List.Item>
                        <List.Content>
                            <div className=''>
                                <Icon className='api-command-operation-icon api-list-icon' name='rocket' link/>
                                <NavLink to="/profile/api?page=list"><span className='api-list-text api-list-padding'>Мои API</span></NavLink>
                            </div>
                        </List.Content>
                    </List.Item>
                    <List.Item  style={{paddingTop: 28, paddingLeft: 22}}>
                        <List.Content floated='right'>
                            <Icon link name={this.state.arrow} onClick={this.toggle}
                                  className={naming !== 'API-FOOTBALL' ? 'api-disabled-color' : null}/>
                        </List.Content>
                        <List.Content><span
                            className={classNames({'api-disabled-color': naming !== 'API-FOOTBALL'}, 'api-command-operation-text')}>API-FOOTBALL</span></List.Content>
                        <List.List hidden={this.state.hidden}>
                            <List.Content className='sub-command'>
                                <NavLink to="/profile/api?name=API-FOOTBALL&page=update"><span
                                    className={classNames({'api-disabled-color': naming !== 'API-FOOTBALL'}, {'api-enabled-color': (naming === 'API-FOOTBALL' && page === 'update')}, 'api-command-operation-text')}>Редактировать</span></NavLink>
                            </List.Content>
                        </List.List>
                    </List.Item>

                    <List.Item style={{paddingTop: 24, paddingLeft: 22}}>
                        <List.Content floated='right'>
                            <Icon link name={this.state.arrow2} onClick={this.toggle2}
                                  className={naming !== 'API-BASKETBALL' ? 'api-disabled-color' : null}/>
                        </List.Content>
                        <List.Content><span
                            className={classNames({'api-disabled-color': naming !== 'API-BASKETBALL'}, 'api-command-operation-text')}>API-BASKETBALL</span></List.Content>
                        <List.List hidden={this.state.hidden2}>
                            <List.Content className='sub-command'>
                                <NavLink to="/profile/api?name=API-BASKETBALL&page=update"><span
                                    className={classNames({'api-disabled-color': naming !== 'API-BASKETBALL'}, {'api-enabled-color': (naming === 'API-BASKETBALL' && page === 'update')}, 'api-command-operation-text')}>Редактировать</span></NavLink>
                            </List.Content>
                        </List.List>
                    </List.Item>
                </List>
            </div>
        );
    }
}

export default withRouter(ApiTreeSet);