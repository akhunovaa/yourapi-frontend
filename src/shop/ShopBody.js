import React, {Component} from 'react';
import './Shop.css';
import {NavLink} from "react-router-dom";
import {Grid, Icon, Segment} from "semantic-ui-react";
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
    };

    handleChange = (e, {id, name}) => {
        this.setState({[id]: name})
    };


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

        const {loading, apiList} = this.props;

        if (loading) {
            return <ShopLoadingIndicator/>
        }

        const host = window.location.origin.toString();
        const hasFirstRow = apiList[0] && apiList[0].size > 0 ? apiList[0] && apiList[0].size > 0 : apiList[1] && apiList[1].size > 0;

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
                                                        <LazyMiniImage
                                                            src={host + "/api-data/image/" + item.image + "/32/32"}/>
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
                                            <Icon style={{
                                                paddingLeft: '16px',
                                                color: this.state[item.id + item.name] === 'bookmark outline' ? '#2F80ED' : '#A5A5A5'
                                            }} link onClick={this.handleChange} id={item.id + item.name}
                                                  name={this.state[item.id + item.name] === 'bookmark outline' ? 'bookmark' : 'bookmark outline'}/>
                                        </div>
                                    </div>
                                    <div className="cell-grid-body">
                                        <div className="cell-grid-body-text">
                                            <NavLink to={getLink4Description(item.category) + item.id}
                                                     className='cell-grid-body-text'>{item.fullName}</NavLink><br/>
                                        </div>
                                        <div className="cell-grid-body-label">
                                            <label>от {item.username.nickname ? item.username.nickname : item.username.name}</label>
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
                {apiList[0] && apiList[0].size > 0 ?
                    (
                        <div id={apiList[0].data_name}>
                            <div
                                className={apiList[0] && apiList[0].size > 0 ? 'api-element-container-header' : 'api-element-container-header second-api-element'}>
                                <span className='main-form-header'>{apiList[0] ? apiList[0].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[0].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[0] ? apiList[0].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[0] ? apiList[0].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[1] && apiList[1].size > 0 ?
                    (
                        <div id={apiList[1].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[1] ? apiList[1].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[1].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[1] ? apiList[1].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[1] ? apiList[1].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[2] && apiList[2].size > 0 ?
                    (
                        <div id={apiList[2].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[2] ? apiList[2].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[2].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[2] ? apiList[2].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[2] ? apiList[2].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[3] && apiList[3].size > 0 ?
                    (
                        <div id={apiList[3].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[3] ? apiList[3].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[3].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[3] ? apiList[3].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[3] ? apiList[3].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[4] && apiList[4].size > 0 ?
                    (
                        <div id={apiList[4].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[4] ? apiList[4].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[4].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[4] ? apiList[4].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[4] ? apiList[4].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[5] && apiList[5].size > 0 ?
                    (
                        <div id={apiList[5].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[5] ? apiList[5].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[5].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[5] ? apiList[5].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[5] ? apiList[5].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[6] && apiList[6].size > 0 ?
                    (
                        <div id={apiList[6].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[6] ? apiList[6].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[6].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[6] ? apiList[6].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[6] ? apiList[6].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[7] && apiList[7].size > 0 ?
                    (
                        <div id={apiList[7].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[7] ? apiList[7].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[7].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[7] ? apiList[7].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[7] ? apiList[7].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[8] && apiList[8].size > 0 ?
                    (
                        <div id={apiList[8].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[8] ? apiList[8].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[8].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[8] ? apiList[8].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[8] ? apiList[8].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[9] && apiList[9].size > 0 ?
                    (
                        <div id={apiList[9].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[9] ? apiList[9].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[9].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[9] ? apiList[9].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[9] ? apiList[9].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }
                {apiList[10] && apiList[10].size > 0 ?
                    (
                        <div id={apiList[10].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[10] ? apiList[10].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[10].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[10] ? apiList[10].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[10] ? apiList[10].list : []}/>
                            </Grid>
                        </div>
                    )
                    :
                    (<></>)
                }

                {apiList[11] && apiList[11].size > 0 ?
                    (
                        <div id={apiList[11].data_name}>
                            <div
                                className={hasFirstRow ? 'api-element-container-header second-api-element' : 'api-element-container-header'}>
                                <span className='main-form-header'>{apiList[11] ? apiList[11].data_name : ''}</span>
                                <NavLink to={getLink4Category(apiList[11].data_name)}
                                         className='main-form-header-count right-label'>Посмотреть все
                                    ({apiList[11] ? apiList[11].size : 0})</NavLink>
                            </div>
                            <Grid columns='3'>
                                <Projects items={apiList[11] ? apiList[11].list : []}/>
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