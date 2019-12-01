import React, {Component} from 'react';
import './Home.css';
import {Header, Message} from "semantic-ui-react";
class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false
            roleAdmin: true
        };

        this.reload = this.reload.bind(this);
    }

    componentDidMount(){
        this._isMounted = true;
    }


    componentWillUnmount() {
        this._isMounted = false;
    }

    reload (){
        window.location.reload();
    };

    render() {
        return (
            <div className={"main"}>
                <div className="tools-header">
                    <Header disabled style={{height: 'auto'}} floated={'left'} size={'tiny'}>
                       Добро пожаловать на маркетплейс yourapi.ru
                    </Header>
                </div>
                <Message>
                    Данный ресурс представлен в рамках Хакатона.<b/> <i>SberCloud</i>
                </Message>
            </div>
        )
    }
}

export default Home;