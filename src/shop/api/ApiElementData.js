import React, {Component} from 'react';
import './ApiCategoryShop.css';
import {NavLink} from "react-router-dom";
import {Grid, Icon, Image, Segment} from "semantic-ui-react";
import grid from "../../img/grid-img.png";


class ApiElementData extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {

        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
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

    render() {
        const link = this.props.link + '/' + 'api';
        return (
            <Grid columns='3'>
                <Grid.Column>
                    <Segment className='api-element-container'>
                        <div className="api-element-data">
                            <div className="cell-header">
                                <div className="grid-logo">
                                    <Image src={grid}/>
                                </div>
                                <div className="grid-labels">
                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                    <label style={{color: '#F39847'}}>4,9</label>
                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark outline'/>
                                </div>
                            </div>
                            <div className="cell-grid-body">
                                <div className="cell-grid-body-text">
                                    <NavLink to={link} className='cell-grid-body-text'>API-FOOTBALL</NavLink><br/>
                                </div>
                                <div className="cell-grid-body-label">
                                    <label>???? apisports</label>
                                </div>
                                <div className="cell-grid-body-description">
                                    <label>???????????????????????? ?????????? ????????????, ??????????????, ?????????????? ????????????, ??????????????, ????????????, ????????????
                                        ????????????????????, ??????????????????...</label>
                                </div>
                                <div className="api-element-footer">
                                    <div className='category-label'>
                                        <Icon color={this.props.color} name='dot circle' size='small'/>
                                        <NavLink to={this.props.link} className={this.props.labelColor}>{this.props.name}</NavLink>
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
                                    <Image src={grid}/>
                                </div>
                                <div className="grid-labels">
                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                    <label style={{color: '#F39847'}}>4,5</label>
                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark'/>
                                </div>
                            </div>
                            <div className="cell-grid-body">
                                <div className="cell-grid-body-text">
                                    <NavLink to={link} className='cell-grid-body-text'>Web Search</NavLink><br/>
                                </div>
                                <div className="cell-grid-body-label">
                                    <label>???? contextualwebseacr</label>
                                </div>
                                <div className="cell-grid-body-description">
                                    <label>API ??????-????????????. ?????????????? API, API ??????????????????????</label>
                                </div>
                                <div className="api-element-footer">
                                    <div className='category-label'>
                                        <Icon color={this.props.color} name='dot circle' size='small'/>
                                        <NavLink to={this.props.link} className={this.props.labelColor}>{this.props.name}</NavLink>
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
                                    <Image src={grid}/>
                                </div>
                                <div className="grid-labels">
                                    <Icon link name='star' style={{color: '#F39847'}}/>
                                    <label style={{color: '#F39847'}}>4,9</label>
                                    <Icon style={{paddingLeft: '16px'}} link name='bookmark outline'/>
                                </div>
                            </div>
                            <div className="cell-grid-body">
                                <div className="cell-grid-body-text">
                                    <NavLink to={link} className='cell-grid-body-text'>Get Video and Audio URL</NavLink><br/>
                                </div>
                                <div className="cell-grid-body-label">
                                    <label>???? Top-Rated</label>
                                </div>
                                <div className="cell-grid-body-description">
                                    <label>???????????????? ???????????? ???????????? ?????? ???????????????? ?????????? ?????? ?????????? ???????????? ?????????????????????? ??
                                        ???????????? ??????????????-??????????, ???????????????? Youtube</label>
                                </div>
                                <div className="api-element-footer">
                                    <div className='category-label'>
                                        <Icon color={this.props.color} name='dot circle' size='small'/>
                                        <NavLink to={this.props.link} className={this.props.labelColor}>{this.props.name}</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Segment>
                </Grid.Column>
            </Grid>
        )
    }
}

export default ApiElementData;