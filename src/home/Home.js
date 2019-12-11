import React, {Component} from 'react';
import './Home.css';
import {Grid, Segment, Image, Form, Button, Icon} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import grid from '../img/grid-img.png';

class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false
            roleAdmin: true
        };

        this.reload = this.reload.bind(this);
    }

    componentDidMount(){
        this._isMounted = true;
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    reload (){
        window.location.reload();
    };

    render() {
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
                                    Разместить API
                                </Button>
                            </div>
                            <div className="header-api-create-button">
                                <Button className="create-button" style={{background: '#FFFFFF', color: '#4F4F4F'}}
                                        size='large'>
                                    Создать компанию
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
                                <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все (30)</NavLink>
                            </div>
                        </div>
                        <div className="body-data">
                            <Grid columns='3'>
                                <Grid.Column>
                                    <Segment>
                                        <div className="body-cell-data">
                                            <div className="cell-header">
                                                <div className="grid-logo">
                                                    <Image src={grid} />
                                                </div>
                                                <div className="grid-labels">
                                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                                    <label style={{color: '#F39847'}}>4,9</label>
                                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                </div>
                                            </div>
                                            <div className="cell-grid-body">
                                                <div className="cell-grid-body-text">
                                                    <label>API-FOOTBALL</label><br />
                                                </div>
                                                <div className="cell-grid-body-label">
                                                    <label>от apisports</label>
                                                </div>
                                                <div className="cell-grid-body-description">
                                                    <label>Коэффициенты перед матчем, события, составы команд, тренеры, игроки, лучшие бомбардиры, турнирная...</label>
                                                </div>
                                                <div className="cell-grid-body-category">
                                                    <span>&#183; Спорт, Футбол</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column className="body-data">
                                    <Segment>
                                        <div className="body-cell-data">
                                            <div className="cell-header">
                                                <div className="grid-logo">
                                                    <Image src={grid} />
                                                </div>
                                                <div className="grid-labels">
                                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                                    <label style={{color: '#F39847'}}>4,5</label>
                                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark' />
                                                </div>
                                            </div>
                                            <div className="cell-grid-body">
                                                <div className="cell-grid-body-text">
                                                    <label>Web Search</label><br />
                                                </div>
                                                <div className="cell-grid-body-label">
                                                    <label>от contextualwebseacr</label>
                                                </div>
                                                <div className="cell-grid-body-description">
                                                    <label>API веб-поиска. Новости API, API изображения</label>
                                                </div>
                                                <div className="cell-grid-body-category">
                                                    <span>&#183; Web, Поиск</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column className="body-data">
                                    <Segment>
                                        <div className="body-cell-data">
                                            <div className="cell-header">
                                                <div className="grid-logo">
                                                    <Image src={grid} />
                                                </div>
                                                <div className="grid-labels">
                                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                                    <label style={{color: '#F39847'}}>4,9</label>
                                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                </div>
                                            </div>
                                            <div className="cell-grid-body">
                                                <div className="cell-grid-body-text">
                                                    <label>Get Video and Audio URL</label><br />
                                                </div>
                                                <div className="cell-grid-body-label">
                                                    <label>от Top-Rated</label>
                                                </div>
                                                <div className="cell-grid-body-description">
                                                    <label>Получите прямые ссылки для загрузки видео или аудио файлов практически с любого хостинг-сайта, например Youtube</label>
                                                </div>
                                                <div className="cell-grid-body-category">
                                                    <span>&#183; Web, Поиск</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Segment>
                                </Grid.Column>
                            </Grid>
                        </div>
                    </div>
                    <div className="main-body-popular-api-container">
                        <div className="main-body-header-links">
                            <div className="main-body-new-api-container-name">
                                <label>Популярные</label>
                            </div>
                            <div className="main-body-new-api-container-show-link">
                                <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все (30)</NavLink>
                            </div>
                        </div>
                        <div className="body-data">
                            <Grid columns='3'>
                                <Grid.Column>
                                    <Segment>
                                        <div className="body-cell-data">
                                            <div className="cell-header">
                                                <div className="grid-logo">
                                                    <Image src={grid} />
                                                </div>
                                                <div className="grid-labels">
                                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                                    <label style={{color: '#F39847'}}>4,9</label>
                                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                </div>
                                            </div>
                                            <div className="cell-grid-body">
                                                <div className="cell-grid-body-text">
                                                    <label>API-FOOTBALL</label><br />
                                                </div>
                                                <div className="cell-grid-body-label">
                                                    <label>от apisports</label>
                                                </div>
                                                <div className="cell-grid-body-description">
                                                    <label>Коэффициенты перед матчем, события, составы команд, тренеры, игроки, лучшие бомбардиры, турнирная...</label>
                                                </div>
                                                <div className="cell-grid-body-category">
                                                    <span>&#183; Категория, подкатегория</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column className="body-data">
                                    <Segment>
                                        <div className="body-cell-data">
                                            <div className="cell-header">
                                                <div className="grid-logo">
                                                    <Image src={grid} />
                                                </div>
                                                <div className="grid-labels">
                                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                                    <label style={{color: '#F39847'}}>4,5</label>
                                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark' />
                                                </div>
                                            </div>
                                            <div className="cell-grid-body">
                                                <div className="cell-grid-body-text">
                                                    <label>Web Search</label><br />
                                                </div>
                                                <div className="cell-grid-body-label">
                                                    <label>от contextualwebseacr</label>
                                                </div>
                                                <div className="cell-grid-body-description">
                                                    <label>API веб-поиска. Новости API, API изображения</label>
                                                </div>
                                                <div className="cell-grid-body-category">
                                                    <span>&#183; Категория, подкатегория</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Segment>
                                </Grid.Column>
                                <Grid.Column className="body-data">
                                    <Segment>
                                        <div className="body-cell-data">
                                            <div className="cell-header">
                                                <div className="grid-logo">
                                                    <Image src={grid} />
                                                </div>
                                                <div className="grid-labels">
                                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                                    <label style={{color: '#F39847'}}>4,9</label>
                                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                </div>
                                            </div>
                                            <div className="cell-grid-body">
                                                <div className="cell-grid-body-text">
                                                    <label>Get Video and Audio URL</label><br />
                                                </div>
                                                <div className="cell-grid-body-label">
                                                    <label>от Top-Rated</label>
                                                </div>
                                                <div className="cell-grid-body-description">
                                                    <label>Получите прямые ссылки для загрузки видео или аудио файлов практически с любого хостинг-сайта, например Youtube</label>
                                                </div>
                                                <div className="cell-grid-body-category">
                                                    <span>&#183; Категория, подкатегория</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Segment>
                                </Grid.Column>
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
                                    <Grid.Column>
                                        <Segment>
                                            <div className="body-cell-data">
                                                <div className="cell-header">
                                                    <div className="grid-logo">
                                                        <Image src={grid} />
                                                    </div>
                                                    <div className="grid-labels">
                                                        <Icon link name='star' style={{color: '#F39847'}}/>
                                                        <label style={{color: '#F39847'}}>4,5</label>
                                                        <Icon style={{paddingLeft: '16px'}} link name='bookmark' />
                                                    </div>
                                                </div>
                                                <div className="cell-grid-body">
                                                    <div className="cell-grid-body-text">
                                                        <label>Web Search</label><br />
                                                    </div>
                                                    <div className="cell-grid-body-label">
                                                        <label>от contextualwebseacr</label>
                                                    </div>
                                                    <div className="cell-grid-body-description">
                                                        <label>API веб-поиска. Новости API, API изображения</label>
                                                    </div>
                                                    <div className="cell-grid-body-category">
                                                        <span>&#183; Категория, подкатегория</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                            </div>
                        </div>
                        <div className="main-body-test-api-container">
                            <div className="main-body-header-links">
                                <div className="main-body-new-api-container-name">
                                    <label>Рекомендации</label>
                                </div>
                                <div className="main-body-new-api-container-show-link">
                                    <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все (30)</NavLink>
                                </div>
                            </div>
                            <div className="body-data">
                                <Grid columns='3'>
                                    <Grid.Column>
                                        <Segment>
                                            <div className="body-cell-data">
                                                <div className="cell-header">
                                                    <div className="grid-logo">
                                                        <Image src={grid} />
                                                    </div>
                                                    <div className="grid-labels">
                                                        <Icon link name='star' style={{color: '#F39847'}}/>
                                                        <label style={{color: '#F39847'}}>4,9</label>
                                                        <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                    </div>
                                                </div>
                                                <div className="cell-grid-body">
                                                    <div className="cell-grid-body-text">
                                                        <label>API-FOOTBALL</label><br />
                                                    </div>
                                                    <div className="cell-grid-body-label">
                                                        <label>от apisports</label>
                                                    </div>
                                                    <div className="cell-grid-body-description">
                                                        <label>Коэффициенты перед матчем, события, составы команд, тренеры, игроки, лучшие бомбардиры, турнирная...</label>
                                                    </div>
                                                    <div className="cell-grid-body-category">
                                                        <span>&#183; Категория, подкатегория</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column className="body-data">
                                        <Segment>
                                            <div className="body-cell-data">
                                                <div className="cell-header">
                                                    <div className="grid-logo">
                                                        <Image src={grid} />
                                                    </div>
                                                    <div className="grid-labels">
                                                        <Icon link name='star' style={{color: '#F39847'}}/>
                                                        <label style={{color: '#F39847'}}>4,5</label>
                                                        <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                    </div>
                                                </div>
                                                <div className="cell-grid-body">
                                                    <div className="cell-grid-body-text">
                                                        <label>Web Search</label><br />
                                                    </div>
                                                    <div className="cell-grid-body-label">
                                                        <label>от contextualwebseacr</label>
                                                    </div>
                                                    <div className="cell-grid-body-description">
                                                        <label>API веб-поиска. Новости API, API изображения</label>
                                                    </div>
                                                    <div className="cell-grid-body-category">
                                                        <span>&#183; Категория, подкатегория</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column className="body-data">
                                        <Segment>
                                            <div className="body-cell-data">
                                                <div className="cell-header">
                                                    <div className="grid-logo">
                                                        <Image src={grid} />
                                                    </div>
                                                    <div className="grid-labels">
                                                        <Icon link name='star' style={{color: '#F39847'}}/>
                                                        <label style={{color: '#F39847'}}>4,9</label>
                                                        <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                    </div>
                                                </div>
                                                <div className="cell-grid-body">
                                                    <div className="cell-grid-body-text">
                                                        <label>Get Video and Audio URL</label><br />
                                                    </div>
                                                    <div className="cell-grid-body-label">
                                                        <label>от Top-Rated</label>
                                                    </div>
                                                    <div className="cell-grid-body-description">
                                                        <label>Получите прямые ссылки для загрузки видео или аудио файлов практически с любого хостинг-сайта, например Youtube</label>
                                                    </div>
                                                    <div className="cell-grid-body-category">
                                                        <span>&#183; Категория, подкатегория</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
                                </Grid>
                            </div>
                        </div>
                        <div className="main-body-test-api-container">
                            <div className="main-body-header-links">
                                <div className="main-body-new-api-container-name">
                                    <label>Данные</label>
                                </div>
                                <div className="main-body-new-api-container-show-link">
                                    <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все (30)</NavLink>
                                </div>
                            </div>
                            <div className="body-data">
                                <Grid columns='3'>
                                    <Grid.Column>
                                        <Segment>
                                            <div className="body-cell-data">
                                                <div className="cell-header">
                                                    <div className="grid-logo">
                                                        <Image src={grid} />
                                                    </div>
                                                    <div className="grid-labels">
                                                        <Icon link name='star' style={{color: '#F39847'}}/>
                                                        <label style={{color: '#F39847'}}>4,9</label>
                                                        <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                    </div>
                                                </div>
                                                <div className="cell-grid-body">
                                                    <div className="cell-grid-body-text">
                                                        <label>API-FOOTBALL</label><br />
                                                    </div>
                                                    <div className="cell-grid-body-label">
                                                        <label>от apisports</label>
                                                    </div>
                                                    <div className="cell-grid-body-description">
                                                        <label>Коэффициенты перед матчем, события, составы команд, тренеры, игроки, лучшие бомбардиры, турнирная...</label>
                                                    </div>
                                                    <div className="cell-grid-body-category">
                                                        <span>&#183; Спорт, Футбол</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column className="body-data">
                                        <Segment>
                                            <div className="body-cell-data">
                                                <div className="cell-header">
                                                    <div className="grid-logo">
                                                        <Image src={grid} />
                                                    </div>
                                                    <div className="grid-labels">
                                                        <Icon link name='star' style={{color: '#F39847'}}/>
                                                        <label style={{color: '#F39847'}}>4,5</label>
                                                        <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                    </div>
                                                </div>
                                                <div className="cell-grid-body">
                                                    <div className="cell-grid-body-text">
                                                        <label>Web Search</label><br />
                                                    </div>
                                                    <div className="cell-grid-body-label">
                                                        <label>от contextualwebseacr</label>
                                                    </div>
                                                    <div className="cell-grid-body-description">
                                                        <label>API веб-поиска. Новости API, API изображения</label>
                                                    </div>
                                                    <div className="cell-grid-body-category">
                                                        <span>&#183; Web, Поиск</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column className="body-data">
                                        <Segment>
                                            <div className="body-cell-data">
                                                <div className="cell-header">
                                                    <div className="grid-logo">
                                                        <Image src={grid} />
                                                    </div>
                                                    <div className="grid-labels">
                                                        <Icon link name='star' style={{color: '#F39847'}}/>
                                                        <label style={{color: '#F39847'}}>4,9</label>
                                                        <Icon style={{paddingLeft: '16px'}} link name='bookmark outline' />
                                                    </div>
                                                </div>
                                                <div className="cell-grid-body">
                                                    <div className="cell-grid-body-text">
                                                        <label>Get Video and Audio URL</label><br />
                                                    </div>
                                                    <div className="cell-grid-body-label">
                                                        <label>от Top-Rated</label>
                                                    </div>
                                                    <div className="cell-grid-body-description">
                                                        <label>Получите прямые ссылки для загрузки видео или аудио файлов практически с любого хостинг-сайта, например Youtube</label>
                                                    </div>
                                                    <div className="cell-grid-body-category">
                                                        <span>&#183; Web, Поиск</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Segment>
                                    </Grid.Column>
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