import React, {Component} from 'react';
import './ApiDetailBody.css';
import {Icon} from "semantic-ui-react";
import {withRouter} from "react-router";

class ApiDetailReviewBody extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        const {category} = this.props.match.params;
        this.state = {};
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        if (this._isMounted) {
            const {pageTitle} = this.props;
            document.title = pageTitle;
        }
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
        return (
            <div>
                <div className='detail-review-body'>
                    <div unselectable='on' className='detail-review-rating-container'>
                        <div className='left-label detail-review-rating'>
                            <div>
                                <span>4,9</span>
                            </div>
                            <div className='detail-review-rating-stars'>
                                <Icon link name='star' className='api-rating-star'/>
                                <Icon link name='star' className='api-rating-star'/>
                                <Icon link name='star' className='api-rating-star'/>
                                <Icon link name='star' className='api-rating-star'/>
                                <Icon link name='star' className='api-rating-star'/>
                            </div>
                            <div className='detail-review-rating-count'>
                                <span>110 отзывов</span>
                            </div>
                        </div>
                        <div className='right-label detail-review-rating-lines'>
                            <div className='detail-review-rating-line rating-lines-padded'>
                                <div className='rating-gray-line'>
                                    <div className='rating-green-line' style={{width: '80%'}}></div>
                                </div>
                                <span className='detail-review-rating-line-label'>80</span>
                            </div>
                            <div className='detail-review-rating-line rating-lines-padded'>
                                <div className='rating-gray-line'>
                                    <div className='rating-blue-line' style={{width: '20%'}}></div>
                                </div>
                                <span className='detail-review-rating-line-label'>20</span>
                            </div>
                            <div className='detail-review-rating-line rating-lines-padded'>
                                <div className='rating-gray-line'>
                                    <div className='rating-yellow-line' style={{width: '10%'}}></div>
                                </div>
                                <span className='detail-review-rating-line-label'>10</span>
                            </div>
                            <div className='detail-review-rating-line rating-lines-padded'>
                                <div className='rating-gray-line'>
                                    <div className='rating-orange-line' style={{width: '7%'}}></div>
                                </div>
                                <span className='detail-review-rating-line-label'>7</span>
                            </div>
                            <div className='detail-review-rating-line rating-lines-padded'>
                                <div className='rating-gray-line'>
                                    <div className='rating-red-line' style={{width: '3%'}}></div>
                                </div>
                                <span className='detail-review-rating-line-label'>3</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail-review-response-container'>
                    <div className='detail-review-response-element'>
                        <div className='detail-review-response-element-header'>
                            <div className='review-user-icon'>
                                <Icon fitted link name='user outline' size={'large'}/>
                            </div>
                            <div className='reviewer-info'>
                                <div className='review-username'><span>Олег П.</span></div>
                                <div className='review-rate-info'>
                                    <div className='review-rate-star'>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <span className='review-date'>09.10.2019</span>
                                    </div>
                                    <div className='review-like-dislike'>
                                        <Icon link fitted style={{color: '#A5A5A5', fontSize: 16, paddingLeft: 12}} name='thumbs up'/>
                                        <span className='review-like'>15</span>
                                        <Icon link fitted style={{color: '#A5A5A5', fontSize: 16, paddingLeft: 12}} name='thumbs down'/>
                                        <span className='review-dislike'>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='review-text'>
                            <span >Отличный продукт.Профессиональные прогнозы,очень качественные и так хорошо продуманные</span>
                        </div>
                    </div>
                    <div className='detail-review-response-element'>
                        <div className='detail-review-response-element-header'>
                            <div className='review-user-icon'>
                                <Icon fitted link name='user outline' size={'large'}/>
                            </div>
                            <div className='reviewer-info'>
                                <div className='review-username'><span>Олег П.</span></div>
                                <div className='review-rate-info'>
                                    <div className='review-rate-star'>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <span className='review-date'>09.10.2019</span>
                                    </div>
                                    <div className='review-like-dislike'>
                                        <Icon link fitted style={{color: '#A5A5A5', fontSize: 16, paddingLeft: 12}} name='thumbs up'/>
                                        <span className='review-like'>15</span>
                                        <Icon link fitted style={{color: '#A5A5A5', fontSize: 16, paddingLeft: 12}} name='thumbs down'/>
                                        <span className='review-dislike'>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='review-text'>
                            <span >Отличный продукт.Профессиональные прогнозы,очень качественные и так хорошо продуманные</span>
                        </div>
                    </div>
                    <div className='detail-review-response-element'>
                        <div className='detail-review-response-element-header'>
                            <div className='review-user-icon'>
                                <Icon fitted link name='user outline' size={'large'}/>
                            </div>
                            <div className='reviewer-info'>
                                <div className='review-username'><span>Олег П.</span></div>
                                <div className='review-rate-info'>
                                    <div className='review-rate-star'>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <span className='review-date'>09.10.2019</span>
                                    </div>
                                    <div className='review-like-dislike'>
                                        <Icon link fitted style={{color: '#A5A5A5', fontSize: 16, paddingLeft: 12}} name='thumbs up'/>
                                        <span className='review-like'>15</span>
                                        <Icon link fitted style={{color: '#A5A5A5', fontSize: 16, paddingLeft: 12}} name='thumbs down'/>
                                        <span className='review-dislike'>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='review-text'>
                            <span >Отличный продукт.Профессиональные прогнозы,очень качественные и так хорошо продуманные</span>
                        </div>
                    </div>
                    <div className='detail-review-response-element'>
                        <div className='detail-review-response-element-header'>
                            <div className='review-user-icon'>
                                <Icon fitted link name='user outline' size={'large'}/>
                            </div>
                            <div className='reviewer-info'>
                                <div className='review-username'><span>Олег П.</span></div>
                                <div className='review-rate-info'>
                                    <div className='review-rate-star'>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <Icon fitted style={{color: '#4F4F4F'}} name='star'/>
                                        <span className='review-date'>09.10.2019</span>
                                    </div>
                                    <div className='review-like-dislike'>
                                        <Icon link fitted style={{color: '#A5A5A5', fontSize: 16, paddingLeft: 12}} name='thumbs up'/>
                                        <span className='review-like'>15</span>
                                        <Icon link fitted style={{color: '#A5A5A5', fontSize: 16, paddingLeft: 12}} name='thumbs down'/>
                                        <span className='review-dislike'>0</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='review-text'>
                            <span >Отличный продукт.Профессиональные прогнозы,очень качественные и так хорошо продуманные</span>
                        </div>
                    </div>

                </div>
            </div>

        )
    }
}

export default withRouter(ApiDetailReviewBody);
