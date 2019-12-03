import React, {Component} from 'react';
import './Home.css';
import {Header, Message, Input} from "semantic-ui-react";
import {NavLink} from "react-router-dom";
class Home extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            //roleAdmin: this.props.currentUser.role ? this.props.currentUser.role.role_name  === "ROLE_ADMIN" : false
            roleAdmin: true
        };

        if(this.props.currentUser){
            this.state = {
                name: this.props.currentUser.name,
                imageUrl: this.props.currentUser.imageUrl,
                email: this.props.currentUser.email,
                surname: this.props.currentUser.surname,
                patrName: this.props.currentUser.patrName,
                phone: this.props.currentUser.phone,
                note: this.props.currentUser.note,
            };
        }

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
                <NavLink
                    style={{float: 'left', paddingTop: '0px', paddingBottom: '12px', color: '#0f22ed'}}
                    to="/" onClick={this.props.onLogout}>Выйти</NavLink>
                <div className="tools-header">
                    <Header disabled style={{height: 'auto'}} floated={'left'} size={'tiny'}>
                       Добро пожаловать на маркетплейс yourapi.ru
                    </Header>
                </div>
                <Message>
                    Данный ресурс представлен в рамках Хакатона.<b/> <i>SberCloud</i>
                </Message>
                <div className="profile-description">

                <form>
                    <div className="profile-input">
                        <label className='input-form-label' form='name'>Имя:</label>
                        <Input  transparent className='profile-form-input' type='text' id='name' name="name" placeholder="Имя"
                                value={this.state.name} onChange={this.handleInputChange}/>
                    </div>
                    <div className="profile-input">
                        <label className='input-form-label' form='surname'>Фамилия:</label>
                        <Input transparent className='profile-form-input' type='text' id='surname' name="surname" placeholder="Фамилия"
                               value={this.state.surname} onChange={this.handleInputChange}/>
                    </div>
                    <div className="profile-input">
                        <label className='input-form-label' form='patrname'>Отчество:</label>
                        <Input  transparent className='profile-form-input' type='text' id='patrname' name="patrName" placeholder="Отчество"
                                value={this.state.patrName} onChange={this.handleInputChange}/>
                    </div>
                    <div className="profile-input">
                        <label className='input-form-label' form='email'>E-mail:</label>
                        <Input transparent className='profile-form-input' type='text' id='email' name="email" placeholder="E-mail"
                               value={this.state.email} onChange={this.handleInputChange}/>
                    </div>

                    <div className="profile-input">
                        <label className='input-form-label' form='note'>Примечание:</label>
                        <Input  transparent className='profile-form-input' type='text' id='note' name="note" placeholder="Примечание"
                                value={this.state.note} onChange={this.handleInputChange}/>
                    </div>
                </form>

            </div>
            </div>
        )
    }
}

export default Home;