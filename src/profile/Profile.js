import React, {Component} from 'react';
import './Profile.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Icon, Image, Segment} from "semantic-ui-react";
import {loadUser} from "../util/APIUtils";

class Profile extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: null
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
    }


    componentDidMount () {
        this._isMounted = true;
        const { handle } = this.props.match.params;
        this.setState({user: this.props.currentUser})
        // this.loadUser(handle);
    }


    loadUser(handle){
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

    reload (){
        window.location.reload();
    };

    render() {
        return (
            <div className="profile-main">
                <div className="profile-main-container">
                    <div className="container-breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Section as={NavLink} to={'/'} link>Главная</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right chevron' />
                            <Breadcrumb.Section as={NavLink} to={'/profile'} link>Личный кабинет</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right arrow' />
                            <Breadcrumb.Section active>Настройки профиля</Breadcrumb.Section>
                        </Breadcrumb>
                    </div>
                    <div className="profile-form-container">

                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;