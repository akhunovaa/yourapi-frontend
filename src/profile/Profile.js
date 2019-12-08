import React, {Component} from 'react';
import './Profile.css';
import {Link, NavLink} from "react-router-dom";
import {Breadcrumb, Dropdown, Icon, Image, Input, TextArea, Form, Divider, Segment, Portal, List, Button, Checkbox, Table} from "semantic-ui-react";
import {loadUser} from "../util/APIUtils";

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
            open: false,
            surname: 'Akhunov',
            name: 'Azat',
            patrName: 'Akhmatovich',
            nickname: 'leon4uk',
            dbirth: '12.07.1986',
            sex: "Мужской",
            language: "Русский",
            city: "Москва, Россия",
            phoneNumber: "",
            email: "",
            info: "И даже с языками, использующими латинский алфавит, могут возникнуть небольшие проблемы: в различных языках те или иные буквы встречаются с разной частотой, имеется разница в длине наиболее распространенных слов. Отсюда напрашивается вывод, что все же лучше использовать в качестве «рыбы» текст на том языке, который планируется использовать при запуске проекта. Сегодня существует несколько вариантов Lorem ipsum, кроме того, есть специальные генераторы, создающие собственные варианты текста на основе оригинального трактата, благодаря чему появляется возможность получить более длинный неповторяющийся набор слов."
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        const {handle} = this.props.match.params;
        //this.setState({user: this.props.currentUser})
        // this.loadUser(handle);
    }


    loadUser(handle) {
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


    handleOnPhoneChange(value) {
        console.log(value)
        this.setState({
            phone: value
        });
    }

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    render() {
        const { open } = this.state;
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
            <div className="profile-main">
                <div className="profile-main-container">
                    <div className="container-breadcrumb">
                        <Breadcrumb>
                            <Breadcrumb.Section as={NavLink} to={'/'} link>Главная</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right chevron'/>
                            <Breadcrumb.Section as={NavLink} to={'/profile'} link>Личный кабинет</Breadcrumb.Section>
                            <Breadcrumb.Divider icon='right arrow'/>
                            <Breadcrumb.Section active>Настройка профиля</Breadcrumb.Section>
                        </Breadcrumb>
                    </div>
                    <div className="profile-form-container">
                        <div className="profile-avatar-container">
                            <div className="profile-avatar">
                                {
                                    this.state.user.imageUrl ? (
                                        <Image src={this.state.user.imageUrl} size='medium' circular verticalAlign='top'
                                               alt={this.state.user.name}/>
                                    ) : (
                                        <div className="text-avatar">
                                            <span>{this.state.user.name && this.state.user.name[0]}</span>
                                        </div>
                                    )
                                }
                                <div className="profile-avatar-footer">
                                    <Icon link name='photo' size={'large'} color={'grey'}/>
                                </div>
                            </div>
                            <div className="user-name-container">
                                <span style={{paddingRight: '8px'}}>{this.state.user.surname}</span>
                                <span style={{paddingRight: '8px'}}>{this.state.user.name}</span>
                                <span style={{paddingRight: '8px'}}>{this.state.user.patrName}</span>
                            </div>
                            <div className="user-custom-icon-container">
                                <Icon link name='cog' size={'large'} color={'grey'}/>
                            </div>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Профиль</span>
                            </div>
                            <div className="profile-info-container-name-inputs">
                                <div className="profile-info-container-name-input">
                                    <label>Фамилия</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.surname}
                                           className="form-input" id="surname"
                                           name="surname" required placeholder='Фамилия'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Имя</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.name}
                                           className="form-input" id="name"
                                           name="name" required placeholder='Имя'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Отчество</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.patrName}
                                           className="form-input" id="patrName"
                                           name="patrName" required placeholder='Отчество'/>
                                </div>
                            </div>
                            <div className="profile-info-container-nickname-input">
                                <div className="profile-info-container-name-input">
                                    <label>Имя профиля</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.nickname}
                                           className="form-input" id="nickname"
                                           name="nickname" required placeholder='Имя профиля'/>
                                </div>
                            </div>
                            <div className="profile-info-container-date-birth-input">
                                <div className="profile-info-container-name-input">
                                    <label>Дата рождения</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.dbirth}
                                           className="form-input" id="dbirth"
                                           name="dbirth" required placeholder='Дата рождения'/>
                                </div>
                            </div>
                            <div className="profile-info-container-sex-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Пол</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Пол' fluid selection
                                              id="sex" name="sex" className="form-input" options={sexOptions}
                                              defaultValue={this.state.sex}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Язык</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Язык' fluid selection
                                              id="language" name="language" className="form-input"
                                              options={languageOptions} defaultValue={this.state.language}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Город</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Город' fluid search
                                              selection id="city" name="city" noResultsMessage="Москва - лучший город"
                                              className="form-input" options={cityOptions}
                                              defaultValue={this.state.city}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-textarea">
                                    <label style={{paddingBottom: '6px'}}>О себе</label>
                                    <Form style={{paddingTop: '6px'}}>
                                        <TextArea onChange={this.handleDropdownChange} placeholder='Расскажите о себе' style={{minHeight: 265, maxHeight: 265, minWidth: 382 }}  id="info" name="info" defaultValue={this.state.info}/>
                                    </Form>
                                </div>
                            </div>
                            <Divider style={{marginTop: '40px',  marginBottom: 0}}/>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Контакты</span>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{marginBottom: 6}}>Телефон</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.phoneNumber}
                                           id="phoneNumber"
                                           name="phoneNumber" placeholder='+7( ___ ) ___ - __ - __ ' required/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{marginBottom: 6}}>Email</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.email}
                                           id="email"
                                           name="email" placeholder='user@botmasterzzz.com' required/>
                                </div>
                            </div>
                            <div className="profile-info-container-messengers">
                                <h5>Мессенджеры</h5>
                            </div>

                            <div className="profile-info-container-input">
                                <Portal
                                    closeOnPortalMouseLeave
                                    closeOnTriggerClick
                                    closeOnDocumentClick
                                    trigger={
                                        <Button className="profile-info-container-messengers-button" basic>+ Добавить</Button>
                                    }
                                    open={open}
                                    onOpen={this.handleOpen}
                                    onClose={this.handleClose}>
                                    <div id='profile-messenger-portal'>
                                        <Segment className="profile-messenger-portal"
                                                 style={{position: 'fixed', top: '234px', left: 407}}>
                                            <List size={"big"}>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox defaultChecked/><Icon style={{paddingLeft: 12}} name='telegram plane'><span className="messenger-list">Telegram</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox/><Icon style={{paddingLeft: 12}} name='whatsapp'><span className="messenger-list">WhatsApp</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox/><Icon style={{paddingLeft: 12}} name='viber'><span className="messenger-list">Viber</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox/><Icon style={{paddingLeft: 12}} name='skype'><span className="messenger-list">Skype</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox/><Icon style={{paddingLeft: 12}} name='facebook messenger'><span className="messenger-list">Facebook-messenger</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                            </List>
                                        </Segment>
                                    </div>
                                </Portal>
                            </div>

                            <div className="profile-info-container-name-inputs messengers">
                                <div className="profile-info-container-name-input">
                                    <Input disabled style={{paddingTop: 0, height: 32}}
                                           className="form-input" id="messenger-login"
                                           name="messenger-login" required placeholder='Telegram' iconPosition='left' icon='telegram plane'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <Input onChange={this.handleInputChange}  style={{paddingTop: 0, height: 32}}
                                           className="form-input" id="messenger-login"
                                           name="messenger-login" required placeholder='Телефон или имя'/>
                                </div>
                            </div>

                            <div className="profile-info-container-messengers">
                                <h5>Предпочтительный вид связи</h5>
                            </div>

                            <div className="prefer-callback">
                                <div style={{paddingBottom: 16}}>
                                    <Checkbox/><span className="messenger-list">Электронное письмо</span>
                                </div>
                               <div style={{paddingBottom: 16}}>
                                   <Checkbox defaultChecked/><span className="messenger-list">Звонок</span>
                               </div>
                                <div style={{paddingBottom: 16}}>
                                    <Checkbox defaultChecked/><span className="messenger-list">Сообщение в мессенджер</span>
                                </div>
                            </div>
                            <Divider style={{marginTop: '40px',  marginBottom: 0}}/>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Безопасность</span>
                            </div>
                            <div className="profile-info-container-name-inputs password">
                                <div className="profile-info-container-name-input password-input">
                                    <label style={{marginBottom: 6}}>Старый пароль</label>
                                    <Input style={{paddingTop: 0, height: 32, width: 250}} onChange={this.handleInputChange}
                                           icon={{ name: 'eye slash outline', link: true }}
                                           iconPosition='right' defaultValue="123456"
                                           placeholder='Старый пароль' id="oldPassword" name="oldPassword" required type='password'/>
                                </div>
                                <div className="profile-info-container-name-input password-input">
                                    <label style={{marginBottom: 6}}>Новый пароль</label>
                                    <Input   style={{paddingTop: 0, height: 32, width: 250}} onChange={this.handleInputChange}
                                             icon={{ name: 'eye slash outline', link: true }}
                                             iconPosition='right' defaultValue="123456"
                                             placeholder='Старый пароль' id="newPassword" name="newPassword" required type='password'/>
                                </div>
                                <div className="profile-info-container-name-input password-input">
                                    <label style={{marginBottom: 6}}>Повторите новый пароль</label>
                                    <Input   style={{paddingTop: 0, height: 32, width: 250}} onChange={this.handleInputChange}
                                             icon={{ name: 'eye slash outline', link: true }}
                                             iconPosition='right' defaultValue="123456"
                                             placeholder='Повторите новый пароль' id="newRePassword" name="newRePassword" required type='password'/>
                                </div>
                                <div className="profile-info-container-name-input password-input">
                                    <Button compact color='blue' style={{width: 165, height:32}}>Изменить пароль</Button>
                                </div>
                            </div>
                            <Divider style={{marginTop: '40px',  marginBottom: 0}}/>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Участник команд</span>
                            </div>
                            <div className="profile-info-container-command-table">
                                <Table basic='very' verticalAlign={'middle'} textAlign={'left'}>
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell><span style={{color: '#A5A5A5'}}>Команда</span></Table.HeaderCell>
                                            <Table.HeaderCell><span style={{color: '#A5A5A5'}}>Роль</span></Table.HeaderCell>
                                            <Table.HeaderCell><span style={{color: '#A5A5A5'}}>Статус</span></Table.HeaderCell>
                                            <Table.HeaderCell><span style={{color: '#A5A5A5'}}>Действие</span></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row class="noBorder">
                                            <Table.Cell>Волга</Table.Cell>
                                            <Table.Cell>Роль 1</Table.Cell>
                                            <Table.Cell><Icon color='green' name='dot circle' size='small'/>В команде</Table.Cell>
                                            <Table.Cell><NavLink to="#"><b style={{color: '#EB5757'}}>Выйти из команды </b></NavLink></Table.Cell>
                                        </Table.Row>
                                        <Table.Row class="noBorder">
                                            <Table.Cell>Урал</Table.Cell>
                                            <Table.Cell>Роль 3</Table.Cell>
                                            <Table.Cell><Icon color='orange' name='dot circle' size='small'/>Запрос на участие</Table.Cell>
                                            <Table.Cell>
                                            <div className='command-approve'>
                                                <Button icon fluid labelPosition='left' color='blue'> <Icon name='checkmark' />Принять</Button>
                                                <Button fluid icon labelPosition='left' color='red'><Icon name='close' />Отклонить</Button>
                                            </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                            <div className="profile-info-container-name-input command-search-link">
                                <NavLink to="#"><b style={{color: '#2F80ED'}}>+ Вступить в команду</b></NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;