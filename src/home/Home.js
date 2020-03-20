import React, {Component} from 'react';
import './Home.css';
import {Grid, Segment, Image, Form, Button, Icon} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import grid from '../img/grid-img.png';
import {apiProjectFullListGet} from "../util/APIUtils";
import Alert from "react-s-alert";
import LoadingIndicator from '../common/LoadingIndicator';

class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false,
            roleAdmin: true,
            //projects: [{"id":25,"name":"25.Best-Test-API","fullName":"Best Test API","description":"This is a first API for a BIG start!","category":"Данные","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat@ya.ru"}},{"id":26,"name":"26.Second-Test-API","fullName":"Second Test API","description":"This is a second API for a BIG start!","category":"Спорт","banned":false,"approved":false,"private":false,"username":{"id":2,"username":"admin","email":"azat@ya.ru"}}],
            projects: [],
            loading: false
        };

        this.reload = this.reload.bind(this);
    }

    componentDidMount(){
        console.log(process.env.REACT_APP_API_URL)
        this._isMounted = true;
        this.setState({
            loading: true
        });
        if (this.state.projects.length > 0) return;
        apiProjectFullListGet()
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        projects : response.response,
                        loading: false
                    })
                }
            }).catch(error => {
            Alert.error('Ошибка получения списка проектов' || (error && error.message));
            this.setState({
                loading: false
            });
        });
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    reload (){
        window.location.reload();
    };

    render() {
        const linkData = '/shop/category/data/api';
        const linkFinance = '/shop/category/finance/api';
        const linkMobile = '/shop/category/mobile/api';
        const linkMap = '/shop/category/map/api';
        const linkAdv = '/shop/category/adv/api';
        const linkSocial= '/shop/category/social/api';
        const linkHealth= '/shop/category/health/api';
        const linkSport= '/shop/category/sport/api';
        const linkWeb= '/shop/category/web/api';
        const linkOther= '/shop/category/other/api';


        const Projects = ({items}) => (
            <>
                {
                    items.map(item => (
                        <Grid.Column key={item.id} className="body-data">
                            <Segment>
                                <div className="body-cell-data">
                                    <div className="cell-header">
                                        <div className="grid-logo">
                                            <Image src={grid} />
                                        </div>
                                        <div className="grid-labels">
                                            <Icon link name='star' style={{color: '#F39847'}}/>
                                            <label style={{color: '#F39847'}}>{item.id}</label>
                                            <Icon style={{paddingLeft: '16px'}} link name='bookmark' />
                                        </div>
                                    </div>
                                    <div className="cell-grid-body">
                                        <div className="cell-grid-body-text">
                                            <NavLink to={linkWeb} className='cell-grid-body-text'>{item.fullName}</NavLink><br/>
                                        </div>
                                        <div className="cell-grid-body-label">
                                            <label>от {item.username.username}</label>
                                        </div>
                                        <div className="cell-grid-body-description">
                                            <label>{item.description}</label>
                                        </div>
                                        <div className="cell-grid-body-category">
                                            <span>&#183; {item.category}</span>
                                        </div>
                                    </div>
                                </div>
                            </Segment>
                        </Grid.Column>
                    ))}
            </>
        );

        if (this.state.loading) {
            return <LoadingIndicator/>
        }

        return (
            <div className="main">
                <div className="header-picture">
                    <div className='header-text'>
                        <div className="header-text-main">
                            <NavLink to="/"><b style={{color: '#F2F2F2'}}>YourAPI</b></NavLink>
                        </div>
                        <div className="header-slogan">
                            <label>Небольшой рекламный</label><br />
                            <label>слоган. Может в две строчки</label>
                        </div>
                        <div className="header-buttons">
                            <div className="header-api-create-button">
                                <Button className="create-button" style={{background: '#F39847', color: 'white'}}
                                        size='large'>
                                    <NavLink style={{color: 'white'}} to='/profile/api?page=add'>Разместить API</NavLink>
                                </Button>
                            </div>
                            <div className="header-api-create-button">
                                <Button className="create-button" style={{background: '#FFFFFF', color: '#4F4F4F'}}
                                        size='large'>
                                    <NavLink style={{background: '#FFFFFF', color: '#4F4F4F'}} to='/profile/administration'>Создать компанию</NavLink>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-body-container">
                    <div className="main-body-new-api-container">
                        <div className="main-body-header-links">
                            <div className="main-body-new-api-container-name">
                                <label>Новинки</label>
                            </div>
                            <div className="main-body-new-api-container-show-link">
                                <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все ({this.state.projects.length})</NavLink>
                            </div>
                        </div>
                        <div className="body-data">
                            <Grid columns='3'>
                                <Projects items={this.state.projects}/>
                            </Grid>
                        </div>
                    </div>
                    <div className="main-body-popular-api-container">
                        <div className="main-body-header-links">
                            <div className="main-body-new-api-container-name">
                                <label>Популярные</label>
                            </div>
                            <div className="main-body-new-api-container-show-link">
                                <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все ({this.state.projects.length})</NavLink>
                            </div>
                        </div>
                        <div className="body-data">
                            <Grid columns='3'>
                                <Projects items={this.state.projects}/>
                            </Grid>
                        </div>
                        <div className="main-body-test-api-container">
                            <div className="main-body-header-links">
                                <div className="main-body-new-api-container-name">
                                    <label>Мои тестовые API</label> <Icon name='user outline' />
                                </div>
                            </div>
                            <div className="body-data">
                                <Grid columns='3'>
                                    <Projects items={this.state.projects}/>
                                </Grid>
                            </div>
                        </div>
                        <div className="main-body-test-api-container">
                            <div className="main-body-header-links">
                                <div className="main-body-new-api-container-name">
                                    <label>Рекомендации</label>
                                </div>
                                <div className="main-body-new-api-container-show-link">
                                    <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все ({this.state.projects.length})</NavLink>
                                </div>
                            </div>
                            <div className="body-data">
                                <Grid columns='3'>
                                    <Projects items={this.state.projects}/>
                                </Grid>
                            </div>
                        </div>
                        <div className="main-body-test-api-container">
                            <div className="main-body-header-links">
                                <div className="main-body-new-api-container-name">
                                    <label>Данные</label>
                                </div>
                                <div className="main-body-new-api-container-show-link">
                                    <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все ({this.state.projects.length})</NavLink>
                                </div>
                            </div>
                            <div className="body-data">
                                <Grid columns='3'>
                                    <Projects items={this.state.projects}/>
                                </Grid>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default Home;