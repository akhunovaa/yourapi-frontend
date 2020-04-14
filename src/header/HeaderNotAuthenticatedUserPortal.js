import React, {Component} from 'react';
import './HeaderUserPortal.css';
import {Icon} from "semantic-ui-react";
import LoadingIndicator from '../common/LoadingIndicator';

class HeaderNotAuthenticatedUserPortal extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            open: false
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };


    render() {

        const {loading} = this.state;
        const {handleSliderChange} = this.props;

        if (loading) {
            return <LoadingIndicator/>
        }

        return (
            <div className="header-right-navlink-profile-icon not-authorized-icon-sign">
                <Icon link name='sign-in' onClick={handleSliderChange}/>
            </div>
        )
    }
}

export default HeaderNotAuthenticatedUserPortal;
