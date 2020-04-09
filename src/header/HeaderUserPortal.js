import React, {Component} from 'react';
import './HeaderUserPortal.css';
import {NavLink} from "react-router-dom";
import {Divider, Icon, List, Portal, Segment} from "semantic-ui-react";
import LazyImage from '../util/LazyImage';
import * as PropTypes from "prop-types";
import LoadingIndicator from '../common/LoadingIndicator';

class HeaderUserPortal extends Component {

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

        const {currentUser, onLogout} = this.props;
        const {open, loading} = this.state;

        if (loading) {
            return <LoadingIndicator/>
        }

        const imageUrl = currentUser ? currentUser.imageUrl ? currentUser.imageUrl.includes("yourapi.ru") ? currentUser.imageUrl + '/40/40' : currentUser.imageUrl : '' : '';

        const styles = {
            Segment: {
                position: 'fixed',
                right: 12,
                top: '76px',
                zIndex: 1000
            },
            Divider: {
                marginTop: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0
            },
            Image:{
                display: 'none'
            }
        };

        return (
            <Portal
                closeOnPortalMouseLeave
                closeOnTriggerClick
                closeOnDocumentClick
                trigger={
                    imageUrl ? (
                        <div className="profile-header-avatar">
                            <LazyImage src={imageUrl} size='small' circular verticalAlign='middle' alt={currentUser.name}/>
                        </div>
                    ) : (
                        <div className="header-right-navlink-profile-icon">
                            <Icon link name='user circle'/>
                        </div>
                    )
                }
                open={open}
                onOpen={this.handleOpen}
                onClose={this.handleClose}>
                <div id='profile-portal' onClick={this.handleClose}>
                    <Segment className="profile-segment"
                             style={styles.Segment}>
                        <List size={"big"}>
                            <List.Item>
                                <List.Content>
                                    <NavLink to="/"><span
                                        className="portal-item portal-item-main">Главная страница</span></NavLink>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <NavLink to="/profile"><span
                                        className="portal-item">Настройка профиля</span></NavLink>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <NavLink to="/profile/administration"><span
                                        className="portal-item">Администрирование</span></NavLink>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Divider style={styles.Divider}/>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <NavLink to="/help"><span className="portal-item">Справка</span></NavLink>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <Divider style={styles.Divider}/>
                            </List.Item>
                            <List.Item>
                                <List.Content>
                                    <a onClick={onLogout}>
                                        <span className="portal-item">Выйти</span>
                                    </a>
                                </List.Content>
                            </List.Item>
                        </List>
                    </Segment>
                </div>
            </Portal>
        )
    }
}


HeaderUserPortal.propTypes = {
    currentUser: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

export default HeaderUserPortal;
