import React, {Component} from 'react';
import './Home.css';
import {Button, Grid, Icon, Image, Segment} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
import {apiProjectFullListGet} from "../util/APIUtils";
import Alert from "react-s-alert";
import {getLink4Description} from "../util/ElementsDataUtils";
import {HomeCellLoadingIndicator, HomeLoadingIndicator} from '../common/LoadingIndicator';
import LazyImage from '../util/LazyImage';

class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false,
            roleAdmin: true,
            noveltyProjects: [],
            topProjects: [],
            recommendedProjects: [],
            loading: true,
            noveltyHidden: true,
            topHidden: true,
            recommendedHidden: true
        };

        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        apiProjectFullListGet()
            .then(response => {
                if (this._isMounted) {
                    this.setState({
                        noveltyProjects: response.response.new_api_list,
                        topProjects: response.response.top_api_list,
                        recommendedProjects: response.response.recommended_api_list,
                        loading: false
                    })
                }
            }).catch(error => {
            Alert.error('Ошибка запросе на получение проектов' || (error && error.message));
        });
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    };

    render() {
        const host = window.location.origin.toString();

        const Projects = ({items}) => (
            <>
                {
                    items.map(item => (
                        <Grid.Column key={item.id} className="body-data">
                            <Segment>
                                <div className="body-cell-data">
                                    <div>
                                        <div className="cell-header">
                                            <div className="grid-logo">
                                                {
                                                    item.image ? (
                                                        <NavLink
                                                            to={getLink4Description(item.category) + item.id}>
                                                            {/*<Image src={host + "/api-data/image/" + item.image + "/32/32"} onLoad={() => this.setState({imageLoaded: true})}/>*/}
                                                            <LazyImage src={host + "/api-data/image/" + item.image + "/32/32"} alt={item.fullName}/>
                                                        </NavLink>
                                                    ) : (
                                                        <div className="home-api-text-avatar">
                                                            <NavLink to={getLink4Description(item.category) + item.id}><span>{item.fullName && item.fullName[0]}</span></NavLink>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="grid-labels">
                                                <Icon link name='star' style={{color: '#F39847'}}/>
                                                <label style={{color: '#F39847'}}>{item.id}</label>
                                                <Icon style={{paddingLeft: '16px'}} link name='bookmark'/>
                                            </div>
                                        </div>
                                        <div className="cell-grid-body">
                                            <div className="cell-grid-body-text">
                                                <NavLink to={getLink4Description(item.category) + item.id}
                                                         className='cell-grid-body-text'>{item.fullName}</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>от {item.username.email}</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>{item.description}</label>
                                            </div>
                                            <div className="cell-grid-body-category">
                                                <span>&#183; {item.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Segment>
                        </Grid.Column>
                    ))}
            </>
        );


        return (
            <div className="main">
                <div className="header-picture">
                    <div className='header-text'>
                        <div className="header-text-main">
                            <NavLink to="/"><b style={{color: '#F2F2F2'}}>YourAPI</b></NavLink>
                        </div>
                        <div className="header-slogan">
                            <label>Your Marketplace Your's API</label><br/>
                            <label>Artificial. Programmable. Intelligence.</label>
                        </div>
                        <div className="header-buttons">
                            <div className="header-api-create-button">
                                <Button className="create-button" style={{background: '#F39847', color: 'white'}}
                                        size='large'>
                                    <NavLink style={{color: 'white'}} to='/profile/api?page=add'>Разместить
                                        API</NavLink>
                                </Button>
                            </div>
                            <div className="header-api-create-button">
                                <Button className="create-button" style={{background: '#FFFFFF', color: '#4F4F4F'}}
                                        size='large'>
                                    <NavLink style={{background: '#FFFFFF', color: '#4F4F4F'}}
                                             to='/profile/administration'>Создать компанию</NavLink>
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
                                {this.state.loading ? (<HomeLoadingIndicator/>) : (
                                    <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все
                                        ({this.state.noveltyProjects ? this.state.noveltyProjects.length : 0})
                                    </NavLink>
                                )}
                            </div>
                        </div>
                        <div className="body-data">
                            <Grid columns='3'>
                                {this.state.loading ? (<HomeCellLoadingIndicator/>) : (
                                    <Projects items={this.state.noveltyProjects} hidden={this.state.noveltyHidden}/>)}
                            </Grid>
                        </div>
                    </div>
                    <div className="main-body-popular-api-container">
                        <div className="main-body-header-links">
                            <div className="main-body-new-api-container-name">
                                <label>Популярные/Топ</label>
                            </div>
                            <div className="main-body-new-api-container-show-link">
                                {this.state.loading ? (<HomeLoadingIndicator/>) : (
                                    <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все
                                        ({this.state.topProjects ? this.state.topProjects.length : 0})
                                    </NavLink>
                                )}
                            </div>
                        </div>
                        <div className="body-data">
                            <Grid columns='3'>
                                {this.state.loading ? (<HomeCellLoadingIndicator/>) : (
                                    <Projects items={this.state.topProjects} hidden={this.state.topProjects}/>)}
                            </Grid>
                        </div>
                        <div className="main-body-test-api-container">
                            <div className="main-body-header-links">
                                <div className="main-body-new-api-container-name">
                                    <label>Рекомендации</label>
                                </div>
                                <div className="main-body-new-api-container-show-link">
                                    {this.state.loading ? (<HomeLoadingIndicator/>) : (
                                        <NavLink to="#" style={{color: '#2F80ED'}}>Посмотреть все
                                            ({this.state.recommendedProjects ? this.state.recommendedProjects.length : 0})
                                        </NavLink>
                                    )}
                                </div>
                            </div>
                            <div className="body-data">
                                <Grid columns='3'>
                                    {this.state.loading ? (<HomeCellLoadingIndicator/>) : (
                                        <Projects items={this.state.recommendedProjects}
                                                  hidden={this.state.recommendedProjects}/>)}
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