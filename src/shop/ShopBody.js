import React, {Component} from 'react';
import './Shop.css';
import {NavLink} from "react-router-dom";
import {Grid, Icon, Image, Segment} from "semantic-ui-react";
import {ShopLoadingIndicator} from "../common/LoadingIndicator";
import {getClassName4Color, getIconColor, getLink4Category, getLink4Description} from "../util/ElementsDataUtils";
import LazyMiniImage from '../util/LazyMiniImage';

class ShopBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        window.location.reload();
    }
    ;

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {

        if (this.props.loading) {
            return <ShopLoadingIndicator/>
        }

        const projects = this.props.apiList ? this.props.apiList : [];

        const host = window.location.origin.toString();
        const hasFirstRow = projects[0] && projects[0].size > 0 ? projects[0] && projects[0].size > 0 : projects[1] && projects[1].size > 0;

        const Projects = ({items}) => (
            <>
                {
                    items.map(item => (
                        <Grid.Column key={item.id + item.name} className="body-data">
                            <Segment className='api-element-container'>
                                <div className="api-element-data">
                                    <div className="cell-header">
                                        <div className="grid-logo">
                                            {
                                                item.image ? (
                                                    <NavLink
                                                        to={getLink4Description(item.category) + item.id}>
                                                        {/*<Image src={host + "/api-data/image/" + item.image + "/32/32"}/>*/}
                                                        <LazyMiniImage src={host + "/api-data/image/" + item.image + "/32/32"}/>
                                                    </NavLink>
                                                ) : (
                                                    <div className="home-api-text-avatar">
                                                        <NavLink
                                                            to={getLink4Description(item.category) + item.id}><span>{item.fullName && item.fullName[0]}</span></NavLink>
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
                                        <div className="api-element-footer">
                                            <div className={getClassName4Color(item.category)}>
                                                <Icon color={getIconColor(item.category)} name='dot circle'
                                                      size='small'/>
                                                <NavLink to={getLink4Category(item.category)}
                                                         className={getClassName4Color(item.category)}>{item.category}</NavLink>
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
            <div className="shop-form-container">
                {projects[0] && projects[0].size > 0 ?
                    (
                        <div id={projects[0].data_name}>
                            <div
                                className={projects[0] && projects[0].size > 0 ? 'api-element-container-header' : 'api-element-container-header second-api-element'}>
                                <span className='main-form-header'>{projects[0] ? projects[0].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[0].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[0] ? projects[0].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[0] ? projects[0].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[1] && projects[1].size > 0 ?
                    (
                        <div id={projects[1].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[1] ? projects[1].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[1].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[1] ? projects[1].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[1] ? projects[1].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[2] && projects[2].size > 0 ?
                    (
                        <div id={projects[2].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[2] ? projects[2].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[2].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[2] ? projects[2].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[2] ? projects[2].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[3] && projects[3].size > 0 ?
                    (
                        <div id={projects[3].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[3] ? projects[3].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[3].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[3] ? projects[3].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[3] ? projects[3].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[4] && projects[4].size > 0 ?
                    (
                        <div id={projects[4].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[4] ? projects[4].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[4].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[4] ? projects[4].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[4] ? projects[4].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[5] && projects[5].size > 0 ?
                    (
                        <div id={projects[5].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[5] ? projects[5].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[5].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[5] ? projects[5].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[5] ? projects[5].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[6] && projects[6].size > 0 ?
                    (
                        <div id={projects[6].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[6] ? projects[6].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[6].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[6] ? projects[6].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[6] ? projects[6].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[7] && projects[7].size > 0 ?
                    (
                        <div id={projects[7].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[7] ? projects[7].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[7].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[7] ? projects[7].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[7] ? projects[7].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[8] && projects[8].size > 0 ?
                    (
                        <div id={projects[8].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[8] ? projects[8].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[8].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[8] ? projects[8].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[8] ? projects[8].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div>

                    </div>)
                }
                {projects[9] && projects[9].size > 0 ?
                    (
                        <div id={projects[9].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{projects[9] ? projects[9].data_name : ''}</span>
                                <NavLink to={getLink4Category(projects[9].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({projects[9] ? projects[9].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={projects[9] ? projects[9].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<div unselectable='on' className='api-category-shop-empty'>
                        Данные отсутствуют
                    </div>)
                }
                <div style={{paddingTop: 20}}>

                </div>
            </div>
        )
    }
}

export default ShopBody;