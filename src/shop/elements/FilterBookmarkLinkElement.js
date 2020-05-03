import React, {Component} from 'react';
import '../Shop.css';
import {NavLink} from "react-router-dom";
import {Icon} from "semantic-ui-react";
import {bookmarkLoadingIndicator} from "../../common/LoadingIndicator";

class FilterBookmarkLinkElement extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    render() {

        const {bookmarkData, loading, active} = this.props;

        return (
            <div className='bookmarked-api-label'>

                    <NavLink to='/shop/bookmarks' className='bookmarked-api-filter-link'>
                        <Icon className='bookmarked-api-filter-link-icon' link name={active ? 'bookmark' : 'bookmark outline'} style={{color: active ? '#2F80ED' : ''}}/>
                        <span className='bookmarked-api-filter-link-text' style={{color: active ? '#2F80ED' : ''}}>Избранное</span>
                    </NavLink>
                    <span className='bookmarked-api-filter-data-size right-label' style={{color: active ? '#2F80ED' : ''}}>{bookmarkLoadingIndicator(loading, bookmarkData)}</span>
            </div>
        )
    }
}

export default FilterBookmarkLinkElement;