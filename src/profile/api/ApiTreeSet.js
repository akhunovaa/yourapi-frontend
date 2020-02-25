import React, {Component} from 'react';
import './Api.css';
import {Icon, List} from "semantic-ui-react";
import {NavLink, withRouter} from 'react-router-dom';
import queryString from "query-string";
import classNames from 'classnames/bind';
import Alert from "react-s-alert";
import {apiProjectListGet} from "../../util/APIUtils";

class ApiTreeSet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hidden: true,
            arrow: 'chevron down',
            // projects: [{"id":22222,"name":"fd","category":"Спорт","banned":false,"approved":false,"private":true,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":9,"name":"yourapi.ru","description":"ref={this.image} onLoad={this.handleImageLoaded}","category":"Спорт","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":1,"name":"Second Test API","description":"This is a second API for a BIG start!","category":"Спорт","banned":true,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":7,"name":"API of DEV","description":"Краткое первое описание из DEV стенда 24 февраля 2020 года в 13:34\n\nКиша рядом и Warcraft 3 reforged )","category":"Спорт","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":4,"name":"Api with smart pictures","description":"Разработать сервис по сохранению openapi файла версии 3.0\nyaml и json. Примеры файлов прилагаются.","category":"Новости","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":5,"name":"Weather","description":"Разработать сервис по сохранению openapi файла версии 3.0\nyaml и json. Примеры файлов прилагаются.","category":"Новости","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":3,"name":"First Test API","description":"This is a 111 API for a BIG start!","category":"Новости","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":2,"name":"First Test API","description":"This is a 111 API for a BIG start!","category":"Новости","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":8,"name":"Первый API у Леночки","description":"Рядом спит Кишука","category":"Новости","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":6,"name":"API of Weather","description":"Краткое первое описание из DEV стенда 24 февраля 2020 года в 13:34\nКиша рядом и Warcraft 3 reforged )","category":"Спорт","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}},{"id":10,"name":"33.yourapi.ru","description":"","category":"Социальные сети","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat.akhunov@protonmail.com"}}]
            projects: []
        };
        this.toggle = this.toggle.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (this.state.projects) return;
        apiProjectListGet()
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        projects : response.response
                    })
                }
            }).catch(error => {
            Alert.error('Ошибка получения списка проектов' || (error && error.message));
        });
    }

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

    handleCheck(array, val) {
        return array.some(item => item.name === val);
    }

    render() {

        const namingArray = [];
        for (let i = 0; i < this.state.projects.length; i++) {
            namingArray.push(this.state.projects[i]);
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
                                    <Icon link id='currency' name={this.state.arrow} onClick={this.toggle} className={naming !== item.name ? 'api-disabled-color' : null}/>
                                </List.Content>
                                <List.Content>
                                    <span className={classNames({'api-disabled-color': naming !== item.name}, 'api-command-operation-text')}>{item.name}</span></List.Content>
                                <List.List hidden={false}>
                                    <List.Content className='sub-command'>
                                        <NavLink to={"/profile/api?name=" + item.name + "&page=update"}><span
                                            className={classNames({'api-disabled-color': naming !== item.name}, {'api-enabled-color': (naming === item.name && page === 'update')}, 'api-command-operation-text')}>Редактировать</span></NavLink>
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

                    <Projects items={this.state.projects}/>

                </List>
            </div>
        );
    }
}

export default withRouter(ApiTreeSet);