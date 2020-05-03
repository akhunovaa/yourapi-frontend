import React, {Component} from 'react';
import './ApiBookmark.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Grid, Icon, Segment} from "semantic-ui-react";
import Slider from '@material-ui/core/Slider';
import {
    apiFullListGet,
    bookmarkAdd,
    bookmarkApiListGet,
    bookmarkRemove
} from "../../util/APIUtils";
import Alert from "react-s-alert";
import {getClassName4Color, getIconColor, getLink4Category, getLink4Description} from "../../util/ElementsDataUtils";
import LazyMiniImage from '../../util/LazyMiniImage';
import FilterBookmarkLinkElement from "../elements/FilterBookmarkLinkElement";
import {BOOKMARK_REQUEST_DEFAULT_LIMIT} from "../../constants";
import {categoryLoadingIndicator, BookmarkPageLoadingIndicator} from "../../common/LoadingIndicator";
import {CategoryShopLoadingIndicator} from "../../common/LoadingIndicator";

class ApiBookmark extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            bookmarkLoading: true,
            bookmarkData: [],
            bookmarkedApiData: [],
            apiList: [],
            categoryName: '',
            responseScale: [0, 1000],
            responseStableScale: [0, 100]
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        document.title = 'YourAPI | Избранное';
        if (this._isMounted) {
            this.requestApiData();
        }
    }

    requestApiData =  async () => {
        apiFullListGet()
            .then(response => {
                this.setState({
                    loading: false,
                    apiList: response.response
                });
                this.countCategoryBookMarkedSize();
            }).catch(error => {
            Alert.error('Ошибка запросе на получение проекта' || (error && error.message));
            this.setState({loading: false})
        });
    };

    requestBookmarkList = async () => {
        this.setState({bookmarkLoading: true});
        bookmarkApiListGet(BOOKMARK_REQUEST_DEFAULT_LIMIT)
            .then(response => {
                this.setState({
                    bookmarkData: response.response,
                    bookmarkLoading: false
                });
            }).catch(error => {
            this.setState({bookmarkLoading: false});
        });
    };

    countCategoryBookMarkedSize = async () => {
        let bookmarkedApiData = [];
        this.setState({bookmarkLoading: true});
        const {apiList} = this.state;

        for (const apiData of apiList) {
            const innerList = apiData.list;
            for (const api of innerList) {
                if (api.bookmarked) {
                    bookmarkedApiData.push(api);
                }
            }
        }
        this.setState({bookmarkedApiData: bookmarkedApiData, bookmarkLoading: false});
    };


    handleChange = (e, {id, name}) => {
        const {authenticated} = this.props;

        const bookmarked = name === 'bookmark' ? 'bookmark' : 'bookmark outline';
        this.setState({
            [id]: name
        });

        if (!authenticated) {
            this.setState({
                [id]: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
            });
            return;
        }

        if (bookmarked === 'bookmark') {
            bookmarkRemove(id)
                .then(response => {
                    this.setState({
                        [id]: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
                    })
                }).catch(error => {
                Alert.error('Ошибка при удалении для Bookmark' || (error && error.message));
            });
        } else {
            bookmarkAdd(id)
                .then(response => {
                    this.setState({
                        [id]: bookmarked === 'bookmark' ? 'bookmark outline' : 'bookmark'
                    })
                }).catch(error => {
                Alert.error('Ошибка при добавлении для Bookmark' || (error && error.message));
            });
        }

    };

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

    handleSliderChange = (event, newValue) => {
        this.setState({
            responseScale: newValue
        });
    };

    handleStableSliderChange = (event, newValue) => {
        this.setState({
            responseStableScale: newValue
        });
    };

    render() {

        const {loading, bookmarkLoading, bookmarkedApiData, apiList} = this.state;

        if (loading) {
            return <BookmarkPageLoadingIndicator/>
        }
        const host = window.location.origin.toString();

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
                                                        to={getLink4Description(item.category) + item.uuid}>
                                                        <LazyMiniImage
                                                            src={host + "/api-data/image/" + item.image + "/32/32"}/>
                                                    </NavLink>
                                                ) : (
                                                    <div className="home-api-text-avatar">
                                                        <NavLink
                                                            to={getLink4Description(item.category) + item.uuid}><span>{item.fullName && item.fullName[0]}</span></NavLink>
                                                    </div>
                                                )
                                            }
                                        </div>
                                        <div className="grid-labels">
                                            <Icon link name='star' style={{color: '#F39847'}}/>
                                            <label style={{color: '#F39847'}}>{item.id}</label>
                                            <Icon style={{
                                                paddingLeft: '16px',
                                                color: item.bookmarked ? this.state[item.uuid] !== 'bookmark outline' ? '#2F80ED' : '' : this.state[item.uuid] === 'bookmark' ? '#2F80ED' : ''
                                            }} link onClick={this.handleChange} id={item.uuid}
                                                  className='grid-labels-icon'
                                                  name={item.bookmarked ? this.state[item.uuid] !== 'bookmark outline' ? 'bookmark' : 'bookmark outline' : this.state[item.uuid] === 'bookmark' ? 'bookmark' : 'bookmark outline'}/>
                                        </div>
                                    </div>
                                    <div className="cell-grid-body">
                                        <div className="cell-grid-body-text">
                                            <NavLink to={getLink4Description(item.category) + item.uuid}
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

        const responseScaleOne = this.state.responseScale[0];
        const responseScaleTwo = this.state.responseScale[1];

        return (
            <div className="api-shop-main">
                <div className="api-shop-container-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Section as={NavLink} to={'/'} link><span
                            className='text-disabled-color blue-hover'>Главная</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={'/shop'} link><span
                            className='text-disabled-color blue-hover'>Магазин</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={'/shop/bookmarks'} link><span
                            className='text-disabled-color blue-hover'>Избранное</span></Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div className="api-shop-main-container">
                    <div className="api-shop-left-container">
                        <div className='api-shop-inner-filter-container'>
                            <div className='api-shop-filter-title'>Фильтры</div>

                            <FilterBookmarkLinkElement bookmarkData={bookmarkedApiData} loading={bookmarkLoading}
                                                       active={true}/>

                            <div className='api-shop-filter-rating'>Рейтинг</div>
                            <div className='api-shop-filter-rating-stars'>
                                <Icon link name='star outline' className='star'/>
                                <Icon link name='star outline' className='star'/>
                                <Icon link name='star outline' className='star'/>
                                <Icon link name='star outline' className='star'/>
                                <Icon link name='star outline' className='star'/>
                            </div>
                            <div className='api-shop-filter-response-time'>Скорость отдачи</div>
                            <div className='api-shop-filter-response-time-label'>
                                <span className='left-label'>{responseScaleOne + 'mS'}</span>
                                <span className='right-label'>{responseScaleTwo + 'mS'}</span>
                            </div>
                            <div className='api-shop-filter-response-time-line'>
                                <Slider
                                    className='shop-filter-response-time-line-slider'
                                    value={this.state.responseScale}
                                    onChange={this.handleSliderChange}
                                    valueLabelDisplay="off"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={1000}
                                />
                            </div>
                            <div className='api-shop-filter-response-time'>Стабильность</div>
                            <div className='api-shop-filter-response-time-label'>
                                <span className='left-label'>{this.state.responseStableScale[0] + '%'}</span>
                                <span className='right-label'>{this.state.responseStableScale[1] + '%'}</span>
                            </div>
                            <div className='api-shop-filter-response-time-line'>
                                <Slider
                                    className='api-shop-filter-response-time-line-slider'
                                    value={this.state.responseStableScale}
                                    onChange={this.handleStableSliderChange}
                                    valueLabelDisplay="off"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={100}
                                />

                                <div className='shop-filter-response-time'>Категории</div>
                                <div className='category-labels'>
                                    <div className='category-labels'>
                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='red' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/data' className='blue-hover'>Данные</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[0])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='orange' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/finance' className='blue-hover'>Финансы</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[1])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='yellow' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/mobile' className='blue-hover'>Мобильные</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[2])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='green' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/map' className='blue-hover'>Карты</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[3])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='olive' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/adv' className='blue-hover'>Реклама</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[4])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='blue' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/social' className='blue-hover'>Социальные сети</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[5])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='purple' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/health' className='blue-hover'>Здравохранение</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[6])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='teal' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/sport' className='blue-hover'>Спорт</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[7])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='violet' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/web' className='blue-hover'>Web</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[8])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='blue' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/news' className='blue-hover'>Новости</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[9])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='green' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/media' className='blue-hover'>Медиа</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[10])}</span>
                                            </div>
                                        ) : (<></>)}

                                        {bookmarkedApiData.length > 0 ? (
                                            <div className='category-label'>
                                                <Icon color='grey' name='dot circle' size='small'/>
                                                <NavLink to='/shop/category/other' className='blue-hover'>Другое</NavLink>
                                                <span className='right-label'>{categoryLoadingIndicator(loading, apiList[11])}</span>
                                            </div>
                                        ) : (<></>)}
                                        </div>
                                     </div>
                                </div>
                        </div>
                    </div>
                    {/*<ShopBody loading={loading} apiList={apiList} authenticated={authenticated} requestBookmarkList={this.requestBookmarkList}/>*/}
                    <div className="api-shop-bookmark-container">
                        {loading && !bookmarkedApiData ? (<CategoryShopLoadingIndicator/>) : (
                            bookmarkedApiData.length > 0 ?
                        (
                            <div>
                                <Grid columns='3'>
                                    <Projects items={bookmarkedApiData ? bookmarkedApiData : []}/>
                                 </Grid>
                            </div>
                        ) :
                        (<div unselectable='on' className='api-category-shop-empty'>Данные отсутствуют</div>))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ApiBookmark;