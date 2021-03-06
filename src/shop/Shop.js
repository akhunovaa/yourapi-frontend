import React, {Component} from 'react';
import './Shop.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Icon, Image, Segment, Grid} from "semantic-ui-react";
import {loadUser} from "../util/APIUtils";
import Slider from '@material-ui/core/Slider';
import grid from "../img/grid-img.png";


class Shop extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            responseScale: [0, 1000],
            responseStableScale: [0, 100]
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.valuetext = this.valuetext.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        //this.setState({user: this.props.currentUser})
        // this.loadUser(handle);
    }


    loadUser(handle) {
        this.setState({
            loading: true
        });
        let data = {
            "id": handle
        };
        loadUser(data)
            .then(response => {
                this.setState({
                    user: response.response,
                    loading: false
                });
            }).catch(error => {
            this.setState({
                loading: false
            });
        });
    }


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


    handleOnPhoneChange(value) {
        this.setState({
            phone: value
        });
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    valuetext(value) {
        return `${value}mS`;
    }


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

    handleClose = () => {
        this.setState({open: false})
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
        return (
            <div className="shop-main">
                <div className="shop-container-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb.Section as={NavLink} to={'/'} link><span
                            className='text-disabled-color'>??????????????</span></Breadcrumb.Section>
                        <Breadcrumb.Divider icon='right chevron'/>
                        <Breadcrumb.Section as={NavLink} to={'/shop'} link><span
                            className='text-disabled-color'>??????????????</span></Breadcrumb.Section>
                    </Breadcrumb>
                </div>
                <div className="shop-main-container">
                    <div className="shop-left-container">
                        <div className='shop-inner-filter-container'>
                            <div className='shop-filter-title'>??????????????</div>
                            <div className='shop-filter-rating'>??????????????</div>
                            <div className='shop-filter-rating-stars'>
                                    <Icon link name='star outline' className='star'/>
                                    <Icon link name='star outline' className='star'/>
                                    <Icon link name='star outline' className='star'/>
                                    <Icon link name='star outline' className='star'/>
                                    <Icon link name='star outline' className='star'/>
                            </div>
                            <div className='shop-filter-response-time'>???????????????? ????????????</div>
                            <div className='shop-filter-response-time-label'>
                                <span className='left-label'>{this.state.responseScale[0] + 'mS'}</span>
                                <span className='right-label'>{this.state.responseScale[1] + 'mS'}</span>
                            </div>
                            <div className='shop-filter-response-time-line'>
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
                            <div className='shop-filter-response-time'>????????????????????????</div>
                            <div className='shop-filter-response-time-label'>
                                <span className='left-label'>{this.state.responseStableScale[0] + '%'}</span>
                                <span className='right-label'>{this.state.responseStableScale[1] + '%'}</span>
                            </div>
                            <div className='shop-filter-response-time-line'>
                                <Slider
                                    className='shop-filter-response-time-line-slider'
                                    value={this.state.responseStableScale}
                                    onChange={this.handleStableSliderChange}
                                    valueLabelDisplay="off"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={100}
                                />
                            </div>
                            <div className='shop-filter-response-time'>??????????????????</div>
                            <div className='category-labels'>
                                <div className='category-label'>
                                    <Icon color='red' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/data'>????????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='orange' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/finance'>??????????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='yellow' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/mobile'>??????????????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='green' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/map'>??????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='olive' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/adv'>??????????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='blue' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/social'>???????????????????? ????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='purple' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/health'>????????????????????????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='teal' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/sport'>??????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='violet' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/web'>Web</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                                <div className='category-label'>
                                    <Icon color='grey' name='dot circle' size='small'/>
                                    <NavLink to='/shop/category/other'>????????????</NavLink>
                                    <span className='right-label'>45</span>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="shop-form-container">
                        <div className='api-element-container-header'>
                            <span className='main-form-header'>????????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkData} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='red' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/data'>????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkData} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='red' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/data'>????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkData} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='red' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/data'>????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>??????????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkFinance} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label orange-label'>
                                                    <Icon color='orange' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/finance' className='orange-label'>??????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkFinance} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='orange' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/finance' className='orange-label'>??????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkFinance} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='orange' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/finance' className='orange-label'>??????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>??????????????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkMobile} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='yellow' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/mobile' className='yellow-label'>??????????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkMobile} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='yellow' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/mobile' className='yellow-label'>??????????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkMobile} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='yellow' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/mobile' className='yellow-label'>??????????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>??????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkMap} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='green' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/map' className='green-label'>??????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkMap} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='green' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/map' className='green-label'>??????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkMap} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='green' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/map' className='green-label'>??????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>??????????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkAdv} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='olive' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/adv' className='olive-label'>??????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkAdv} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='olive' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/adv' className='olive-label'>??????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkAdv} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='olive' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/adv' className='olive-label'>??????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>???????????????????? ????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkSocial} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='blue' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/social' className='blue-label'>???????????????????? ????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkSocial} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='blue' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/social' className='blue-label'>???????????????????? ????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkSocial} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='blue' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/social' className='blue-label'>???????????????????? ????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>????????????????????????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkHealth} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='purple' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/health' className='purple-label'>????????????????????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkHealth} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='purple' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/health' className='purple-label'>????????????????????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkHealth} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='purple' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/health' className='purple-label'>????????????????????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>??????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkSport} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='teal' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/sport' className='teal-label'>??????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkSport} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='teal' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/sport' className='teal-label'>??????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkSport} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='teal' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/sport' className='teal-label'>??????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>Web</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkWeb} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='violet' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/web' className='violet-label'>Web</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkWeb} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='violet' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/web' className='violet-label'>Web</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkWeb} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='violet' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/web' className='violet-label'>Web</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div className='api-element-container-header second-api-element'>
                            <span className='main-form-header'>????????????</span>
                            <NavLink to='#' className='main-form-header-count right-label'>???????????????????? ?????? (30)</NavLink>
                        </div>
                        <Grid columns='3'>
                            <Grid.Column>
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkOther} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? apisports</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ???????????? ????????????????????, ??????????????????...</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='grey' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/other' className='grey-label'>????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkOther} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? contextualwebseacr</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='grey' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/other' className='grey-label'>????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                            <Grid.Column className="body-data">
                                <Segment className='api-element-container'>
                                    <div className="api-element-data">
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
                                                <NavLink to={linkOther} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                            </div>
                                            <div className="cell-grid-body-label">
                                                <label>???? Top-Rated</label>
                                            </div>
                                            <div className="cell-grid-body-description">
                                                <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ?? ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                            </div>
                                            <div className="api-element-footer">
                                                <div className='category-label'>
                                                    <Icon color='grey' name='dot circle' size='small'/>
                                                    <NavLink to='/shop/category/other' className='grey-label'>????????????</NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                        <div style={{paddingTop: 20}}>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Shop;