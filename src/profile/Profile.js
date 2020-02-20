import React, {Component} from 'react';
import './Profile.css';
import {NavLink} from "react-router-dom";
import {
    Breadcrumb,
    Button,
    Checkbox,
    Divider,
    Dropdown,
    Form,
    Icon,
    Image,
    Input,
    List,
    Portal,
    Segment,
    Table,
    TextArea
} from "semantic-ui-react";
import {loadUser, profileImageUpdate, profileInfoUpdate, profilePasswordUpdate} from "../util/APIUtils";
import Alert from "react-s-alert";
import ImageUploader from 'react-images-upload';

class Profile extends Component {

    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            user: {
                imageUrl: this.props.currentUser ? this.props.currentUser.imageUrl ? this.props.currentUser.imageUrl : '' : '',
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
                info: this.props.currentUser ? this.props.currentUser.info ? this.props.currentUser.info : this.props.currentUser.info : 'unknown',
            },
            open: false
        };
        this.loadUser = this.loadUser.bind(this);
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleMainInformationSubmit = this.handleMainInformationSubmit.bind(this);
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
            user: {
                [inputName]: inputValue
            }
        });
    }

    handleDropdownChange = (e, {key, value}) => this.setState({[key]: value});


    handleOnPhoneChange(value) {
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

    handlePasswordSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const passData = data.get('oldPassword');
        const passDataNew = data.get('newPassword');
        const passDataNewTwo = data.get('newRePassword');
        if (passDataNew !== passDataNewTwo) {
            Alert.warning('Пароли должны совпадать.');
            return
        }
        const passDataRequest = Object.assign({}, {
            'password': passDataNew,
            'passwordVerifier': passDataNewTwo,
            'passwordMain': passData
        });
        profilePasswordUpdate(passDataRequest)
            .then(response => {
                if (response.error) {
                    Alert.warning(response.error + '. Необходимо заново авторизоваться.');
                } else if (response.success === false) {
                    Alert.warning(response.message);
                } else {
                    Alert.success('Данные успешно сохранены');
                }
            }).catch(error => {
            Alert.error('Что-то пошло не так! Попробуйте заново.' || (error && error.message));
        });
    }

    handleMainInformationSubmit(event) {
        event.preventDefault();

        const mainInfoRequest = Object.assign({}, {
            'name': this.state.name,
            'surname': this.state.surname,
            'patrName': this.state.patrName,
            'nickName': this.state.nickName,
            'phone': this.state.phone,
            'birthDate': this.state.birthDate,
            'gender': this.state.gender,
            'language': this.state.language,
            'city': this.state.city,
            'info': this.state.info
        });

        profileInfoUpdate(mainInfoRequest)
            .then(response => {
                if (response.error) {
                    Alert.warning(response.error + '. Необходимо заново авторизоваться.');
                } else if (response.success === false) {
                    Alert.warning(response.message);
                } else {
                    Alert.success('Данные успешно сохранены');
                }
            }).catch(error => {
            Alert.error('Что-то пошло не так! Попробуйте заново.' || (error && error.message));
        });
    }

    handleImageUpload() {
        let element = document.getElementsByClassName('errorMessage');
        if (element) {
            for (let item of element) {
                if (item) {
                    item.style.animation = 'cssAnimation 6s forwards';
                    item.style.webkitAnimation = 'cssAnimation 6s forwards';
                    setTimeout(function () {
                        item.style.display = 'none';
                    }, 6000);
                }
            }
        }


        let photo = document.getElementsByName('photo');
        if (photo) {
            for (let item of photo) {
                if (item) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        this.setState({
                            user: {
                                imageUrl: reader.result
                            }
                        })
                    };
                    reader.readAsDataURL(item.files[0]);
                    this.setState({
                        user: {
                            imageUrl: reader.result
                        }
                    });

                    const imageData = item.files[0];
                    const formData = new FormData();
                    formData.append('file', imageData);

                    profileImageUpdate(formData)
                        .then(response => {
                            if (response.error) {
                                Alert.warning(response.error + '. Необходимо заново авторизоваться');
                            } else if (response.success === false) {
                                Alert.warning(response.message);
                            } else {
                                Alert.success('Данные успешно сохранены');
                            }
                        }).catch(error => {
                        Alert.error('Что-то пошло не так! Попробуйте заново.' || (error && error.message));
                    });

                } else {
                    this.setState({
                        user: {
                            imageUrl: ''
                        }
                    })
                }
            }
        }
    }

    render() {
        const {open} = this.state;
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
                                    <Icon link name='photo' size={'large'} color={'grey'}>
                                        <ImageUploader
                                            buttonText='Загрузить фото'
                                            onChange={this.handleImageUpload}
                                            imgExtension={['.jpg', '.jpeg']}
                                            maxFileSize={5242880}
                                            withIcon={false}
                                            withLabel={false}
                                            label={'Максимальный объем 5 мб. Допустимые форматы - jpg, jpeg'}
                                            singleImage={true}
                                            withPreview={false}
                                            name={'photo'}
                                            fileSizeError={'размер файла первышает допустимые нормы'}
                                            fileTypeError={'тип файла не соответствует допустимым нормам'}
                                            buttonStyles={{
                                                fontWeight: 700,
                                                borderRadius: '.28571429rem',
                                                width: '100%',
                                                backgroundColor: 'none',
                                                padding: '.78571429em 1.5em .78571429em',
                                                marginTop: '0px'
                                            }}
                                            fileContainerStyle={{
                                                boxShadow: 'none',
                                                display: 'flex',
                                                flexDirection: 'column-reverse',
                                                paddingTop: '0px',
                                                marginTop: '0px'
                                            }}
                                            errorStyle={{}}
                                            labelStyle={{
                                                color: 'none',
                                                fontSize: '12px',
                                                textAlign: 'center',
                                                marginTop: '6px'
                                            }}
                                        />
                                    </Icon>
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
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.user.surname}
                                           className="form-input" id="surname"
                                           name="surname" required placeholder='Фамилия'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Имя</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.user.name}
                                           className="form-input" id="name"
                                           name="name" required placeholder='Имя'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Отчество</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.user.patrName}
                                           className="form-input" id="patrName"
                                           name="patrName" required placeholder='Отчество'/>
                                </div>
                            </div>
                            <div className="profile-info-container-nickname-input">
                                <div className="profile-info-container-name-input">
                                    <label>Имя профиля</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.user.nickName}
                                           className="form-input" id="nickName"
                                           name="nickName" required placeholder='Имя профиля'/>
                                </div>
                            </div>
                            <div className="profile-info-container-date-birth-input">
                                <div className="profile-info-container-name-input">
                                    <label>Дата рождения</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.user.birthDate}
                                           className="form-input" id="birthDate"
                                           name="birthDate" required placeholder='Дата рождения'/>
                                </div>
                            </div>
                            <div className="profile-info-container-sex-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Пол</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Пол' fluid selection
                                              id="gender" name="gender" className="form-input" options={sexOptions}
                                              defaultValue={this.state.user.gender}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Язык</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Язык' fluid selection
                                              id="language" name="language" className="form-input"
                                              options={languageOptions} defaultValue={this.state.user.language}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Город</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Город' fluid search
                                              selection id="city" name="city" noResultsMessage="Москва - лучший город"
                                              className="form-input" options={cityOptions}
                                              defaultValue={this.state.user.city}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-textarea">
                                    <label style={{paddingBottom: '6px'}}>О себе</label>
                                    <Form style={{paddingTop: '6px'}}>
                                        <TextArea onChange={this.handleDropdownChange} placeholder='Расскажите о себе'
                                                  style={{minHeight: 265, maxHeight: 265, minWidth: 382}} id="info"
                                                  name="info" defaultValue={this.state.user.info}/>
                                    </Form>
                                </div>
                            </div>
                            <Divider style={{marginTop: '40px', marginBottom: 0}}/>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Контакты</span>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{marginBottom: 6}}>Телефон</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.user.phone}
                                           id="phone" name="phone" placeholder='+7( ___ ) ___ - __ - __ ' required/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{marginBottom: 6}}>Email</label>
                                    <Input onChange={this.handleInputChange} defaultValue={this.state.user.email}
                                           id="email" name="email" placeholder='user@botmasterzzz.com' required/>
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
                                        <Button className="profile-info-container-messengers-button" basic>+
                                            Добавить</Button>
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
                                                        <Checkbox defaultChecked/><Icon style={{paddingLeft: 12}}
                                                                                        name='telegram plane'><span
                                                        className="messenger-list">Telegram</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox/><Icon style={{paddingLeft: 12}} name='whatsapp'><span
                                                        className="messenger-list">WhatsApp</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox/><Icon style={{paddingLeft: 12}} name='viber'><span
                                                        className="messenger-list">Viber</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox/><Icon style={{paddingLeft: 12}} name='skype'><span
                                                        className="messenger-list">Skype</span></Icon>
                                                    </List.Content>
                                                </List.Item>
                                                <List.Item>
                                                    <List.Content>
                                                        <Checkbox/><Icon style={{paddingLeft: 12}}
                                                                         name='facebook messenger'><span
                                                        className="messenger-list">Facebook-messenger</span></Icon>
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
                                           name="messenger-login" required placeholder='Telegram' iconPosition='left'
                                           icon='telegram plane'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <Input onChange={this.handleInputChange} style={{paddingTop: 0, height: 32}}
                                           className="form-input" id="messenger-login" defaultValue={this.state.user.phone}
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
                                    <Checkbox defaultChecked/><span
                                    className="messenger-list">Сообщение в мессенджер</span>
                                </div>
                            </div>
                            <Divider style={{marginTop: '40px', marginBottom: 0}}/>
                        </div>
                        <div className="profile-info-container">
                            <div className="profile-info-container-name">
                                <span>Безопасность</span>
                            </div>
                            <form onSubmit={this.handlePasswordSubmit}>
                                <div className="profile-info-container-name-inputs password">
                                    <div className="profile-info-container-name-input password-input">
                                        <label style={{marginBottom: 6}}>Старый пароль</label>
                                        <Input style={{paddingTop: 0, height: 32, width: 250}}
                                               onChange={this.handleInputChange}
                                               icon={{name: 'eye slash outline', link: true}} defaultValue="123456"
                                               placeholder='Старый пароль' id="oldPassword" name="oldPassword" required
                                               type='password'/>
                                    </div>
                                    <div className="profile-info-container-name-input password-input">
                                        <label style={{marginBottom: 6}}>Новый пароль</label>
                                        <Input style={{paddingTop: 0, height: 32, width: 250}}
                                               onChange={this.handleInputChange}
                                               icon={{name: 'eye slash outline', link: true}} defaultValue="123456"
                                               placeholder='Старый пароль' id="newPassword" name="newPassword" required
                                               type='password'/>
                                    </div>
                                    <div className="profile-info-container-name-input password-input">
                                        <label style={{marginBottom: 6}}>Повторите новый пароль</label>
                                        <Input style={{paddingTop: 0, height: 32, width: 250}}
                                               onChange={this.handleInputChange}
                                               icon={{name: 'eye slash outline', link: true}} defaultValue="123456"
                                               placeholder='Повторите новый пароль' id="newRePassword"
                                               name="newRePassword" required type='password'/>
                                    </div>
                                    <div className="profile-info-container-name-input password-input">
                                        <Button compact color='blue' style={{width: 165, height: 32}}><span
                                            className='command-approve-buttons-text'>Изменить пароль</span></Button>
                                    </div>
                                </div>
                            </form>
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
                                            <Table.HeaderCell><span
                                                style={{color: '#A5A5A5'}}>Действие</span></Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        <Table.Row>
                                            <Table.Cell>Волга</Table.Cell>
                                            <Table.Cell>Роль 1</Table.Cell>
                                            <Table.Cell><Icon color='green' name='dot circle' size='small'/>В
                                                команде</Table.Cell>
                                            <Table.Cell><NavLink to="#"><span style={{color: '#EB5757'}}>Выйти из команды </span></NavLink></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Урал</Table.Cell>
                                            <Table.Cell>Роль 3</Table.Cell>
                                            <Table.Cell><Icon color='orange' name='dot circle' size='small'/>Запрос на
                                                участие</Table.Cell>
                                            <Table.Cell>
                                                <div className='command-approve'>
                                                    <Button icon fluid labelPosition='left' color='blue'> <Icon
                                                        name='checkmark'/><span
                                                        className='command-approve-buttons-text'>Принять</span></Button>
                                                    <Button fluid icon labelPosition='left' color='red'><Icon
                                                        name='close'/><span
                                                        className='command-approve-buttons-text'>Отклонить</span></Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    </Table.Body>
                                </Table>
                            </div>
                            <div className="profile-info-container-name-input command-search-link">
                                <NavLink to="#"><span style={{color: '#2F80ED'}}>+ Вступить в команду</span></NavLink>
                            </div>
                        </div>
                        <Divider style={{marginTop: '40px', marginBottom: 0}}/>
                        <div className="profile-info-buttons">
                            <div className='apply-button-container'>
                                <Button fluid className="apply-button" style={{width: 165, height: 32}} onClick={this.handleMainInformationSubmit}><span
                                    className='command-approve-buttons-text'>Сохранить</span></Button>
                            </div>
                            <div className='cancel-button-container'>
                                <Button fluid className="cancel-button" style={{width: 165, height: 32}} onClick={this.reload}><span
                                    className='command-approve-buttons-text'>Отмена</span></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;