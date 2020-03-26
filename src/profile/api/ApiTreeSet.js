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
            hidden: {
                id: true,
            },
            arrow: {
                id: 'chevron down'
            }
        };
        this.toggle = this.toggle.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    toggle(event) {
        const target = event.target;
        const inputName = target.id;
        let hidden = this.state.hidden;
        let arrows = this.state.arrow;
        const open = hidden[inputName];
        hidden[inputName] = !open;
        arrows[inputName] = open ? 'chevron down' : 'chevron up';
        this.setState({
            hidden: hidden,
            arrow: arrows
        });
    }

    handleCheck(array, val) {
        return array.some(item => item.name === val);
    }

    render() {

        const namingArray = [];
        for (let i = 0; i < this.props.projects.length; i++) {
            namingArray.push(this.props.projects[i]);
        }
        const pagingArray = ['about', 'members', 'list', 'update'];
        const params = queryString.parse(this.props.location.search);
        let naming = (params.name !== 'undefined' && this.handleCheck(namingArray, params.name)) ? params.name : 'API-FOOTBALL';
        const Projects = ({items}) => (
            <>
                {
                    items.map(item => (
                            <List.Item key={item.id} style={{paddingTop: 28, paddingLeft: 22, whiteSpace: 'nowrap'}}>
                                <List.Content floated='right'>
                                    <Icon link id={item.id} name={this.state.arrow[item.id] ? this.state.arrow[item.id] : 'chevron down'} onClick={this.toggle} className={naming !== item.name ? 'api-disabled-color' : null}/>
                                </List.Content>
                                <List.Content>
                                    <NavLink to={"/profile/api?page=update&name=" + item.name }><span className={classNames({'api-disabled-color': naming !== item.name}, {'api-enabled-color': (naming === item.name)}, 'api-command-operation-text')}>{item.name}</span></NavLink></List.Content>
                                <List.List hidden={!this.state.hidden[item.id]}>
                                    <List.Content className='sub-command'>
                                        <NavLink to={"/profile/api?page=update&name=" + item.name }><span className={classNames({'api-disabled-color': naming !== item.name}, {'api-enabled-color': (naming === item.name && page === 'update')}, 'api-command-operation-text')}>Редактировать</span></NavLink>
                                    </List.Content>
                                </List.List>
                            </List.Item>
                    ))}
            </>
        );



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

                    <Projects items={this.props.projects}/>

                </List>
            </div>
        );
    }
}

export default withRouter(ApiTreeSet);