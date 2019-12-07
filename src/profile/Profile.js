import React, {Component} from 'react';
import './Profile.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Icon, Image, Input, Dropdown} from "semantic-ui-react";
import {loadUser} from "../util/APIUtils";
import profile from '../img/profile.png';

class Profile extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {
                imageUrl: 'https://yourapi.ru/individual/image/4',
                name: 'Azat',
                surname: 'Akhunov',
                patrName: 'Akhmatovich'
            },
            surname:'Akhunov',
            name:'Azat',
            patrName:'Akhmatovich',
            nickname:'leon4uk',
            dbirth:'12.07.1986',
            sex: "Мужской",
            language: "Русский"
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount () {
        this._isMounted = true;
        const { handle } = this.props.match.params;
        //this.setState({user: this.props.currentUser})
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

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handleDropdownChange = (e, { key, value }) => this.setState({ [key]: value });

    render() {
        const sexOptions = [
            {
                sex: 'Мужской',
                text: 'Мужской',
                value: 'Мужской'
            },
            {
                sex: 'Женский',
                text: 'Женский',
                value: 'Женский'
            }
        ];
        const languageOptions = [
            {
                language: 'Русский',
                text: 'Русский',
                value: 'Русский'
            },
            {
                language: 'English',
                text: 'English',
                value: 'English'
            }
        ];
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
                        <div className="profile-avatar-container">
                            <div className="profile-avatar">
                                {
                                    this.state.user.imageUrl ? (
                                        <Image src={this.state.user.imageUrl} size='medium' circular verticalAlign='top' alt={this.state.user.name}/>
                                    ) : (
                                        <div className="text-avatar">
                                            <span>{this.state.user.name && this.state.user.name[0]}</span>
                                        </div>
                                    )
                                }
                                <div className="profile-avatar-footer">
                                    <Icon link name='photo' size={'large'} color={'grey'} />
                                </div>
                            </div>
                            <div className="user-name-container">
                                <span style={{paddingRight: '8px'}}>{this.state.user.surname}</span>
                                <span style={{paddingRight: '8px'}}>{this.state.user.name}</span>
                                <span style={{paddingRight: '8px'}}>{this.state.user.patrName}</span>
                            </div>
                            <div className="user-custom-icon-container">
                                <Icon link name='cog' size={'large'} color={'grey'} />
                            </div>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Профиль</span>
                            </div>
                            <div className="profile-info-container-name-inputs">
                                <div className="profile-info-container-name-input">
                                    <label>Фамилия</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.surname} className="form-input" id="surname"
                                           name="surname" required placeholder='Фамилия'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Имя</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.name} className="form-input" id="name"
                                           name="name" required placeholder='Имя'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Отчество</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.patrName} className="form-input" id="patrName"
                                           name="patrName" required placeholder='Отчество'/>
                                </div>
                            </div>
                            <div className="profile-info-container-nickname-input">
                                <div className="profile-info-container-name-input">
                                    <label>Имя профиля</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.nickname} className="form-input" id="nickname"
                                           name="nickname" required placeholder='Имя профиля'/>
                                </div>
                            </div>
                            <div className="profile-info-container-date-birth-input">
                                <div className="profile-info-container-name-input">
                                    <label>Дата рождения</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.dbirth} className="form-input" id="dbirth"
                                           name="dbirth" required placeholder='Дата рождения'/>
                                </div>
                            </div>
                            <div className="profile-info-container-sex-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Пол</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Пол' fluid selection id="sex" name="sex" className="form-input"  options={sexOptions} defaultValue={this.state.sex}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Язык</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Язык' fluid selection id="language" name="language" className="form-input" options={languageOptions} defaultValue={this.state.language}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;