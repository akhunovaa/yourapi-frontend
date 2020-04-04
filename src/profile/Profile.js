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
    Input,
    Table,
    TextArea
} from "semantic-ui-react";
import {profileImageUpdate, profileInfoUpdate, profilePasswordUpdate} from "../util/APIUtils";
import Alert from "react-s-alert";
import ImageUploader from 'react-images-upload';
import LazyImage from '../util/LazyImage';
import HeaderUserPortal from "../header/HeaderUserPortal";

class Profile extends Component {

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
            imageUrl: this.props.currentUser ? this.props.currentUser.imageUrl ? this.props.currentUser.imageUrl + '/150/150' : '' : '',
            open: false,
            id: this.props.currentUser ? this.props.currentUser.id : 0,
            name: '',
            surname: '',
            patrName: '',
            email: '',
            nickName: '',
            phone: '',
            birthDate: '',
            gender: '',
            language: '',
            city: '',
            info: '',
            loading: true,
            passwordDisabled: true,
            showPassword: false
        };
        this.reload = this.reload.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleOnPhoneChange = this.handleOnPhoneChange.bind(this);
        this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.handleMainInformationSubmit = this.handleMainInformationSubmit.bind(this);
        this.handlePasswordInputChange = this.handlePasswordInputChange.bind(this);
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.handlePasswordShow = this.handlePasswordShow.bind(this);
        this.image = React.createRef();
    }

    componentDidMount() {
        this._isMounted = true;

        const img = this.image.current;
        if (img && img.complete) {
            this.handleImageLoaded();
        }
        this.setState({loading: false});
    }

    handleImageLoaded() {
        this.setState({loading: false});
    }

    handlePasswordShow(){
        const show = !this.state.showPassword;
        this.setState({showPassword: show, passwordDisabled: false});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reload() {
        this.setState({loading: true});
        window.location.reload();
        this.setState({loading: false});
    };

    handleInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
    }

    handlePasswordInputChange(event) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: inputValue
        });
        this.setState({passwordDisabled: false});
    }

    handleDropdownChange = (e, {name, value}) => this.setState({[name]: value});

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
        this.setState({loading: true});
        const showPassword = this.state.showPassword;
        const data = new FormData(event.target);
        const passData = data.get('oldPassword');
        const passDataNew = data.get('newPassword');
        const passDataNewTwo = showPassword ? passDataNew : data.get('newRePassword');
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
                    this.setState({loading: false});
                    Alert.warning(response.error + '. Необходимо заново авторизоваться.');
                } else if (response.success === false) {
                    this.setState({loading: false});
                    Alert.warning(response.message);
                } else {
                    this.setState({loading: false});
                    Alert.success('Данные успешно сохранены');
                    this.setState({passwordDisabled: true});
                }
            }).catch(error => {
            this.setState({loading: false});
            Alert.error('Что-то пошло не так! Попробуйте заново.' || (error && error.message));
        });
    }

    handleMainInformationSubmit(event) {
        event.preventDefault();
        this.setState({loading: true});
        const id = this.state.id ? this.state.id : 0;
        const name = this.state.name ? this.state.name : this.state.user.name;
        const surname = this.state.surname ? this.state.surname : this.state.user.surname;
        const patrName = this.state.patrName ? this.state.patrName : this.state.user.patrName;
        const nickName = this.state.nickName ? this.state.nickName : this.state.user.nickName;
        const phone = this.state.phone ? this.state.phone : this.state.user.phone;
        const birthDate = this.state.birthDate ? this.state.birthDate : this.state.user.birthDate;
        const gender = this.state.gender ? this.state.gender : this.state.user.gender;
        const language = this.state.language ? this.state.language : this.state.user.language;
        const city = this.state.city ? this.state.city : this.state.user.city;
        const info = this.state.info ? this.state.info : this.state.user.info;
        const email = this.state.email ? this.state.email : this.state.user.email;

        const mainInfoRequest = Object.assign({}, {
            'id': id,
            'name': name,
            'surname': surname,
            'patrName': patrName,
            'nickName': nickName,
            'phone': phone,
            'birthDate': birthDate,
            'gender': gender,
            'language': language,
            'city': city,
            'info': info,
            'email': email
        });

        profileInfoUpdate(mainInfoRequest)
            .then(response => {
                if (response.error) {
                    this.setState({
                        loading: false
                    });
                    Alert.warning(response.error + '. Необходимо заново авторизоваться.');
                } else if (response.success === false) {
                    this.setState({
                        loading: false
                    });
                    Alert.warning(response.message);
                } else {
                    this.setState({
                        loading: false
                    });
                    Alert.success('Данные успешно сохранены');
                }
            }).catch(error => {
            this.setState({
                loading: false
            });
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
                            imageUrl: reader.result
                        })
                    };
                    reader.readAsDataURL(item.files[0]);
                    this.setState({
                        imageUrl: reader.result
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
                        imageUrl: ''
                    })
                }
            }
        }
    }

    render() {

        const {user, imageUrl, showPassword, passwordDisabled, loading} = this.state;
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
                                    imageUrl ? (
                                        <LazyImage src={imageUrl} size='medium' circular verticalAlign='top' alt={user.name} />
                                    ) : (
                                        <div className="text-avatar">
                                            <span>{user.name && user.name[0]}</span>
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
                                <span style={{paddingRight: '8px'}}>{user.surname}</span>
                                <span style={{paddingRight: '8px'}}>{user.name}</span>
                                <span style={{paddingRight: '8px'}}>{user.patrName}</span>
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
                                    <Input onChange={this.handleInputChange} defaultValue={user.surname}
                                           className="form-input" id="surname"
                                           name="surname" required placeholder='Фамилия'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Имя</label>
                                    <Input onChange={this.handleInputChange} defaultValue={user.name}
                                           className="form-input" id="name"
                                           name="name" required placeholder='Имя'/>
                                </div>
                                <div className="profile-info-container-name-input">
                                    <label>Отчество</label>
                                    <Input onChange={this.handleInputChange} defaultValue={user.patrName}
                                           className="form-input" id="patrName"
                                           name="patrName" required placeholder='Отчество'/>
                                </div>
                            </div>
                            <div className="profile-info-container-nickname-input">
                                <div className="profile-info-container-name-input">
                                    <label>Имя профиля</label>
                                    <Input onChange={this.handleInputChange} defaultValue={user.nickName}
                                           className="form-input" id="nickName"
                                           name="nickName" required placeholder='Имя профиля'/>
                                </div>
                            </div>
                            <div className="profile-info-container-date-birth-input">
                                <div className="profile-info-container-name-input">
                                    <label>Дата рождения</label>
                                    <Input onChange={this.handleInputChange} defaultValue={user.birthDate}
                                           className="form-input" id="birthDate"
                                           name="birthDate" required placeholder='Дата рождения'/>
                                </div>
                            </div>
                            <div className="profile-info-container-sex-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Пол</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Пол' fluid selection
                                              id="gender" name="gender" className="form-input" options={sexOptions}
                                              defaultValue={user.gender}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Язык</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Язык' fluid selection
                                              id="language" name="language" className="form-input"
                                              options={languageOptions} defaultValue={user.language}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{paddingBottom: '6px'}}>Город</label>
                                    <Dropdown onChange={this.handleDropdownChange} placeholder='Город' fluid search
                                              selection id="city" name="city" noResultsMessage="Москва - лучший город"
                                              className="form-input" options={cityOptions}
                                              defaultValue={user.city}/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-textarea">
                                    <label style={{paddingBottom: '6px'}}>О себе</label>
                                    <Form style={{paddingTop: '6px'}}>
                                        <TextArea onChange={this.handleInputChange} placeholder='Расскажите о себе'
                                                  style={{minHeight: 265, maxHeight: 265, minWidth: 382}} id="info"
                                                  name="info" defaultValue={user.info}/>
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
                                    <Input onChange={this.handleInputChange} defaultValue={user.phone}
                                           id="phone" name="phone" placeholder='+7( ___ ) ___ - __ - __ ' required/>
                                </div>
                            </div>
                            <div className="profile-info-container-input">
                                <div className="profile-info-container-name-input">
                                    <label style={{marginBottom: 6}}>Email</label>
                                    <Input onChange={this.handleInputChange} defaultValue={user.email}
                                           id="email" name="email" placeholder='user@botmasterzzz.com' required/>
                                </div>
                            </div>
                            <div className="profile-info-container-messengers">
                                <h5>Мессенджеры</h5>
                            </div>

                            <div className="profile-info-container-input">
                                <HeaderUserPortal currentUser={currentUser} onLogout={onLogout} {...this.props}/>
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
                                           className="form-input" id="messenger-login-two"
                                           defaultValue={user.phone}
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
                                               onChange={this.handlePasswordInputChange}
                                               icon={<Icon name={showPassword ? 'eye slash outline' : 'eye'} link onClick={this.handlePasswordShow}/>}
                                               placeholder='Старый пароль' id="oldPassword" name="oldPassword" required
                                               type={showPassword ? 'text' : 'password'}/>
                                    </div>
                                    <div className="profile-info-container-name-input password-input">
                                        <label style={{marginBottom: 6}}>Новый пароль</label>
                                        <Input style={{paddingTop: 0, height: 32, width: 250}}
                                               onChange={this.handlePasswordInputChange} disabled={passwordDisabled}
                                               icon={<Icon name={showPassword ? 'eye slash outline' : 'eye'} link onClick={this.handlePasswordShow}/>}
                                               placeholder='Новый пароль' id="newPassword" name="newPassword" required
                                               type={showPassword ? 'text' : 'password'}/>
                                    </div>
                                    <div className={showPassword ? 'profile-password-hide profile-info-container-name-input password-input' : 'profile-info-container-name-input password-input'}>
                                        <label style={{marginBottom: 6}}>Подтвердите новый пароль</label>
                                        <Input style={{paddingTop: 0, height: 32, width: 250}}
                                               onChange={this.handlePasswordInputChange} disabled={passwordDisabled ? passwordDisabled : showPassword}
                                               icon={<Icon name={showPassword ? 'eye slash outline' : 'eye'} link onClick={this.handlePasswordShow}/>}
                                               placeholder='Подтвердите новый пароль' id="newRePassword"
                                               name="newRePassword" required
                                               type={showPassword ? 'text' : 'password'}/>
                                    </div>
                                    <div className="profile-info-container-name-input password-input">
                                        <Button compact color='blue' style={{width: 165, height: 32}} className='apply-button' disabled={passwordDisabled}>
                                            <span className='command-approve-buttons-text'>Изменить пароль</span>
                                        </Button>
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
                                            <Table.Cell><Icon color='green' name='dot circle' size='small'/>В команде</Table.Cell>
                                            <Table.Cell><NavLink to="#"><span style={{color: '#EB5757'}}>Выйти из команды </span></NavLink></Table.Cell>
                                        </Table.Row>
                                        <Table.Row>
                                            <Table.Cell>Урал</Table.Cell>
                                            <Table.Cell>Роль 3</Table.Cell>
                                            <Table.Cell><Icon color='orange' name='dot circle' size='small'/>Запрос на участие</Table.Cell>
                                            <Table.Cell>
                                                <div className='command-approve'>
                                                    <Button icon fluid labelPosition='left' color='blue' className="command-apply-button" ><Icon name='checkmark'/>
                                                        <span className='command-approve-buttons-text'>Принять</span>
                                                    </Button>
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
                                <Button fluid className="apply-button" style={{width: 165, height: 32}}
                                        disabled={loading} color='blue'
                                        onClick={this.handleMainInformationSubmit}>Сохранить</Button>
                            </div>
                            <div className='cancel-button-container'>
                                <Button fluid className="cancel-button" style={{width: 165, height: 32}}
                                        disabled={loading} color='grey'
                                        onClick={this.reload}><span className='command-approve-buttons-text'>Отмена</span></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Profile;