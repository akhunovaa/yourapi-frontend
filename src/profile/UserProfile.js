import React, {Component} from 'react';
import './UserProfile.css';
import {NavLink} from "react-router-dom";
import {Breadcrumb, Divider, Dropdown, Form, Icon, Input, Table, TextArea} from "semantic-ui-react";
import LazyImage from '../util/LazyImage';

class UserProfile extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {
                name: this.props.currentUser ? this.props.currentUser.name ? this.props.currentUser.name : this.props.currentUser.login : 'unknown',
                surname: this.props.currentUser ? this.props.currentUser.surname ? this.props.currentUser.surname : this.props.currentUser.login : 'unknown',
                patrName: this.props.currentUser ? this.props.currentUser.patrName ? this.props.currentUser.patrName : this.props.currentUser.login : 'unknown',
                email: this.props.currentUser ? this.props.currentUser.email ? this.props.currentUser.email : this.props.currentUser.login : 'unknown',
                nickName: this.props.currentUser ? this.props.currentUser.nickName : 'unknown',
                phone: this.props.currentUser ? this.props.currentUser.phone ? this.props.currentUser.phone : this.props.currentUser.phone : 'unknown',
                birthDate: this.props.currentUser ? this.props.currentUser.birthDate ? this.props.currentUser.birthDate : this.props.currentUser.birthDate : 'unknown',
                gender: this.props.currentUser ? this.props.currentUser.gender ? this.props.currentUser.gender : this.props.currentUser.gender : 'Мужской',
                language: this.props.currentUser ? this.props.currentUser.language ? this.props.currentUser.language : this.props.currentUser.language : 'Русский',
                city: this.props.currentUser ? this.props.currentUser.city ? this.props.currentUser.city : this.props.currentUser.city : 'Москва, Россия',
                info: this.props.currentUser ? this.props.currentUser.info ? this.props.currentUser.info : this.props.currentUser.info : 'unknown'
            },
            loading: true
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({loading: false});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload = () => {
        this.setState({loading: true});
        window.location.reload();
        this.setState({loading: false});
    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const {id} = this.props.match.params;
        const {user, imageUrl, loading} = this.state;
        const {currentUser, onLogout} = this.props;
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
        const cityOptions = [
            {
                city: 'Москва, Россия',
                text: 'Москва, Россия',
                value: 'Москва, Россия'
            },
            {
                city: 'Казань, Россия',
                text: 'Казань, Россия',
                value: 'Казань, Россия'
            },
            {
                city: 'Набережные Челны, Россия',
                text: 'Набережные Челны, Россия',
                value: 'Набережные Челны, Россия'
            },
            {
                city: 'Мытищи, Россия',
                text: 'Мытищи, Россия',
                value: 'Мытищи, Россия'
            },
            {
                city: 'Анапа, Россия',
                text: 'Анапа, Россия',
                value: 'Анапа, Россия'
            },
            {
                city: 'Лабытнанги, Россия',
                text: 'Лабытнанги, Россия',
                value: 'Лабытнанги, Россия'
            },
            {
                city: 'Braunschweig, Germany',
                text: 'Braunschweig, Germany',
                value: 'Braunschweig, Germany'
            },
            {
                city: 'Reykjavík, Iceland',
                text: 'Reykjavík, Iceland',
                value: 'Reykjavík, Iceland'
            }
        ];

        return (
            <div className="user-profile-main">
                <div className="user-profile-main-container">
                    <div className="container-breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Section as={NavLink} to={'/'} link>Главная</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right chevron'/>
                            <Breadcrumb.Section as={NavLink} to={'/profile' + '/' + id} link>Профиль пользователя</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right arrow'/>
                            <Breadcrumb.Section active>Просмотр профиля</Breadcrumb.Section>
                        </Breadcrumb>
                    </div>
                    <div className="user-profile-form-container">
                        <div className="profile-avatar-container">
                            <div className="profile-avatar">
                                {
                                    imageUrl ? (
                                        <LazyImage src={imageUrl} size='medium' circular verticalAlign='top'
                                                   alt={user.name}/>
                                    ) : (
                                        <div className="text-avatar">
                                            <span>{user.name && user.name[0]}</span>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="user-name-container">
                                <span style={{paddingRight: '8px'}}>{user.surname}</span>
                                <span style={{paddingRight: '8px'}}>{user.name}</span>
                                <span style={{paddingRight: '8px'}}>{user.patrName}</span>
                            </div>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Профиль</span>
                            </div>
                            <div className="profile-info-container-name-inputs">
                                <div className="profile-info-container-name-input">
                                    <label>Фамилия</label>
                                    <Input value={user.surname}
                                           className="form-input" id="surname" disabled
                                           name="surname" placeholder='Фамилия'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Имя</label>
                                    <Input value={user.name} className="form-input" id="name"
                                           name="name" disabled placeholder='Имя'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Отчество</label>
                                    <Input value={user.patrName}
                                           className="form-input" id="patrName"
                                           name="patrName" disabled placeholder='Отчество'/>
                                </div>
                            </div>
                            <div className="profile-info-container-nickname-input">
                                <div className="profile-info-container-name-input">
                                    <label>Имя профиля</label>
                                    <Input value={user.nickName} className="form-input" id="nickName" name="nickName"
                                           disabled placeholder='Имя профиля'/>
                                </div>
                            </div>
                            <div className="profile-info-container-date-birth-input">
                                <div className="profile-info-container-name-input">
                                    <label>Дата рождения</label>
                                    <Input value={user.birthDate} className="form-input" id="birthDate"
                                           name="birthDate" disabled placeholder='Дата рождения'/>
                                </div>
                            </div>
                            <div className="profile-info-container-sex-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Пол</label>
                                    <Dropdown placeholder='Пол' fluid selection id="gender" name="gender" className="form-input" options={sexOptions}
                                              value={user.gender} disabled/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Язык</label>
                                    <Dropdown placeholder='Язык' fluid selection id="language" name="language" className="form-input"
                                              options={languageOptions} value={user.language} disabled/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Город</label>
                                    <Dropdown placeholder='Город' fluid search
                                              selection id="city" name="city" noResultsMessage="Москва - лучший город"
                                              className="form-input" options={cityOptions}
                                              value={user.city} disabled/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-textarea">
                                    <label style={{paddingBottom: '6px'}}>О себе</label>
                                    <Form style={{paddingTop: '6px'}}>
                                        <TextArea placeholder='Расскажите о себе' style={{minHeight: 265, maxHeight: 265, minWidth: 382}} id="info"
                                                  name="info" value={user.info} disabled/>
                                    </Form>
                                </div>
                            </div>
                            <Divider style={{marginTop: '40px', marginBottom: 0}}/>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Участник команд</span>
                            </div>
                            <div className="profile-info-container-command-table">
                                <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell><span
                                                style={{color: '#A5A5A5'}}>Команда</span></Table.HeaderCell>
                                            <Table.HeaderCell><span
                                                style={{color: '#A5A5A5'}}>Роль</span></Table.HeaderCell>
                                            <Table.HeaderCell><span
                                                style={{color: '#A5A5A5'}}>Статус</span></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Волга</Table.Cell>
                                            <Table.Cell>Роль 1</Table.Cell>
                                            <Table.Cell><Icon color='green' name='dot circle' size='small'/>В команде</Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Урал</Table.Cell>
                                            <Table.Cell>Роль 3</Table.Cell>
                                            <Table.Cell><Icon color='orange' name='dot circle' size='small'/>Запрос на участие</Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                            <div className="profile-info-container-name-input command-search-link">
                                <NavLink to="#"><span style={{color: '#2F80ED'}}>+ Пригласить в команду</span></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;